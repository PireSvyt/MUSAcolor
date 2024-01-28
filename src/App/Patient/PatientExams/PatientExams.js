import React from 'react'
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinearProgress from '@mui/material/LinearProgress'

// Components
import ExamCard from './ExamCard/ExamCard.js'

import appStore from '../../store.js'

export default function PatientExams() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('PatientExams')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    patientState: useSelector((state) => state.patientSlice.state),
    patientExams: useSelector((state) => state.patientSlice.exams),
  }

  // Changes
  let changes = {
    new: () => {
      appStore.dispatch({
        type: 'examModalSlice/new',
      })
    },
  }

  let c = -1

  return (
    <Box
      data-testid="component-patient exams"
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h6" component="span">
          {t('patient.label.exams')}
        </Typography>
        <IconButton 
          sx={{ p: 2 }} 
          onClick={changes.new} 
          color='primary'
          data-testid="component-patient exams-button-new exam"
          >
          <AddCircleIcon />
        </IconButton>
      </Stack>

      {select.patientState.details !== 'available' ? (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress/>
        </Box>
      ) : select.patientExams.length === 0 ? (
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
            {t('patient.label.noexams')}
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
            {t('patient.label.noexamsexplanation')}
          </Typography>
        </Box>
      ) : (
        <List dense={false}>
          {select.patientExams.map((exam) => {
            c += 1
            return (
              <ListItem key={'exam-' + exam.examid}>
                <ExamCard
                  exam={exam}
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
