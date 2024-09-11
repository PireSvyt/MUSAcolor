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
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
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
          inputs: {
            type: select.inputs.type,
            token: random_string(),
            patientid: select.patientid,
          },
        }).then(() => {
          appStore.dispatch({
            type: 'examModalSlice/close',
          })
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
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <Typography>{t('generic.input.type')}</Typography>
            <RadioGroup
              defaultValue={select.inputs.type}
              name="radio-buttons-group"
              onChange={changes.type}
              data-testid="modal-exam-select-examtype"
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mb: -0.5,
                }}
              >
                <Radio
                  value="pvo"
                  data-testid="modal-exam-select-examtype-PVO"
                />
                <Typography>{t('exam.exams.pvo.name')}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mb: -0.5,
                }}
              >
                <Radio
                  value="luscher8"
                  data-testid="modal-exam-select-examtype-Luscher 8)"
                />
                <Typography>{t('exam.exams.luscher8.name')}</Typography>
              </Box>
            </RadioGroup>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mt: 2,
                ml: -1.5,
              }}
            >
              <Checkbox
                checked={select.inputs.remote}
                onChange={changes.remote}
                //disabled
              />
              <Typography>{t('generic.input.remote')}</Typography>
            </Box>
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
