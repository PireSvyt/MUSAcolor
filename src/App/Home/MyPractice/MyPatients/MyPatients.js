import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Typography, List, ListItem } from '@mui/material'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import PatientCard from './PatientCard/PatientCard.js'

export default function MyPatients() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('MyPatients')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    userState: useSelector((state) => state.userSlice.state),
    mypatients: useSelector((state) => state.userSlice.patients),
  }

  let c = -1

  return (
    <Box
      data-testid="component-my patients"
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
        {select.userState.details !== 'available' ? (
          <Box sx={{ left: '10%', right: '10%' }}>
            <LinearProgress />
          </Box>
        ) : select.mypatients.length === 0 ? (
          <Box
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            data-testid="component-my patients-box-no patient note"
          >
            <Typography
              sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
              variant="h6"
              component="span"
              align="center"
            >
              {t('home.label.nopatients')}
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
              {t('home.label.nopatientsexplanation')}
            </Typography>
          </Box>
        ) : (
          <List dense={false} data-testid="component-my patients-list-patient">
            {select.mypatients.map((mypatient) => {
              c += 1
              return (
                <ListItem key={'patient-' + mypatient.patientid}>
                  <PatientCard patient={mypatient} index={c} />
                </ListItem>
              )
            })}
          </List>
        )}
      </Box>
    </Box>
  )
}
