import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  TextField,
  Box,
  FormControl,
  Typography, Button
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import Appbar from '../Appbar/Appbar.js'
import { servicePrescriptionGet } from '../services/prescription.services.js'

export default function Prescription() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Prescription')
  }
  // i18n
  const { t } = useTranslation()

  // State
  const [isAvailable, setIsAvailable] = React.useState(null);

  // Changes
  let changes = {
  }

  
  if (isAvailable === null) {
    setIsAvailable('wip')
    servicePrescriptionGet(window.location.href.split('/prescription/')[1])
    .then(() => {
        setIsAvailable('available')
    })
  }

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
      </Box>
    </Box>
  )
}

