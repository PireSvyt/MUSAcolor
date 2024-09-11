import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  FormLabel,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  CheckBox
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

import { serviceExamCreate } from '../../services/exam.services.js'
import { random_string } from '../../services/toolkit.js'
import { servicePatientGet } from '../../services/patient.services.js'

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
          type: 'pvo',
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
    remote: (e) => {
      appStore.dispatch({
        type: 'examModalSlice/change',
        payload: {
          inputs: {
            remote: e.target.checked,
          },
          errors: {
            remote: false,
          },
        },
      })
    },
    launch: () => {
      console.log('ExamModal.launch')
      appStore.dispatch({
        type: 'examModalSlice/close',
      })
      if (select.inputs.remote === true) {
        // Create the exam (to enable practician to copy link)
        serviceExamCreate({
          type: select.inputs.type,
          token: random_string(),
          patientid: select.patientid
        }).then(() => {
          servicePatientGet(select.patientid)
        })
      } else {
        // Go to the exam
        window.location =
          '/exam?type=' + select.inputs.type + '&patientid=' + select.patientid
      }
    },
  }

  // Render
  return (
    <Box>
      <Dialog
        open={select.open}
        onClose={changes.close}
        fullWidth={true}
        data-testid="modal-exam"
      >
        <DialogTitle>{t('exam.label.new')}</DialogTitle>
        <DialogContent
        //sx={{
        //  height: componentHeight,
        //}}
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
              <FormLabel>{t('generic.input.type')}</FormLabel>
              <RadioGroup
                defaultValue={select.inputs.type}
                name="radio-buttons-group"
                onChange={changes.type}
                data-testid="modal-exam-select-examtype"
              >
                <FormControlLabel
                  value="pvo"
                  control={<Radio />}
                  label={t('exam.exams.pvo.name')}
                  data-testid="modal-exam-select-examtype-PVO"
                />
                <FormControlLabel
                  value="luscher8"
                  control={<Radio />}
                  label={t('exam.exams.luscher8.name')}
                  data-testid="modal-exam-select-examtype-Luscher 8)"
                />
              </RadioGroup>
            </FormControl>
                           
            <FormControl>
              <FormLabel>{t('generic.input.remote')}</FormLabel>
              <Checkbox
                checked={select.inputs.remote}
                onChange={changes.remote}
              />
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button data-testid="modal-exam-button-close" onClick={changes.close}>
            {t('generic.button.cancel')}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={changes.launch}
            disabled={select.disabled}
            loading={select.loading}
            data-testid="modal-exam-button-proceed"
          >
            {t('generic.button.proceed')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
