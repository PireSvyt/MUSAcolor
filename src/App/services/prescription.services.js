// Inputs
import {
  prescriptionCreateInputs,
  prescriptionSaveInputs,
  prescriptionDeleteInputs,
  prescriptionGetInputs,
} from './prescription.services.inputs.js'
// Services
import serviceProceed from './serviceProceed.js'
import { serviceExerciseGetDuration } from './exercise.services.js'
import { toTimeString } from './toolkit.js'

export async function servicePrescriptionCreate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePrescriptionCreate')
  }
  await serviceProceed(prescriptionCreateInputs, directInputs)
}
export async function servicePrescriptionSave(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePrescriptionSave')
  }
  await serviceProceed(prescriptionSaveInputs, directInputs)
}

export async function servicePrescriptionDelete(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePrescriptionDelete')
  }
  await serviceProceed(prescriptionDeleteInputs, directInputs)
}

export async function servicePrescriptionGet(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePrescriptionGet')
  }
  await serviceProceed(prescriptionGetInputs, directInputs)
}

export function servicePrescriptionGetDuration(exercises) {
  let prescrptionDuration = 0
  console.log('servicePrescriptionGetDuration exercises', exercises)
  if (exercises) {
    exercises.forEach(exercise => {
      let exerciseDuration = serviceExerciseGetDuration(exercise)
      console.log('servicePrescriptionGetDuration exerciseDuration', exerciseDuration)
      console.log('servicePrescriptionGetDuration prescrptionDuration', prescrptionDuration)
      prescrptionDuration = prescrptionDuration + exerciseDuration
    })
  } 
  console.log('servicePrescriptionGetDuration prescrptionDuration FINAL', prescrptionDuration)
  return toTimeString(prescrptionDuration)
}