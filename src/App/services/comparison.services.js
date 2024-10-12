// Inputs
import {
    comparisonGetExamListInputs,
  } from './comparison.services.inputs.js'
  // Services
  import serviceProceed from './serviceProceed.js'
  
  export async function serviceComparisonGetExamList(directInputs) {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
      console.log('serviceComparisonGetExamList')
    }
    await serviceProceed(comparisonGetExamListInputs, directInputs)
  }