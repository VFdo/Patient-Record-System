import { useEffect, useState } from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { baseURL } from "../../config/apiConfig";

type Patient = {
    serialNo: string;
    name: string;
    gender: string;
    dob: Date;
    age: number;
    phone: string;
    address: string;
  }

function AllPatients() {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        fetch(`${baseURL}/getAllPatients`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);
                setPatients(data.payload.content);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>PHN</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Gender&nbsp;(g)</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.serialNo}
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
    );
  }

  export default AllPatients;