import { forwardRef, useImperativeHandle, useState } from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { baseURL } from "../../config/apiConfig";

type PatientData = {
    serialNo: string,
    visitCount: number,
    clinic: string,
    disease: string,
    height_cm: number
  };

  export interface PatientDataFormHandles {
    handleSearch: (sn: string) => void;
    handleSubmit: (sn: string) => void;
  }

  type PatientDataFormProps = {
    suppressButton?: boolean;
    setVisitCount: (count: number) => void;
  };

  const PatientDataForm = forwardRef<PatientDataFormHandles, PatientDataFormProps>(
    ({ suppressButton = false, setVisitCount }, ref) => {
    const [patientData, setPatientData] = useState<PatientData>({
      serialNo: '',
      visitCount: 0,
      clinic: '',
      disease: '',
      height_cm: 0
    });
  const [notFound, setNotFound] = useState(false)

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.name === "height_cm" ? Number(e.target.value) : e.target.value });
  };

  const handleSearch = (sn: string) => {
    fetch(`${baseURL}/getPatientData/${sn}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data: { payload: PatientData })=> {
        console.log('clinic data: ', data)
        setPatientData(data.payload);
        setVisitCount(data.payload.visitCount);
        setNotFound(false);
      })
      .catch(() => {
        setPatientData({
            serialNo: sn,
            visitCount: 0,
            clinic: '',
            disease: '',
            height_cm: 0
          });
        setNotFound(true);
      });
  };

  const handleSubmit = (sn: string) => {
    patientData.serialNo = sn
    console.log('saving clinic data:', patientData)
    fetch(`${baseURL}/addPatientData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patientData)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Save error:", errorData);
          alert(errorData.message || "An error occurred while saving clinic data.");
          }
          return res.json();
      })
      .then((data) => {
        console.log(data)
        alert("Clinic data added successfully!");
        setNotFound(false);
      })
      .catch((err) => {
        console.error("Save error:", err);
        alert("Failed to save clinic data.");
      });
  };
    useImperativeHandle(ref, () => ({
        handleSearch,
        handleSubmit
    }));
  
  return(
    <Box>
        <>
          {notFound && (
            <Typography variant="subtitle2" color="warning.main">
              No clinic data found. Please enter new details.
            </Typography>
          )}
          <Grid container spacing={2}>
                <Grid size={8}></Grid>
                <Grid size={8}>
                <TextField label="Clinic" name="clinic" value={patientData.clinic} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid size={8}>
                <FormControl fullWidth >
                    <InputLabel id="select-disease" >Disease</InputLabel>
                        <Select
                            labelId="select-disease"
                            id="demo-simple-select"
                            value={patientData.disease}
                            label="Disease"
                            name="disease" 
                            onChange={handleInputChange}
                            sx={{ textAlign: 'left' }}
                        >
                            <MenuItem value={"Renal"}>Renal</MenuItem>
                            <MenuItem value={"Gastrointestinal"}>Gastrointestinal</MenuItem>
                            <MenuItem value={"Cancer"}>Cancer</MenuItem>
                            <MenuItem value={"Dental"}>Dental</MenuItem>
                            <MenuItem value={"Obesity - Adult"}>Obesity - Adult</MenuItem>
                            <MenuItem value={"Obesity - Paediatrics"}>Obesity - Paediatrics</MenuItem>
                            <MenuItem value={"Psychiatry"}>Psychiatry</MenuItem>
                            <MenuItem value={"Undernutrition - Adults"}>Undernutrition - Adults</MenuItem>
                            <MenuItem value={"Undernutrition - Paediatrics"}>Undernutrition - Paediatrics</MenuItem>
                            <MenuItem value={"Pregnancy - Diabetes"}>Pregnancy - Diabetes</MenuItem>
                            <MenuItem value={"Pregnancy - Low BMI"}>Pregnancy - Low BMI</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                        </FormControl>
                </Grid>
                <Grid size={8}>
                <TextField label="Height" name="height_cm" value={patientData.height_cm} onChange={handleInputChange} fullWidth />
                </Grid>
            </Grid>
          
          {notFound && !suppressButton &&(
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(patientData.serialNo)}
            >
                Add Data
            </Button>
            )}
        </>
    </Box>
      
  );
  });

  export default PatientDataForm;