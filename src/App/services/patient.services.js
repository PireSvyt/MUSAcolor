// Inputs
import {
  patientCreateInputs,
  patientSaveInputs,
  patientDeleteInputs,
  patientGetInputs,
} from './patient.services.inputs.js'
// Services
import serviceProceed from './serviceProceed.js'

export async function servicePatientCreate() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePatientCreate')
  }
  await serviceProceed(patientCreateInputs)
}
export async function servicePatientSave() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePatientSave')
  }
  await serviceProceed(patientSaveInputs)
}

export async function servicePatientDelete(patientid) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePatientDelete')
  }
  let directInputs = {
    patientid: patientid,
  }
  await serviceProceed(patientDeleteInputs, directInputs)
}

export async function servicePatientGet(patientid) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('servicePatientGet')
  }
  let directInputs = {
    patientid: patientid,
  }
  await serviceProceed(patientGetInputs, directInputs)
}
