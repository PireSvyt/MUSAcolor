import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Chip,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  List,
  ListItem,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

// Components
import ExerciseCard from './ExerciseCard/ExerciseCard.js'
// Services
import { random_id } from '../../services/toolkit.js'
import { servicePrescriptionSave } from '../../services/prescription.services.js'
import { servicePatientGet } from '../../services/patient.services.js'
// Reducers
import appStore from '../../store.js'

export default function PrescriptionModal() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("PrescriptionModal");
  }
  // i18n
  const { t } = useTranslation()

  // Constants
  const componentHeight = window.innerHeight - 115

  // State
  const [selectedExercise, setSelectedExercise] = React.useState('')

  // Selects
  const select = {
    open: useSelector((state) => state.prescriptionModalSlice.open),
    disabled: useSelector((state) => state.prescriptionModalSlice.disabled),
    loading: useSelector((state) => state.prescriptionModalSlice.loading),
    inputs: useSelector((state) => state.prescriptionModalSlice.inputs),
    errors: useSelector((state) => state.prescriptionModalSlice.errors),
    patientid: useSelector((state) => state.patientSlice.patientid),
    myexercises: useSelector((state) => state.userSlice.exercises),
  }

  //console.log("select.inputs", select.inputs)

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: 'prescriptionModalSlice/close',
      })
    },
    selectExercise: (e) => {
      //console.log("PrescriptionModal.selectExercise", e.target.value)
      // Add exercise
      appStore.dispatch({
        type: 'prescriptionModalSlice/addExercise',
        payload: {
          exerciseid: e.target.value,
        },
      })
      // Reset
      setSelectedExercise('')
    },
    create: () => {
      console.log('PrescriptionModal.create')
      servicePrescriptionSave({
        prescriptionid: random_id(),
        patientid: window.location.href.split('/patient/')[1],
      }).then(() => {
        servicePatientGet(window.location.href.split('/patient/')[1])
      })
    },
  }

  // Render
  let c = -1
  return (
    <Box>
      <Dialog
        open={select.open}
        onClose={changes.close}
        fullWidth={true}
        data-testid="modal-prescription"
      >
        <DialogTitle>{t('prescription.label.title')}</DialogTitle>
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
            <List dense={false}>
              {select.inputs.exercises.map((exercise) => {
                c += 1
                console.log('PrescriptionModal.exercise', exercise)
                return (
                  <ListItem key={'exercise-' + c}>
                    <ExerciseCard
                      exerciseid={exercise.exerciseid}
                      exercise={
                        select.myexercises.filter(
                          (ex) => ex.exerciseid === exercise.exerciseid
                        )[0]
                      }
                      posology={exercise.posology}
                      data={exercise.data}
                      errors={exercise.errors}
                      index={c}
                      patientid={window.location.href.split('/patient/')[1]}
                    />
                  </ListItem>
                )
              })}

              <ListItem key={'exercise-' + c + 1}>
                <FormControl fullWidth>
                  <InputLabel>{t('prescription.label.newexercise')}</InputLabel>
                  <Select
                    value={selectedExercise}
                    label={t('prescription.exercise.newexercise')}
                    onChange={changes.selectExercise}
                  >
                    {Object.entries(select.myexercises).map((exercise) => {
                      //console.log("menuitem", exercise[1])
                      return (
                        <MenuItem
                          value={exercise[1].exerciseid}
                          key={random_id()}
                        >
                          {exercise[1].type === 'userDefined' ? (
                            <Box display="flex">
                              <Typography>
                                {t('exercise.label.' + exercise[1].type)}
                              </Typography>
                            </Box>
                          ) : (
                            <Box display="flex">
                              <Chip
                                key={random_id()}
                                label={t('exercise.label.' + exercise[1].type)}
                                size="small"
                                sx={{ mr: 1 }}
                              />
                              <Typography>{exercise[1].name}</Typography>
                            </Box>
                          )}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="modal-prescription-button-close"
            onClick={changes.close}
          >
            {t('generic.button.cancel')}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={changes.create}
            disabled={select.disabled}
            loading={select.loading}
            data-testid="modal-prescription-button-proceed"
          >
            {t('generic.button.save')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

function toMinutesString(seconds) {
  var sec_num = parseInt(seconds, 10)
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - hours * 3600) / 60)
  var seconds = sec_num - hours * 3600 - minutes * 60

  return minutes + 'min'
  /*
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
  */
}
