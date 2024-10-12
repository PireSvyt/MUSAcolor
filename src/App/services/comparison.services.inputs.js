// APIs
import {
    apiExamGetList,
  } from './exam.api.js'
  // Services
  import { random_id, random_string } from './toolkit.js'
  import appStore from '../store.js'
  
  export const comparisonGetExamListInputs = {
    lockuifunction: (log) => {
      log.push({
        date: new Date(),
        message: 'comparisonGetExamListInputs.lockuifunction',
        tags: ['function'],
      })
      appStore.dispatch({
        type: 'comparisonSlice/loadContent',
      })
    },
    unlockuifunction: (log) => {
      log.push({
        date: new Date(),
        message: 'comparisonGetExamListInputs.unlockuifunction',
        tags: ['function'],
      })
    },
    getinputsfunction: (log, directInputs) => {
      log.push({
        date: new Date(),
        message: 'comparisonGetExamListInputs.getinputsfunction',
        tags: ['function'],
      })
      //console.log("directInputs", directInputs)
      let inputs = directInputs
      return { inputs: inputs }
    },
    sercivechecks: [
      {
        // Check inputs root is available
        field: 'inputs',
        error: 'generic.error.missinginputs',
        subchecks: [
          {
            // Check patientid is available
            field: 'patientid',
            error: 'generic.error.missingpatientid',
            fieldsinerror: ['patientid'],
          },
          {
            // Check type is available
            field: 'type',
            error: 'generic.error.missingtype',
            fieldsinerror: ['type'],
          },
          {
            // Check examids is available
            field: 'examids',
            error: 'generic.error.missingexamids',
            fieldsinerror: ['examids'],
          },
        ],
      },
    ],
    getcheckoutcomedispatchfunction: (log) => {
      log.push({
        date: new Date(),
        message: 'comparisonGetExamListInputs.getcheckoutcomedispatchfunction',
        tags: ['function'],
      })
      return 'comparisonSlice/change'
    },
    apicall: async (inputs, log) => {
      console.log('apicall inputs', inputs)
      log.push({
        date: new Date(),
        message: 'comparisonGetExamListInputs.apicall',
        inputs: inputs,
        tags: ['function'],
      })
      try {
        return await apiExamGetList(
          inputs,
          appStore.getState().authSlice.token
        )
      } catch (err) {
        return err
      }
    },
    getmanageresponsefunction: (response, log) => {
      log.push({
        date: new Date(),
        message: 'comparisonGetExamListInputs.getmanageresponsefunction',
        response: response,
        tags: ['function'],
      })
      let responses = {
        'exam.getlist.success': () => {
          appStore.dispatch({
            type: 'comparisonSlice/setContent',
            payload: response.data.exams
          })
        },
        'exam.getlist.error': () => {
          appStore.dispatch({
            type: 'comparisonSlice/change',
            payload: {
              state: 'error',
            },
          })
          appStore.dispatch({
            type: 'sliceSnack/change',
            payload: {
              uid: random_id(),
              id: 'generic.snack.error.wip',
            },
          })
        },
      }
      //console.log("comparisonGetExamListInputs response", response)
      return responses[response.type]()
    },
  }