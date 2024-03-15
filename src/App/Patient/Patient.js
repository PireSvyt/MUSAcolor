import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import { servicePatientGet } from '../services/patient.services.js'
import { serviceExerciseGetMine } from '../services/exercise.services.js'
import PatientExams from './PatientExams/PatientExams.js'
import PatientPrescriptions from './PatientPrescriptions/PatientPrescriptions.js'
// Shared
import Appbar from '../Appbar/Appbar.js'

export default function Patient() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Patient')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    authloaded: useSelector((state) => state.authSlice.loaded),
    signedin: useSelector((state) => state.authSlice.signedin),
    userState: useSelector((state) => state.userSlice.state),
    patientState: useSelector((state) => state.patientSlice.state),
    patientName: useSelector((state) => state.patientSlice.name),
  }

  if (select.authloaded === true) {
    // Auth loaded
    if (select.signedin === false) {
      // not signed in > redirection
      window.location = '/'
    } else {
      // signed in
      if (select.patientState.details === undefined) {
        // details not loaded nor loading
        servicePatientGet(window.location.href.split('/patient/')[1])
      }
      if (select.userState.exercises === undefined) {
        // exercises not loaded nor loading
        serviceExerciseGetMine()
      }
    }
  }

  return (
    <Box>
      <Appbar route="patient" title={t('patient.label.title')} />
      <Box 
        sx={{ height: 100 }} 
        data-testid="page-patient"
      />
      {select.authloaded === true &&
      select.signedin === true &&
      select.patientState.details === 'available' ? (
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Box
            sx={{
              width: '80%',
              textAlign: 'center',
            }}
          >
          <Typography 
            component="span" 
            variant="h5" 
            gutterBottom
            data-testid="page-patient-label-patientname"
          >
            {select.patientName}
          </Typography>
          <PatientExams />
          <PatientPrescriptions />
          </Box>
        </Box>
      ) : (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  )
}
