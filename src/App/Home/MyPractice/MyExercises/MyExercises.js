import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import ExerciseCard from './ExerciseCard/ExerciseCard.js'

export default function MyExercises() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('MyExercises')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    userState: useSelector((state) => state.userSlice.state),
    myexercises: useSelector((state) => state.userSlice.exercises),
  }

  let c = -1

  return (
    <Box 
    data-testid="component-my exercises"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Box
        sx={{
          width: '80%',
        }}
      >

      {select.userState.details !== 'available' ? (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress/>
        </Box>
      ) : select.myexercises.length === 0 ? (
        <Box
          sx={{
            m: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          data-testid="component-my exercises-box-no exercise note"
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
            variant="h6"
            component="span"
            align="center"
          >
            {t('home.label.noexercises')}
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
            {t('home.label.noexercisesexplanation')}
          </Typography>
        </Box>
      ) : (
        <List dense={false} data-testid="component-my exercises-list-exercise">
          {select.myexercises.map((myexercise) => {
            if (myexercise.exerciseid === 'userDefined') {
              return null
            } else {
              c += 1
              return (
                <ListItem key={'exercise-' + myexercise.exerciseid}>
                  <ExerciseCard exercise={myexercise} index={c} />
                </ListItem>
              )
            }
          })}
        </List>
      )}
      </Box>
    </Box>
  )
}
