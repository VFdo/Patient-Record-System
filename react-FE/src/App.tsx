import './App.css'
import PatientForm from './components/Patient/PatientForm'
import AllVisits from './components/Visit/Visits'
import { AppBar, Box, Container, CssBaseline, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisitForm from './components/Visit/VisitForm'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return value === index ? <Box sx={{ py: 2 }}>{children}</Box> : null;
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [patientSn, setPatientSn] = useState<string>('');
  const [visitCount, setVisitCount] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
  <Container maxWidth="lg">
  <CssBaseline />
  <Box sx={{ my: 4 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Patient Record System
        </Typography>
      </Toolbar>
    </AppBar>

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
</Container>

  )
}

export default App

