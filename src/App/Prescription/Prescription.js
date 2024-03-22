import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
} from '@mui/material'

import Appbar from '../Appbar/Appbar.js'
import { servicePrescriptionGet } from '../services/prescription.services.js'
import Exercise from "./Exercise/Exercise.js";

import { random_id } from '../services/toolkit.js';

export default function Prescription() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Prescription')
  }
  // i18n
  const { t } = useTranslation()

  // State
  const [isAvailable, setIsAvailable] = React.useState(null);

  // Selects
  const select = {
    editionDate: useSelector((state) => state.prescriptionSlice.editionDate),
    exercises: useSelector((state) => state.prescriptionSlice.exercises),
  }

  // Changes
  let changes = {
  }

  
  if (isAvailable === null) {
    setIsAvailable('wip')
    servicePrescriptionGet({
      prescriptionid: window.location.href.split('/prescription/')[1]
    })
    .then(() => {
        setIsAvailable('available')
    })
  }

  // Duration
  function stringifyDuration() {
    let prescrptionDuration = 0
    Object.entries(select.exercises).forEach(exercise => {
      prescrptionDuration += exercise[1].duration
    })
    return toMinutesString(prescrptionDuration)
  }

  function stringifyDate() {
    let date = new Date(select.editionDate)
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return date.toLocaleString('fr-FR', options)
    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
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
            textAlign: 'center'
        }}
      >
        <Typography 
          component="span" 
          variant="h5"
          sx={{pt:2}}
        >
          {t('prescription.label.title')}
        </Typography>
    
        {isAvailable !== 'available' ? (
          skeleton
        ) : select.exercises.length === 0 ? (
          skeleton
        ) : (
          <Box
            sx={{                        
                width: '80%'
            }}
          >
            <Typography 
              component="span" 
              variant="body1"
              sx={{pb:2}}
            >
              {stringifyDate() + ' / ' + stringifyDuration()}
            </Typography>

            {Object.entries(select.exercises).map((exercise) => {
              //console.log("exercise", exercise)
              return (
                <Exercise key={random_id()} exercise={exercise[1]} index={c} />
              )
            })}
          </Box>
        )}
      
      </Box>
    </Box>
  )
}

function toMinutesString (seconds) {
  var sec_num = parseInt(seconds, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  return minutes + 'min'
  /*
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
  */
}