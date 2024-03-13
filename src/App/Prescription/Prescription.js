import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  TextField,
  Box,
  FormControl,
  Typography, Button,
  Accordion, AccordionActions, AccordionSummary, AccordionDetails
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Appbar from '../Appbar/Appbar.js'
import { servicePrescriptionGet } from '../services/prescription.services.js'
import "./YoutubeEmbed/YoutubeEmbed.css";
import YoutubeEmbed from "./YoutubeEmbed/YoutubeEmbed.js";
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
          sx={{p:2}}
        >
          {t('prescription.label.title') + stringifyDate() + ' / ' + stringifyDuration()}
        </Typography>    
    
        {isAvailable !== 'available' ? (
          skeleton
        ) : select.exercises.length === 0 ? (
          skeleton
        ) : (
          Object.entries(select.exercises).map((exercise) => {
            console.log("exercise", exercise)
            return (
              <Accordion
                key={random_id()}
                sx={{
                  width: '60%'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography 
                    component="span" 
                    variant="h6"
                  >
                    {exercise[1].name + ' / ' + toMinutesString(exercise[1].duration)}
                  </Typography>                      
                </AccordionSummary>
                
                <AccordionDetails>
                  
                  <Box
                    sx={{                        
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                  >

                    { exercise[1].data.instructions === undefined ? (null) : (
                      <Box
                        sx={{                        
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            pb: 1
                        }}
                      >
                        <Typography 
                          component="span" 
                          variant="h6"
                          align='justify'
                        >
                          {t('prescription.label.instructions')}
                        </Typography> 
                        <Typography 
                          component="span" 
                          variant="body1"
                          align='justify'
                          sx={{ whiteSpace: "pre-line" }}
                        >
                          {exercise[1].data.instructions}
                        </Typography> 
                      </Box>
                    )}

                    <Box
                      sx={{                        
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          pt: 1, pb: 1
                      }}
                    >   
                      <Typography 
                        component="span" 
                        variant="h6"
                        align='justify'
                      >
                        {t('prescription.label.exercise')}
                      </Typography>   
                      <Typography 
                        component="span" 
                        variant="body1"
                        sx={{ whiteSpace: "pre-line" }}
                      >
                        {exercise[1].data.intro}
                      </Typography>  
                      <Box
                        sx={{pt:2}}
                      >
                        <YoutubeEmbed embedId={exercise[1].data.token} />
                      </Box>
                    </Box>

                  </Box>

                </AccordionDetails>
              </Accordion>
            )
          })
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