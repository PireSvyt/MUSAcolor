import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Typography, Button, IconButton } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import EditIcon from '@mui/icons-material/Edit'

// Components
import { servicePatientGet } from '../services/patient.services.js'
import PatientExams from './PatientExams/PatientExams.js'
import PatientPrescriptions from './PatientPrescriptions/PatientPrescriptions.js'
// Shared
import Appbar from '../Appbar/Appbar.js'

import appStore from '../store.js'

export default function Patient() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Patient')
  }
  // i18n
  const { t } = useTranslation()

  // State
  const [patientIsAvailable, setPatientIsAvailable] = useState(null)

  // Selects
  const select = {
    authloaded: useSelector((state) => state.authSlice.loaded),
    signedin: useSelector((state) => state.authSlice.signedin),
    patientState: useSelector((state) => state.patientSlice.state),
    patient: useSelector((state) => state.patientSlice),
    exercisesState: useSelector((state) => state.exerciseSlice.state),
  }

  // Changes
  let changes = {
    editpatient: () => {
      appStore.dispatch({
        type: 'patientModalSlice/load',
        payload: {
          patient: select.patient,
        },
      })
    },
    gotodatabaseURL: () => {
      //window.location.href = select.patient.databaseURL
      window.open(select.patient.databaseURL)
    },
    copyurl: () => {
      navigator.clipboard.writeText(
        'https://musacolor.vercel.app/' + 'patient/' + select.patient.patientid
      )
    },
  }

  if (select.authloaded === true) {
    // Auth loaded
    if (select.signedin === false) {
      // not signed in > redirection
      window.location = '/'
    } else {
      if (patientIsAvailable === null) {
        setPatientIsAvailable('wip')
        servicePatientGet(window.location.href.split('/patient/')[1]).then(
          () => {
            setPatientIsAvailable('available')
          }
        )
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Appbar route="patient" title={t('patient.label.title')} />
      <Box sx={{ height: 100 }} data-testid="page-patient" />
      {select.authloaded === true &&
      select.signedin === true &&
      patientIsAvailable === 'available' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '80%',
            }}
          >
            <Box
              sx={{
                display: 'block',
                ml: 2,
                mr: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography
                    component="span"
                    variant="h5"
                    gutterBottom
                    data-testid="page-patient-label-patientname"
                  >
                    {select.patient.name}
                  </Typography>
                  <Button
                    onClick={changes.gotodatabaseURL}
                    disabled={
                      select.patient.databaseURL === undefined ||
                      select.patient.databaseURL === null ||
                      select.patient.databaseURL === ''
                    }
                  >
                    {t('patient.button.databaseurl')}
                  </Button>
                </Box>
                <IconButton onClick={changes.editpatient}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
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
