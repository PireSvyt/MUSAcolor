// Inputs
import {
  exerciseSaveInputs,
  exerciseDeleteInputs,
  exerciseGetInputs,
  exerciseGetMineInputs
} from './exercise.services.inputs.js'
// Services
import serviceProceed from './serviceProceed.js'
import appStore from '../store.js'

export async function serviceExerciseSave() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExerciseSave')
  }
  await serviceProceed(exerciseSaveInputs)
}

export async function serviceExerciseDelete(exerciseid) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExerciseDelete')
  }
  let directInputs = {
    exerciseid: exerciseid,
  }
  await serviceProceed(exerciseDeleteInputs, directInputs)
}

export async function serviceExerciseGet(exerciseid) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExerciseGet')
  }
  let directInputs = {
    exerciseid: exerciseid,
  }
  await serviceProceed(exerciseGetInputs, directInputs)
}

export async function serviceExerciseGetMine() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExerciseGetMine')
  }
  let directInputs = {}
  await serviceProceed(exerciseGetMineInputs, directInputs)
}

export function serviceExerciseGetDuration(exercise) {
  if (exercise.exerciseid === 'userDefined') {
    return Number(exercise.data.duration)
  } else {
    let exercises = appStore.getState().userSlice.exercises
    if (exercises.length === 0) {
      return 0
    } else {
      let resultSend = false
      //console.log("serviceExerciseGetDuration exercises", exercises)
      Object.values(exercises).forEach(ex => {
        //console.log("serviceExerciseGetDuration ex", ex)
        if (ex.exerciseid === exercise.exerciseid) {
          console.log('serviceExerciseGetDuration >> duration', Number(ex.data.duration), ex )
          resultSend = true
          if (ex.data.duration !== undefined && ex.data.duration !== null) {
            return Number(ex.data.duration) + 0
          } else {
            return 0
          }
        }
      })
      if (!resultSend) { return 0 } 
    }   
  }
}