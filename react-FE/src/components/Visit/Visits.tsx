import { useEffect, useState } from "react"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { baseURL } from "../../config/apiConfig";

type Visit = {
    refId: number,
    serialNo : string,
    date : Date,
    weight_kg: number,
    weightCircumf: number,
    bmi: number,
    nutritionConcerns: string,
    other: string,
    comments: string
}

function AllVisits({ serialNo }: {serialNo:string}) {
    const[visits, setVisits] = useState<Visit[]>([]);
    // const [sn, setSn] = useState("");
    
    useEffect(() => {
        if (!serialNo) return;
        console.log("visit sn: ",serialNo)

        fetch(`${baseURL}/getVisits/${serialNo}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);
                setVisits(data.payload.content);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, [serialNo]);

    return (
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell>Visit ID</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Weight&nbsp;(kg)</TableCell>
                <TableCell align="right">Weight Circumference&nbsp;(cm)</TableCell>
                <TableCell align="right">BMI</TableCell>
                <TableCell align="right">Nutritional Concerns</TableCell>
                <TableCell align="right">Comments</TableCell>
                <TableCell align="right">Other</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visits.map((visit) => (
                <TableRow
                  key={visit.refId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >{visit.refId}</TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {visit.date.toString()}
                  </TableCell>
                  <TableCell align="right">{visit.weight_kg}</TableCell>
                  <TableCell align="right">{visit.weightCircumf}</TableCell>
                  <TableCell align="right">{visit.bmi.toFixed(2)}</TableCell>
                  <TableCell align="right">{visit.nutritionConcerns}</TableCell>
                  <TableCell align="right">{visit.comments}</TableCell>
                  <TableCell align="right">{visit.other}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
        
      );
    }

    export default AllVisits;