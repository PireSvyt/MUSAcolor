import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@mui/material'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import PrescriptionCard from './PrescriptionCard/PrescriptionCard.js'
// Services
import { serviceExerciseGetMine } from '../../services/exercise.services.js'

import appStore from '../../store.js'

export default function PatientPrescriptions() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('PatientPrescriptions')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    patientPrescriptions: useSelector(
      (state) => state.patientSlice.prescriptions
    ),
  }

  // Changes
  let changes = {
    new: () => {
      appStore.dispatch({
        type: 'prescriptionModalSlice/new',
      })
    },
  }

  let c = -1

  return (
    <Box data-testid="component-patient prescriptions">
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h6" component="span">
          {t('patient.label.prescriptions')}
        </Typography>
        <IconButton
          sx={{ p: 2 }}
          onClick={changes.new}
          color="primary"
          data-testid="component-patient prescriptions-button-new prescription"
        >
          <AddCircleIcon />
        </IconButton>
      </Stack>

      {select.patientPrescriptions.length === 0 ? (
        <Box
          sx={{
            m: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
            variant="h6"
            component="span"
            align="center"
          >
            {t('patient.label.noprescriptions')}
          </Typography>
          <SmsFailedIcon
            sx={{ mt: 2, mb: 2 }}
            fontSize="large"
            color="primary"
          />
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
            variant="body1"
            component="span"
            align="center"
          >
            {t('patient.label.noprescriptionsexplanation')}
          </Typography>
        </Box>
      ) : (
        <List dense={false}>
          {select.patientPrescriptions.map((prescription) => {
            c += 1
            return (
              <ListItem key={'prescription-' + prescription.prescriptionid}>
                <PrescriptionCard
                  prescription={prescription}
                  index={c}
                  patientid={window.location.href.split('/patient/')[1]}
                />
              </ListItem>
            )
          })}
        </List>
      )}
    </Box>
  )
}
