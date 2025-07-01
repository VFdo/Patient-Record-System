import { type SelectChangeEvent, Container, CssBaseline, Box, AppBar, Toolbar, Typography, FormControl, InputLabel, Select, MenuItem, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { baseURL } from "../../config/apiConfig";

type Patient = {
    serialNo: string;
    name: string;
    gender: string;
    dob: Date;
    age: number;
    phone: string;
    address: string;
    disease: string;
  }

type PatientData = {
    serialNo: string,
    visitCount: number,
    clinic: string,
    disease: string,
    height_cm: number
  };

function DiseaseFilter () {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diseaseList, setDiseases] = useState<string[]>([]);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  
    const handleChange = (event: SelectChangeEvent) => {
      const value = event.target.value;
      setSelectedDisease(value);
      setFilteredPatients(patients.filter(p => p.disease === value));
    };

    useEffect(() => {
        Promise.all([
          fetch(`${baseURL}/getAllPatients`).then(res => res.json()),
          fetch(`${baseURL}/getAllPatientData`).then(res => res.json())
        ])
        .then(([patientsRes, clinicRes]) => {
          const patients = patientsRes.payload.content;
          const diseases = clinicRes.payload.content;
      
          const joined = patients.map((patient: Patient) => {
            const diseaseRecord = diseases.find((d: PatientData) => d.serialNo === patient.serialNo);
            return {
              ...patient,
              disease: diseaseRecord?.disease || 'Unknown'
            };
          });
      
          setPatients(joined);
          const diseaseNames: string[] = diseases.map((d: PatientData) => d.disease);
        const uniqueDiseases: string[] = [...new Set<string>(diseaseNames)];
        setDiseases(uniqueDiseases);
        })
        .catch(error => console.error("Error fetching patient data:", error));
      }, []);
      

    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
    <CssBaseline />

          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Filter by Disease
              </Typography>
            </Toolbar>
          </AppBar>
  
          <Box sx={{ pt: 10, px: 4 }}>
            
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Select Disease</InputLabel>
              <Select
                value={selectedDisease}
                label="Select Disease"
                onChange={handleChange}
              >
                {diseaseList.map((disease) => (
                  <MenuItem key={disease} value={disease}>
                    {disease}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
  
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>PHN</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient, index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {patient.serialNo}
                                </TableCell>
                                <TableCell align="right">{patient.name}</TableCell>
                                <TableCell align="right">{patient.age}</TableCell>
                                <TableCell align="right">{patient.gender}</TableCell>
                                <TableCell align="right">{patient.phone}</TableCell>
                                <TableCell align="right">{patient.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };

export default DiseaseFilter;