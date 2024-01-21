import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  TextField,
  Box,
  FormControl,
  Typography, Button
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import LinearProgress from '@mui/material/LinearProgress'

import { serviceAuthPasswordReset } from '../services/auth.services.js'
import { validateEmail } from '../services/toolkit.js'
import Appbar from '../Appbar/Appbar.js'
import appStore from '../store.js'

export default function PasswordReset() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('PasswordReset')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    passwordResetState: useSelector((state) => state.passwordResetSlice.state),
    inputs: useSelector((state) => state.passwordResetSlice.inputs),
    errors: useSelector((state) => state.passwordResetSlice.errors),
    disabled: useSelector((state) => state.passwordResetSlice.disabled),
  }

  // Changes
  let changes = {
    invalidinputs: () => {
      appStore.dispatch({
        type: 'passwordResetSlice/change',
        payload: {
          state: {
            passwordreset: 'invalidinputs',
          },
        },
      })
    },
    password: (e) => {
      appStore.dispatch({
        type: 'passwordResetSlice/change',
        payload: {
          inputs: {
            password: e.target.value,
          },
          errors: {
            password: false,
          },
          disabled: false
        },
      })
    },
    passwordrepeat: (e) => {
      appStore.dispatch({
        type: 'passwordResetSlice/change',
        payload: {
          inputs: {
            passwordrepeat: e.target.value,
          },
          errors: {
            passwordrepeat: false,
          },
          disabled: false
        },
      })
    },
    resetpassword: () => {
      // URL analysis
      let consolidatedInputs = {
        urllogin: undefined,
        urltoken: undefined
      }
      let queryString = window.location.search.split('?')[1]
      let queries = queryString.split('&')
      let passwordResetFlowInputs = {}
      queries.forEach((query) => {
        let queryBreakdown = query.split('=')
        passwordResetFlowInputs[queryBreakdown[0]] = queryBreakdown[1]
      })
      // Check login
      if (Object.keys(passwordResetFlowInputs).includes('login')) {
        if (passwordResetFlowInputs.login !== undefined && passwordResetFlowInputs.login !== "") {
          if (validateEmail(passwordResetFlowInputs.login)) {
            consolidatedInputs.urllogin = passwordResetFlowInputs.login
          }
        }
      }
      // Check token
      if (Object.keys(passwordResetFlowInputs).includes('token')) {
        if (passwordResetFlowInputs.token !== undefined && passwordResetFlowInputs.token !== "") {
          consolidatedInputs.urltoken = passwordResetFlowInputs.token
        }
      }
      serviceAuthPasswordReset(consolidatedInputs)
    },
    tohome: () => {
      window.location = '/'
    }
  }

  console.log('select.passwordResetState', select.passwordResetState)

  return (
    <Box>
      <Appbar route="passwordreset" title={t('generic.label.product')} />
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
        <Typography sx={{ p: 2, whiteSpace: 'pre-line' }} component="span" variant="h5" gutterBottom>
          {t('passwordreset.label.title')}
        </Typography>
        <Typography sx={{ p: 2, whiteSpace: 'pre-line' }} component="span" gutterBottom>
          {t('passwordreset.label.explanations')}
        </Typography>
        <FormControl>
          <TextField
            name="password"
            required
            label={t('generic.input.password')}
            variant="standard"
            value={select.inputs.password}
            onChange={changes.password}
            autoComplete="off"
            type="password"
            error={select.errors.password}
          />
          <TextField
            name="passwordrepeat"
            required
            label={t('generic.input.passwordrepeat')}
            variant="standard"
            value={select.inputs.passwordrepeat}
            onChange={changes.passwordrepeat}
            autoComplete="off"
            type="password"
            error={select.errors.passwordrepeat}
          />
          <LoadingButton
            variant="outlined"
            onClick={changes.resetpassword}
            sx={{ mt: 2, mb: 1 }}
            disabled={
              select.passwordResetState.passwordreset === 'loading'  || select.disabled === true
            }
            loading={select.passwordResetState.passwordreset === 'loading'}
          >
            {t('generic.button.continue')}
          </LoadingButton>
        </FormControl>
        { select.passwordResetState.passwordreset !== 'loading' ? (null) : (
          <Box sx={{ left: '10%', right: '10%' }}>
            <LinearProgress />
          </Box>
        )}
        { select.passwordResetState.passwordreset !== 'error' ? (null) : (
          <Typography sx={{ p: 2, whiteSpace: 'pre-line' }} component="span" gutterBottom>
            {t('passwordreset.label.erroronreset')}
          </Typography>
        )}
        { select.errors.url !== true ? (null) : (
          <Typography sx={{ p: 2, whiteSpace: 'pre-line' }} component="span" gutterBottom>
            {'ERROR URL'}
          </Typography>
        )}
        { select.passwordResetState.passwordreset !== 'available' ? (null) : (
          <Box 
          sx={{                        
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center'
          }}
          >
            <Typography sx={{ p: 2, whiteSpace: 'pre-line' }} component="span" gutterBottom>
              {t('passwordreset.label.successfulreset')}
            </Typography>
            <Button
              onClick={changes.tohome}
              size="large"
              variant='contained'
            >
              {t('generic.button.signin')}
            </Button>
          </Box>
        )}
      </Box>  
    </Box>
  )
}

