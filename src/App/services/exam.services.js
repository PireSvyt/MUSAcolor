// Inputs
import {
  examCreateInputs,
  examDeleteInputs,
  examGetInputs,
} from './exam.services.inputs.js'
// Services
import serviceProceed from './serviceProceed.js'

export async function serviceExamCreate() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExamCreate')
  }
  await serviceProceed(examCreateInputs)
}

export async function serviceExamDelete(inputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceExamDelete')
  }
  let directInputs = {
    examid: inputs.examid,
    patientid: inputs.patientid,
  }
  await serviceProceed(examDeleteInputs, directInputs)
}
