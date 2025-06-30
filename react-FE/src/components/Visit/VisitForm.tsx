import { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { baseURL } from "../../config/apiConfig";

type Visit = {
    serialNo : string,
    date : string,
    weight_kg: number,
    weightCircumf: number,
    bmi: number,
    nutritionalConcerns: string,
    other: string,
    comments: string
}

type VisitFormProps = {
  serialNo: string;
  visitCount: number;
};

  function VisitForm( { serialNo }: VisitFormProps) {
    const [visit, setVisit] = useState<Visit>({
        serialNo : '',
        date : new Date().toISOString().split("T")[0], 
        weight_kg: 0,
        weightCircumf: 0,
        bmi: 0,
        nutritionalConcerns: '',
        other: '',
        comments: ''
    });

    useEffect(() => {
        setVisit((prev) => ({ ...prev, serialNo }));
      }, [serialNo]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVisit({
          ...visit,
          [name]: ["weight_kg", "weightCircumf", "bmi"].includes(name)
            ? Number(value)
              : value,
        });
      };

  const handleSubmit = (newVisit: Visit) => {

    console.log("visit", newVisit)
    fetch(`${baseURL}/addVisit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newVisit)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Save error:", errorData);
          alert(errorData.message || "An error occurred while saving the visit.");
          }
          return res.json();
      })
      .then((data) => {
        console.log("Visit saved:", data);
        alert("Visit added successfully!");
      })
      .catch((err) => {
        console.error("Save error:", err);
        alert("Failed to save visit.");
      });
  };
  

  return(
    <Box>
        <>
          <Grid container spacing={2}>
                <Grid size={8}>
                    <TextField label="Date" name="date" type="date" value={visit.date} onChange={handleInputChange} fullWidth focused />
                </Grid>
                <Grid size={8}>
                    <TextField label="Weight&nbsp;(kg)" name="weight_kg" value={visit.weight_kg} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid size={8}>
                    <TextField label="Waist Circumference&nbsp;(cm)" name="weightCircumf" value={visit.weightCircumf} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid size={8}>
                    <TextField label="Nutrition Concerns" name="nutritionalConcerns" value={visit.nutritionalConcerns} onChange={handleInputChange} multiline fullWidth />
                </Grid>
                <Grid size={8}>
                    <TextField label="Comments" name="comments" value={visit.comments} onChange={handleInputChange} multiline fullWidth />
                </Grid>
                <Grid size={8}>
                    <TextField label="Other" name="other" value={visit.other} onChange={handleInputChange} multiline fullWidth />
                </Grid>
                <Grid size={8}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(visit)}
                    sx={{ width: 400}}
                >
                    Add Visit Data
                </Button>
                </Grid>
            </Grid>
            
        </>
    </Box>
      
  );
  }

  export default VisitForm;