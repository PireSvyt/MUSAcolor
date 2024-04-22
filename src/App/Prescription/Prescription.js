import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'

import Appbar from '../Appbar/Appbar.js'
import { servicePrescriptionGet } from '../services/prescription.services.js'
import Exercise from './Exercise/Exercise.js'
import { random_id, stringifyDate } from '../services/toolkit.js'

export default function Prescription() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Prescription')
  }
  // i18n
  const { t } = useTranslation()

  // State
  const [isAvailable, setIsAvailable] = React.useState(null)
  const [expandedExercise, setExpandedExercise] = React.useState(null)

  // Selects
  const select = {
    editionDate: useSelector((state) => state.prescriptionSlice.editionDate),
    exercises: useSelector((state) => state.prescriptionSlice.exercises),
  }

  // Changes
  let changes = {
    expandExercise: (index) => {
      if (expandedExercise === index) {
        console.log('close exercise')
        setExpandedExercise(null)
      } else {
        setExpandedExercise(index)
        console.log('open exercise' + index)
      }
    },
  }

  if (isAvailable === null) {
    setIsAvailable('wip')
    servicePrescriptionGet({
      prescriptionid: window.location.href.split('/prescription/')[1],
    }).then(() => {
      setIsAvailable('available')
    })
  }

  let skeleton = null

  let c = -1

  return (
    <Box>
      <Appbar route="prescription" title={t('generic.label.product')} />
      <Box sx={{ height: 70 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {isAvailable !== 'available' ? (
          skeleton
        ) : select.exercises.length === 0 ? (
          skeleton
        ) : (
          <Box
            sx={{
              width: '80%',
              pt: 3,
            }}
            display="flex"
            flexDirection="column"
          >
            <Typography component="span" variant="h5">
              {stringifyDate(select.editionDate)}
            </Typography>
            <Typography sx={{ pb: 1 }} variant="overline">
              {t('prescription.label.title')}
            </Typography>

            {Object.entries(select.exercises).map((exercise) => {
              //console.log("exercise", exercise)
              c += 1
              return (
                <Exercise
                  key={random_id()}
                  exercise={exercise[1]}
                  index={c}
                  expanded={expandedExercise}
                  expand={changes.expandExercise}
                />
              )
            })}
          </Box>
        )}
      </Box>
    </Box>
  )
}
