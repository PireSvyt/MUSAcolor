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
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

// Reducers
import appStore from '../../store.js'

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
    patientid: useSelector((state) => state.patientSlice.patientid),
  }

  // Defaults
  if (select.inputs.type === '') {
    appStore.dispatch({
      type: 'examModalSlice/change',
      payload: {
        inputs: {
          type: "pvo",
        },
      },
    })
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
      window.location = 
        '/exam?type=' + select.inputs.type + 
        '&patientid=' + select.patientid
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
            <FormControl variant="standard">
              <InputLabel>{t("generic.input.type")}</InputLabel>
              <Select
                value={select.inputs.type}
                label={t("generic.input.type")}
                onChange={changes.type}
                error={select.errors.type}
              >
                <MenuItem value={'pvo'}>{t('exam.exams.pvo.name')}</MenuItem>
              </Select>
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
