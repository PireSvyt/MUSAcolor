// Inputs
import {
  examCreateInputs,
  examDeleteInputs,
  examGetInputs,
  examGetRemotelyInputs,
  examSaveRemotelyInputs,
} from './exam.services.inputs.js'
// Services
import serviceProceed from './serviceProceed.js'

export async function serviceExamCreate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExamCreate')
  }
  await serviceProceed(examCreateInputs, directInputs)
}

export async function serviceExamDelete(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExamDelete')
  }
  let inputs = {
    examid: directInputs.examid,
    patientid: directInputs.patientid,
  }
  await serviceProceed(examDeleteInputs, inputs)
}

export async function serviceExamGet(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExamGet')
  }
  await serviceProceed(examGetInputs, directInputs)
}

export async function serviceExamGetRemotely(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExamGetRemotely')
  }
  await serviceProceed(examGetRemotelyInputs, directInputs)
}

export async function serviceExamSaveRemotely(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExamSaveRemotely')
  }
  await serviceProceed(examSaveRemotelyInputs, directInputs)
}
