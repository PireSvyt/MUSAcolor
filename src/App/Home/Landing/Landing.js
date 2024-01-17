import React from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, Button, Box, Typography } from '@mui/material'

// Reducers
import appStore from '../../store.js'

export default function Landing() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("Landing");
  }
  // i18n
  const { t } = useTranslation()

  // Changes
  const changes = {
    signin: () => {
      appStore.dispatch({
        type: 'signinModalSlice/open',
      })
    },
  }

  // Render
  return (
    <Box data-testid="page-landing">
      <Box textAlign="center">
        <Button
          onClick={changes.signin}
          size="large"
          data-testid="page-landing-button-sign in"
        >
          {t('generic.button.signin')}
        </Button>
      </Box>
    </Box>
  )
}
