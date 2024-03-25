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
  FormControlLabel,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  Switch,
  Stack
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

// Component
import Exercise from "../../Prescription/Exercise/Exercise.js";
// Services
import { serviceExerciseSave } from '../../services/exercise.services.js'
import { serviceUserGetDetails } from '../../services/user.services.js'
import {
  exerciseSaveInputs,
} from '../../services/exercise.services.inputs.js'
// Reducers
import appStore from '../../store.js'

export default function ExerciseModal() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("ExerciseModal");
  }
  // i18n
  const { t } = useTranslation()

  // Constants
  const componentHeight = window.innerHeight - 115

  // Selects
  const select = {
    open: useSelector((state) => state.exerciseModalSlice.open),
    disabled: useSelector((state) => state.exerciseModalSlice.disabled),
    loading: useSelector((state) => state.exerciseModalSlice.loading),
    inputs: useSelector((state) => state.exerciseModalSlice.inputs),
    errors: useSelector((state) => state.exerciseModalSlice.errors),
  }

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: 'exerciseModalSlice/close',
      })
    },
    name: (e) => {
      appStore.dispatch({
        type: 'exerciseModalSlice/change',
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
    type: (e) => {
      appStore.dispatch({
        type: 'exerciseModalSlice/change',
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
    duration: (e) => {
      appStore.dispatch({
        type: 'exerciseModalSlice/change',
        payload: {
          inputs: {
            duration: e.target.value,
          },
          errors: {
            duration: false,
          },
        },
      })
    },
    instructions: (e) => {
      appStore.dispatch({
        type: 'exerciseModalSlice/change',
        payload: {
          inputs: {
            instructions: e.target.value,
          },
          errors: {
            instructions: false,
          },
        },
      })
    },
    videoToken: (e) => {
      appStore.dispatch({
        type: 'exerciseModalSlice/change',
        payload: {
          inputs: {
            videoToken: e.target.value,
          },
          errors: {
            videoToken: false,
          },
        },
      })
    },
    title: (e) => {
      appStore.dispatch({
        type: 'exerciseModalSlice/change',
        payload: {
          inputs: {
            title: e.target.value,
          },
          errors: {
            title: false,
          },
        },
      })
    },
    fixedDuration: (e) => {
      appStore.dispatch({
        type: 'exerciseModalSlice/change',
        payload: {
          inputs: {
            fixedDuration: e.target.checked,
          },
          errors: {
            fixedDuration: false,
          },
        },
      })
    },
    create: () => {
      console.log('ExerciseModal.create')
      serviceExerciseSave()
      .then(() => {
        serviceUserGetDetails()
      })
    },
  }

  let repackagedExercise = exerciseSaveInputs.repackagingfunction({inputs: select.inputs}, [])
  //console.log("repackagedExercise", repackagedExercise)

  // Render
  return (
    <Box>
      <Dialog
        open={select.open}
        onClose={changes.close}
        fullWidth={true}
        data-testid="modal-exercise"
      >
        <DialogTitle>{t('exercise.label.title')}</DialogTitle>
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
                error={select.errors.name}
                onChange={changes.name}
                autoComplete="off"
                data-testid="modal-exercise-input-name"
              />
            </FormControl>
            <FormControl variant="standard" size="small" sx={{ mt: 0 }}>
              <InputLabel required id="modal-exercise-select-typelabel">
                {t('generic.input.type')}
              </InputLabel>        
              <Select
                name="type"
                value={select.inputs.type}
                error={select.errors.type}
                onChange={changes.type}
                labelId="modal-exercise-select-typelabel"
                data-testid="modal-exercise-select-type"
                small
              >
                <MenuItem value={'videoYoutube'}>{t('exercise.label.videoYoutube')}</MenuItem>
              </Select>
            </FormControl>

            {select.inputs.type !== 'userDefined' ? (null) : (
              <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}>
                <FormControl>
                  <Box 
                    component="form"
                    display='flex' 
                    direction="row" 
                    spacing={1} 
                    alignItems="center"
                  >
                    <Typography>
                      {t('exercise.input.variableDuration')}
                    </Typography>
                    <Switch 
                      name="fixedDuration"
                      checked={select.inputs.fixedDuration}
                      onChange={changes.fixedDuration}
                      data-testid="modal-exercise-switch-fixedDuration"
                      inputProps={{ 'aria-label': 'controlled' }}
                    />                   
                    <Typography>
                      {t('exercise.input.fixedDuration')}
                    </Typography>
                  </Box>
                  {select.inputs.fixedDuration === false ? (null) : (
                    <TextField
                        name="duration"
                        label={t('exercise.input.duration')}
                        variant="standard"
                        value={select.inputs.duration}
                        onChange={changes.duration}
                        autoComplete="off"
                        error={select.errors.duration}
                        data-testid="modal-exercise-input-duration"
                        type="number"
                      />
                  )}
                  
                  <TextField
                    name="instructions"
                    label={t('exercise.input.instructions')}
                    variant="standard"
                    value={select.inputs.instructions}
                    onChange={changes.instructions}
                    autoComplete="off"
                    error={select.errors.instructions}
                    data-testid="modal-exercise-input-instructions"
                    multiline
                  />
                </FormControl>
              </Box>
            )}

            {select.inputs.type !== 'videoYoutube' ? (null) : (
              <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}>
                <FormControl>
                  <TextField
                    name="videoToken"
                    required
                    label={t('exercise.input.videoToken')}
                    variant="standard"
                    value={select.inputs.videoToken}
                    onChange={changes.videoToken}
                    autoComplete="off"
                    error={select.errors.videoToken}
                    data-testid="modal-exercise-input-videoToken"
                  />
                  <TextField
                    name="duration"
                    required
                    label={t('exercise.input.duration')}
                    variant="standard"
                    value={select.inputs.duration}
                    onChange={changes.duration}
                    autoComplete="off"
                    error={select.errors.duration}
                    data-testid="modal-exercise-input-duration"
                    type="number"
                  />
                  <TextField
                    name="instructions"
                    label={t('exercise.input.instructions')}
                    variant="standard"
                    value={select.inputs.instructions}
                    onChange={changes.instructions}
                    autoComplete="off"
                    error={select.errors.instructions}
                    data-testid="modal-exercise-input-instructions"
                    multiline
                  />
                </FormControl>
              </Box>
            )}

            <Box
              sx={{
                width: '100%',
                mt: 2
              }}
            >              
              <Typography variant='h6'>{t('exercise.label.rendering')}</Typography>
              <Box
                sx={{
                  width: '100%',
                  mt: 2
                }}
              > 
                <Exercise exercise={repackagedExercise.inputs} />
              </Box>  
            </Box>

          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            data-testid="modal-exercise-button-close"
            onClick={changes.close}
          >
            {t('generic.button.cancel')}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={changes.create}
            disabled={select.disabled}
            loading={select.loading}
            data-testid="modal-exercise-button-proceed"
          >
            {t('generic.button.proceed')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
