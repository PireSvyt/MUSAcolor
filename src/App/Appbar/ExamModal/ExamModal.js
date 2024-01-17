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

import { serviceExamCreate } from '../../services/exam.services.js'
// Reducers
import appStore from '../../store.js'
import { servicePatientGet } from '../../services/patient.services.js'

export default function ExamModal() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("ExamModal");
  }
  // i18n
  const { t } = useTranslation()

  // Constants
  const componentHeight = window.innerHeight - 115

  // Selects
  const select = {
    open: useSelector((state) => state.examModalSlice.open),
    disabled: useSelector((state) => state.examModalSlice.disabled),
    loading: useSelector((state) => state.examModalSlice.loading),
    inputs: useSelector((state) => state.examModalSlice.inputs),
    errors: useSelector((state) => state.examModalSlice.errors),
  }

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: 'examModalSlice/close',
      })
    },
    type: (e) => {
      appStore.dispatch({
        type: 'examModalSlice/change',
        payload: {
          inputs: {
            type: e.target.value,
          },
          errors: {
            type: false,
          },
        },
      })
    },
    launch: () => {
      console.log('ExamModal.launch')

      /**
       * TEMPORARY WORKAROUND
       * dummy exam creation
       */
      appStore.dispatch({
        type: 'examModalSlice/change',
        payload: {
          inputs: {
            type: 'dummy',
            date: Date.now(),
            results: { dummy: 'dummy' },
          },
          errors: {
            type: false,
          },
        },
      })
      serviceExamCreate()
      // END OF WORKAROUND
    },
  }

  // Render
  return (
    <Box>
      <Dialog open={select.open} onClose={changes.close} fullWidth={true}>
        <DialogTitle>{t('exam.label.new')}</DialogTitle>
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
                name="type"
                required
                label={t('generic.input.type')}
                variant="standard"
                value={select.inputs.type}
                onChange={changes.type}
                autoComplete="off"
                error={select.errors.type}
                data-testid="modal-patient-input-type"
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
            onClick={changes.launch}
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
