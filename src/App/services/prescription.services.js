// Inputs
import {
  prescriptionCreateInputs,
  prescriptionDeleteInputs,
  prescriptionGetInputs,
} from './prescription.services.inputs.js'
// Services
import serviceProceed from './serviceProceed.js'

export async function servicePrescriptionCreate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePrescriptionCreate')
  }
  await serviceProceed(prescriptionCreateInputs, directInputs)
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
