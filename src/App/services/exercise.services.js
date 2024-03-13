// Inputs
import {
  exerciseSaveInputs,
  exerciseDeleteInputs,
  exerciseGetInputs,
} from './exercise.services.inputs.js'
// Services
import serviceProceed from './serviceProceed.js'

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
