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
import { random_id, toTimeString } from '../../services/toolkit.js';

export default function Exercise(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Exercise')
  }
  // i18n
  const { t } = useTranslation()

  return (
    <Accordion
        key={random_id()}
        sx={{
            width: '100%'
        }}
        expanded={props.expanded !== null ? props.expanded === props.index : false}
        onChange={() => {
            if (props.expand !== undefined) {
                props.expand(props.index)
            }
        }}
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <Typography 
            component="span" 
            variant="h6"
            >
                { props.exercise.exerciseid !== "userDefined" ? 
                    props.exercise.name : 
                    props.exercise.data.name                
                }
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
                            variant="overline"
                            color={'grey'}
                            align='left'
                        >
                            {t('prescription.label.posology')}
                        </Typography> 
                        <Typography 
                            component="span" 
                            variant="body1"
                            align='left'
                            sx={{ whiteSpace: "pre-line", fontStyle: 'italic' }}
                        >
                            {props.exercise.posology}
                        </Typography> 
                    </Box>
                )}

                {(
                    props.exercise.data.instructions === undefined 
                    || props.exercise.data.instructions === null 
                    || props.exercise.data.instructions === ''
                 ) ? (null) : (
                    <Box
                    sx={{                        
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        pb: 1
                    }}
                    >
                        <Typography 
                            variant="overline"
                            color={'grey'}
                            align='left'
                        >
                            {t('prescription.label.instructions')}
                        </Typography>   
                        <Typography 
                            component="span" 
                            variant="body1"
                            align='left'
                            sx={{ whiteSpace: "pre-line" }}
                        >
                            {props.exercise.data.instructions}
                        </Typography>  
                    </Box>
                )}
                {props.exercise.data === undefined ? (null) : 
                props.exercise.data.videoToken === undefined ? (null) : (
                    <Box
                        sx={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 2,
                            pb: 1
                        }}
                    >   
                        <Box
                            sx={{  
                                    
                                width: '80%',
                                maxWidth: 500,
                            }}
                        > 
                            <YoutubeEmbed embedId={props.exercise.data.videoToken} />
                        </Box>
                    </Box>
                )}

            </Box>

        </AccordionDetails>
    </Accordion>
  )
}