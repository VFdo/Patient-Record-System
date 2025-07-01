import './App.css'
import PatientForm from './components/Patient/PatientForm'
import AllVisits from './components/Visit/Visits'
import { AppBar, Box, Button, CssBaseline, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisitForm from './components/Visit/VisitForm'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import DiseaseFilter from './components/Filter/DiseaseFilter'
import FilterAltIcon from '@mui/icons-material/FilterAlt';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return value === index ? <Box sx={{ py: 2 }}>{children}</Box> : null;
}

function MainPage() {
  const [tabValue, setTabValue] = useState(0);
  const [patientSn, setPatientSn] = useState<string>('');
  const [visitCount, setVisitCount] = useState<number>(0);
  const navigate = useNavigate();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f9f9f9' }}>
  <CssBaseline />
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Patient Record System
        </Typography>
        {/* <Button color='secondary' onClick={() => navigate("/filter")}>Filter Page</Button> */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<FilterAltIcon />}
          onClick={() => navigate("/filter")}
          sx={{
            backgroundColor: '#E5E4E2',
            color: '#000', 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 2,
            py: 1,
            boxShadow: 1,
            '&:hover': {
              backgroundColor: '#FFFFFF',
              boxShadow: 3
          }
        }}
        >
  Filter Page
</Button>
      </Toolbar>
    </AppBar>

    <Box sx={{ pt: 10, px: 4 }}>
    <Tabs value={tabValue} onChange={handleTabChange} centered>
      <Tab label="Patient Info" />
      <Tab label={`Visit Form`} />
      <Tab label="Visit History" />
    </Tabs>

    <TabPanel value={tabValue} index={0}>
      <PatientForm setPatientSn={setPatientSn} setVisitCount={setVisitCount} /> 
    </TabPanel>
    <TabPanel value={tabValue} index={1}>
      <VisitForm serialNo={patientSn} visitCount={visitCount} />
    </TabPanel>
    <TabPanel value={tabValue} index={2}>
      <AllVisits serialNo={patientSn} />
    </TabPanel>
   </Box>
   </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/filter" element={<DiseaseFilter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

