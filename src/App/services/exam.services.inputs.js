// APIs
import { apiExamCreate, apiExamDelete, apiExamGet } from './exam.api.js'
// Services
import { random_id, random_string } from './toolkit.js'
import appStore from '../store.js'
import { serviceExamGet } from './exam.services.js'

export const examCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'examSlice/storingResults',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'examSlice/storedResults',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.getinputsfunction',
      tags: ['function'],
    })
    return {...directInputs}
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'generic.error.missinginputs',
      subchecks: [
        {
          // Check type is available
          field: 'type',
          error: 'generic.error.missingtype',
          fieldsinerror: ['type'],
          subchecks: [
            {
              // Check type is valid
              error: 'generic.error.invalidtype',
              fieldsinerror: ['type'],
              checkfunction: (serviceInputs) => {
                console.log(
                  'sercivechecks.checkfunction serviceInputs',
                  serviceInputs
                )
                if (serviceInputs.inputs.type === '') {
                  return {
                    errors: ['generic.error.invalidtype'],
                    stateChanges: {
                      errors: {
                        type: true,
                      },
                    },
                    proceed: false,
                  }
                } else {
                  return { proceed: true }
                }
              },
            },
          ],
        },
        {
          // Check results is available
          field: 'results',
          error: 'generic.error.missingresults',
          fieldsinerror: ['results'],
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'examSlice/change'
  },
  repackagingfunction: (serviceInputs, log) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.repackagingfunction',
      tags: ['function'],
    })

    let repackagedInputs = {}
    repackagedInputs.inputs = {}
    repackagedInputs.inputs.examid = random_string()
    repackagedInputs.inputs.patientid = appStore.getState().examSlice.patientid
    repackagedInputs.inputs.type = serviceInputs.inputs.type
    repackagedInputs.inputs.results = serviceInputs.inputs.results
    console.log('repackagedInputs', repackagedInputs)
    return repackagedInputs
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'examCreateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiExamCreate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exam.create.success': () => {
        appStore.dispatch({
          type: 'examSlice/storedResults',
          payload: {
            examid: response.data.examid
          }
        })
      },
      'exam.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'examSlice/change',
          payload: {
            state: {
              storage: 'error'
            }
          }
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
    //console.log("examCreateInputs response", response)
    return responses[response.type]()
  },
}

export const examDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceExamDelete.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {
        examid: directInputs.examid,
        patientid: appStore.getState().patientSlice.patientid,
      },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'game.error.missinginputs',
      subchecks: [
        {
          // Check examid is available
          field: 'examid',
          error: 'exam.error.missingexamid',
        },
        {
          // Check patientid is available
          field: 'patientid',
          error: 'exam.error.missingpatientid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExamDelete.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiExamDelete(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExamDelete.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exam.deletemine.success': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'exam.snack.deleted',
          },
        })
      },
      'exam.deletemine.errorondelete': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    return responses[response.type]()
  },
}

export const examGetInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examGetInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'examSlice/loadAnalysis',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceExamGet.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {...directInputs},
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'exam.error.missinginputs',
      subchecks: [
        {
          // Check patientid is available
          field: 'examid',
          error: 'patient.error.missingexamid',
        },
        {
          // Check patientid is available
          field: 'patientid',
          error: 'patient.error.missingpatientid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExamGet.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiExamGet(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExamGet.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exam.getanalysis.success': () => {
        appStore.dispatch({
          type: 'examSlice/setAnalysis',
          payload: response.data.exam,
        })
      },
      'exam.getanalysis.error.undefined': () => {
        console.warn("getmanageresponsefunction exam.getanalysis.error.undefined")
        appStore.dispatch({
          type: 'examSlice/change',
          payload: {
            state: {
              analysis: 'denied'
            }
          },
        })
      },
      'exam.getanalysis.error.onfind': () => {
        console.warn("getmanageresponsefunction exam.getanalysis.error.onfind")
        appStore.dispatch({
          type: 'examSlice/setAnalysis',
          payload: {
            type: 'examSlice/change',
            payload: {
              state: {
                analysis: 'denied'
              }
            },
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
    console.log("WHAT IS THE response.type : " + response.type)
    return responses[response.type]()
  },
}

