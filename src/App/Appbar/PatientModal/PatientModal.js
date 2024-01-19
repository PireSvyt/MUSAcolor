import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

// Services
import { servicePatientCreate } from '../../services/patient.services.js'
// Reducers
import appStore from '../../store.js'

export default function PatientModal() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("PatientModal");
  }
  // i18n
  const { t } = useTranslation()

  // Constants
  const componentHeight = window.innerHeight - 115

  // Selects
  const select = {
    open: useSelector((state) => state.patientModalSlice.open),
    disabled: useSelector((state) => state.patientModalSlice.disabled),
    loading: useSelector((state) => state.patientModalSlice.loading),
    inputs: useSelector((state) => state.patientModalSlice.inputs),
    errors: useSelector((state) => state.patientModalSlice.errors),
  }

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: 'patientModalSlice/close',
      })
    },
    name: (e) => {
      appStore.dispatch({
        type: 'patientModalSlice/change',
        payload: {
          inputs: {
            name: e.target.value,
          },
          errors: {
            name: false,
          },
        },
      })
    },
    create: () => {
      console.log('PatientModal.create')
      servicePatientCreate()
    },
  }

  // Render
  return (
    <Box>
      <Dialog
        open={select.open}
        onClose={changes.close}
        fullWidth={true}
        data-testid="modal-patient"
      >
        <DialogTitle>{t('patient.label.new')}</DialogTitle>
        <DialogContent
          sx={{
            height: componentHeight,
          }}
        >
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <FormControl>
              <TextField
                name="name"
                required
                label={t('generic.input.name')}
                variant="standard"
                value={select.inputs.name}
                onChange={changes.name}
                autoComplete="off"
                error={select.errors.name}
                data-testid="modal-patient-input-name"
              />
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="modal-patient-button-close"
            onClick={changes.close}
          >
            {t('generic.button.cancel')}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={changes.create}
            disabled={select.disabled}
            loading={select.loading}
            data-testid="modal-patient-button-proceed"
          >
            {t('generic.button.proceed')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
