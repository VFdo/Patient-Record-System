import { useRef, useState } from "react";

import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import type { PatientDataFormHandles } from "../PatientData/PatientDataForms";
import PatientDataForm from "../PatientData/PatientDataForms";
import { baseURL, phnURL } from "../../config/apiConfig";

type Patient = {
    serialNo: string;
    name: string;
    gender: string;
    dob: string;
    age: number;
    phone: string;
    address: string;
  };

  interface ChildProps {
    setPatientSn: React.Dispatch<React.SetStateAction<string>>;
    setVisitCount: React.Dispatch<React.SetStateAction<number>>;
  }

  function PatientForm({ setPatientSn, setVisitCount }: ChildProps){
    const patientDataRef = useRef<PatientDataFormHandles>(null);
    const[sn, setSn] = useState("")
    const [patient, setPatient] = useState<Patient>({
        serialNo: sn,
        name: '',
        gender: '',
        dob: '',
        age: 0,
        phone: '',
        address: ''
    });
    const [notFound, setNotFound] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e: { target: { name: string; value: string } }) => {
        setPatient({ ...patient, [e.target.name]: 
            e.target.name === "age" ? Number(e.target.value) : 
            e.target.name === "gender" ? (e.target.value) as string : 
            e.target.value });
    };

    const handleSearch = (sn: string) => {
        setLoading(true);
        patientDataRef.current?.handleSearch(sn);
        Promise.all([
            fetch(`${baseURL}/getPatientBySN/${sn}`),
            // fetch(`${baseURL}/getPatientBySN/${sn}`), //dev
            fetch(`${phnURL}${sn}`) //prod
          ])
            .then(async ([res1, res2]) => {
              if(res1.ok){
                console.log("found in mnudb");
                const data1 = await res1.json();
                setPatient(data1.payload);
                setPatientSn(data1.payload.serialNo);
                setLoading(false);
                setNotFound(false);
              } else if(res2.ok){
                console.log("found in phn search");
                const data2 = await res2.json();
                const phnData = data2.data[0];
                setPatientSn(phnData.phn);
                const genders = [
                    { title: 'MALE', value: '1' },
                    { title: 'FEMALE', value: '2' },
                    { title: 'Other', value: '3' },
                ];
                const mappedGender = genders.find(item => item.value === phnData.patientGender);
                const ageString: string = phnData.patientAge;
                const match = ageString.match(/^(\d+)\s*\(y\)/);
                const age = match ? parseInt(match[1]) : 0;
                setPatient({
                    serialNo: phnData.phn,
                    name: phnData.patientName,
                    gender: mappedGender ? mappedGender.title : "", 
                    dob: phnData.patientDOB,
                    age: age,
                    phone: phnData.patientMobile01,
                    address: phnData.patientAddress
                });
                setLoading(false);
                setNotFound(false);
                console.log("PHN API data:", patient);
              } else {
                console.log('not found in databases')
                setPatient({
                    serialNo: sn,
                    name: '',
                    gender: '',
                    dob: '',
                    age: 0,
                    phone: '',
                    address: ''
                  });
                  setNotFound(true);
                  setLoading(false);
              }
            })
            .catch((err) => {
              console.error("Fetch error:", err);
              setPatient({
                serialNo: sn,
                name: '',
                gender: '',
                dob: '',
                age: 0,
                phone: '',
                address: ''
              });
              setNotFound(true);
              setLoading(false);
            });
    };

    const handleSubmit = (newPatient: Patient) => {
        setPatientSn(newPatient.serialNo)
        patientDataRef.current?.handleSubmit(newPatient.serialNo);
        console.log('saving patient: ', newPatient)
        fetch(`${baseURL}/addPatient`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPatient)
        })
        .then(async (res) => {
            if (!res.ok) {
            const errorData = await res.json();
            console.error("Save error:", errorData);
            alert(errorData.message || "An error occurred while saving the patient.");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Patient saved:", data);
            alert("Patient added successfully!");
            // setNotFound(false);
        })
        .catch((err) => {
            console.error("Save error:", err);
            alert("Failed to save patient.");
        });
    };
  
    return(
        <Card>
        <CardContent>
            <Typography variant="h6">Patient Search & Details</Typography>
            <Box>            
            <>
            {notFound && (
                <Typography variant="subtitle2" color="warning.main">
                No patient found. Please enter new details.
                </Typography>
            )}
            
            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 6, md: 8 }}>
                    <TextField label="Patient PHN" value={sn} onChange={(e) => setSn(e.target.value)} fullWidth focused/>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Button variant="contained" size="large" loading={loading} onClick={() => handleSearch(sn)} fullWidth>Check Patient</Button>
                </Grid>
                <Grid size={8}></Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid size={8}>
                    <TextField label="Name" name="name" value={patient.name} onChange={handleInputChange} fullWidth/>
                </Grid>
                <Grid size={8}>
                    <FormControl fullWidth >
                    <InputLabel id="select-gender" >Gender</InputLabel>
                        <Select
                            labelId="select-gender"
                            id="demo-simple-select"
                            value={patient.gender}
                            label="Gender"
                            name="gender" 
                            onChange={handleInputChange}
                            sx={{ textAlign: 'left' }}
                        >
                            <MenuItem value={"FEMALE"}>Female</MenuItem>
                            <MenuItem value={"MALE"}>Male</MenuItem>
                        </Select>
                        </FormControl>
                </Grid>
                <Grid size={8}>
                    <TextField label="DOB" name="dob" type="date" value={patient.dob} onChange={handleInputChange} fullWidth/>    
                </Grid>
                <Grid size={8}>
                    <TextField label="Age" name="age" value={patient.age} onChange={handleInputChange} fullWidth/>
                </Grid>
                <Grid size={8}>
                    <TextField label="Phone" name="phone" value={patient.phone} onChange={handleInputChange} fullWidth/>
                </Grid>
                <Grid size={8}>
                    <TextField label="Address" name="address" value={patient.address} onChange={handleInputChange} fullWidth/>
                </Grid>
            </Grid>
            <PatientDataForm ref={patientDataRef} suppressButton={notFound} setVisitCount={setVisitCount}/>
            
            {notFound && (
                <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => {
                  console.log("Submit clicked");
                  console.log(sn);
                  handleSubmit(patient);
                }}
                sx={{ width: 300,margin:2 }}
              >
                Add New Patient
              </Button>
                )}
            </>
        </Box>
        </CardContent>
        </Card>

        
        
        
    );
  }

  export default PatientForm;