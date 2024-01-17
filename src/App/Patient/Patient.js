import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import { servicePatientGet } from '../services/patient.services.js'
import PatientExams from './PatientExams/PatientExams.js'
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
    }
  }

  return (
    <Box>
      <Appbar route="patient" title={t('patient.label.title')} />
      <Box sx={{ height: 80 }} />
      {select.authloaded === true &&
      select.signedin === true &&
      select.patientState.details === 'available' ? (
        <Box>
          <Typography sx={{ p: 2 }} component="span" variant="h5" gutterBottom>
            {select.patientName}
          </Typography>
          <PatientExams />
        </Box>
      ) : (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </Box>
  )
}
