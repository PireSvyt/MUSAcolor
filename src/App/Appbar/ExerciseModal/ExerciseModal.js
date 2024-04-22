import React, { useState, useEffect } from 'react'
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
  Stack,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

// Component
import Exercise from '../../Prescription/Exercise/Exercise.js'
// Services
import { serviceExerciseSave } from '../../services/exercise.services.js'
import { serviceUserGetDetails } from '../../services/user.services.js'
import { exerciseSaveInputs } from '../../services/exercise.services.inputs.js'
//import { debounce, random_id, throttle } from '../../services/toolkit.js'
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

  // State
  const [repackagedExercise, setRepackagedExercise] = useState(
    exerciseSaveInputs.repackagingfunction({ inputs: select.inputs }, [])
  )
  useEffect(() => {
    setRepackagedExercise(
      exerciseSaveInputs.repackagingfunction({ inputs: select.inputs }, [])
    )
  }, [select.inputs])
  /*const [debounced, setDebounced] = useState('')
  const [debounces, setDebounces] = useState([])
  const debounceOffset = 400*/

  /*let dbSetRepackagedExercise0 = debounce((expirationDate) => {
    console.log("debounced", debounced, expirationDate)
    if (  expirationDate + debounceOffset < Date.now() // expiration date is expired for this trigger
       && debounced + debounceOffset < Date.now()      // most recent debounce date is expired
    ) {
      setRepackagedExercise(
        exerciseSaveInputs.repackagingfunction({inputs: appStore.getState().exerciseModalSlice.inputs}, [])
      )
    }
  }, debounceOffset);*/
  //let dbSetRepackagedExercise = debounce(repackageExercise, debounceOffset)
  /*function repackageExercise () {
    console.log("  > repackageExercise")
    console.log("    debounces", debounces)
    let triggerid = debounces.lastItem
    console.log("    triggerid", triggerid)
    console.log("    debounced", debounced)
    if (debounced === triggerid) {
      console.log("    setRepackagedExercise")
      setRepackagedExercise(
        exerciseSaveInputs.repackagingfunction({inputs: appStore.getState().exerciseModalSlice.inputs}, [])
      )
    } else {
      console.log("    triggerid !== debounced => NO UPDATE")
    }
    console.log("  X repackageExercise")
  }
  function debounceRepackageExercise () {
    console.log("> debounceRepackageExercise")
    let triggerid = random_id()
    console.log("  triggerid", triggerid)
    setDebounced(triggerid)
    setDebounces([...debounces].push(triggerid))
    console.log("  setDebounced to triggerid")
    let timer;
    timer = setTimeout(() => repackageExercise(), debounceOffset);
    console.log("X debounceRepackageExercise")
  }*/
  //let tSetRepackagedExercise = throttle(repackageExercise, debounceOffset);

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: 'exerciseModalSlice/close',
      })
    },
    name: (e) => {
      //dbSetRepackagedExercise(Date.now())
      //dbSetRepackagedExercise()
      //debounceRepackageExercise()
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
      //tSetRepackagedExercise()
    },
    type: (e) => {
      //debounceRepackageExercise()
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
    instructions: (e) => {
      //debounceRepackageExercise()
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
      //debounceRepackageExercise()
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
    create: () => {
      console.log('ExerciseModal.create')
      serviceExerciseSave().then(() => {
        serviceUserGetDetails()
      })
    },
  }

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
                <MenuItem value={'videoYoutube'}>
                  {t('exercise.label.videoYoutube')}
                </MenuItem>
              </Select>
            </FormControl>

            {select.inputs.type !== 'videoYoutube' ? null : (
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
                </FormControl>
              </Box>
            )}

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

            <Box
              sx={{
                width: '100%',
                mt: 3,
              }}
            >
              <Typography variant="overline" color="grey">
                {t('exercise.label.rendering')}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  mt: 2,
                }}
              >
                <Exercise
                  exercise={repackagedExercise.inputs}
                  index={0}
                  expanded={0}
                  expand={() => null}
                />
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
