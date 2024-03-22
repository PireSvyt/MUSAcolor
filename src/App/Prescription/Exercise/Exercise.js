import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography, Button,
  Accordion, AccordionActions, AccordionSummary, AccordionDetails
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "./YoutubeEmbed/YoutubeEmbed.css";
import YoutubeEmbed from "./YoutubeEmbed/YoutubeEmbed.js";
import { random_id } from '../../services/toolkit.js';

export default function Exercise(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Exercise')
  }
  // i18n
  const { t } = useTranslation()

  //console.log("props.exercise", props.exercise)

  return (
    <Accordion
    key={random_id()}
    sx={{
        width: '100%'
    }}
    >
    <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
    >
        <Typography 
        component="span" 
        variant="h6"
        >
        {props.exercise.name + ' / ' + toMinutesString(props.exercise.duration)}
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

        { props.exercise.posology === undefined 
        || props.exercise.posology === null 
        || props.exercise.posology === '' ? (null) : (
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
                    {t('prescription.label.posology')}
                </Typography> 
                <Typography 
                    component="span" 
                    variant="body1"
                    align='justify'
                    sx={{ whiteSpace: "pre-line", fontStyle: 'italic' }}
                >
                    {props.exercise.posology}
                </Typography> 
            </Box>
        )}

        { props.exercise.instructions === undefined 
        || props.exercise.instructions === null 
        || props.exercise.instructions === '' ? (null) : (
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
                    {t('prescription.label.exercise')}
                </Typography>   
                <Typography 
                    component="span" 
                    variant="body1"
                    sx={{ whiteSpace: "pre-line" }}
                >
                    {props.exercise.instructions}
                </Typography>  
            </Box>
        )}

        <Box
            sx={{                        
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pt: 1
            }}
        >   
            {props.exercise.data === undefined ? (null) : 
                props.exercise.data.videoToken === undefined ? (null) : (
                <YoutubeEmbed embedId={props.exercise.data.videoToken} />
            )}
        </Box>

        </Box>

    </AccordionDetails>
    </Accordion>
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