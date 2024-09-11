// APIs
import {
  apiExamCreate,
  apiExamDelete,
  apiExamGet,
  apiExamGetRemotely,
  apiExamSaveRemotely,
} from './exam.api.js'
// Services
import { random_id, random_string } from './toolkit.js'
import appStore from '../store.js'

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

    return { ...directInputs }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'generic.error.missinginputs',
      fieldsinerror: ['inputs'],
      subchecks: [
        {
          // Check type is available
          field: 'type',
          error: 'generic.error.missingtype',
          fieldsinerror: ['type'],
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
    if (serviceInputs.inputs.examid !== undefined) {
      repackagedInputs.inputs.examid = serviceInputs.inputs.examid
    } else {
      repackagedInputs.inputs.examid = random_string()
    }
    if (serviceInputs.inputs.patientid !== undefined) {
      repackagedInputs.inputs.patientid = serviceInputs.inputs.patientid
    } else {
      repackagedInputs.inputs.patientid =
        appStore.getState().examSlice.patientid
    }
    repackagedInputs.inputs.type = serviceInputs.inputs.type
    if (serviceInputs.inputs.results !== undefined) {
      repackagedInputs.inputs.results = serviceInputs.inputs.results
    }
    if (serviceInputs.inputs.token !== undefined) {
      repackagedInputs.inputs.token = serviceInputs.inputs.token
    }
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
        if (appStore.getState().examModalSlice.inputs.remote === false) {
          appStore.dispatch({
            type: 'examSlice/storedResults',
            payload: {
              examid: response.data.examid,
            },
          })
        }
      },
      'exam.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'examSlice/change',
          payload: {
            state: {
              storage: 'error',
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
      inputs: { ...directInputs },
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
        console.warn(
          'getmanageresponsefunction exam.getanalysis.error.undefined'
        )
        appStore.dispatch({
          type: 'examSlice/change',
          payload: {
            state: {
              analysis: 'denied',
            },
          },
        })
      },
      'exam.getanalysis.error.onfind': () => {
        console.warn('getmanageresponsefunction exam.getanalysis.error.onfind')
        appStore.dispatch({
          type: 'examSlice/setAnalysis',
          payload: {
            type: 'examSlice/change',
            payload: {
              state: {
                analysis: 'denied',
              },
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
    //console.log('WHAT IS THE response.type : ' + response.type)
    return responses[response.type]()
  },
}

export const examGetRemotelyInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examGetRemotelyInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'examSlice/getRemotely',
      payload: 'loading',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examGetRemotelyInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'examSlice/getRemotely',
      payload: 'loaded',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'examGetRemotelyInputs.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: { ...directInputs },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'exam.error.missinginputs',
      subchecks: [
        {
          // Check token is available
          field: 'token',
          error: 'patient.error.missingtoken',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'examGetRemotelyInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiExamGetRemotely(inputs)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'examGetRemotelyInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exam.getremotely.success': () => {
        appStore.dispatch({
          type: 'examSlice/setRemotely',
          payload: {
            exam: response.data.exam,
          },
        })
      },
      'exam.getremotely.alreadyperformed': () => {
        console.warn(
          'getmanageresponsefunction exam.getanalysis.alreadyperformed'
        )
        appStore.dispatch({
          type: 'examSlice/getRemotely',
          payload: 'alreadyperformed',
        })
      },
      'exam.getremotely.error.denied': () => {
        console.warn('getmanageresponsefunction exam.getanalysis.error.denied')
        appStore.dispatch({
          type: 'examSlice/getRemotely',
          payload: 'denied',
        })
      },
      'exam.getremotely.error.onfind': () => {
        console.warn('getmanageresponsefunction exam.getanalysis.error.onfind')
        appStore.dispatch({
          type: 'examSlice/getRemotely',
          payload: 'denied',
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
    //console.log('WHAT IS THE response.type : ' + response.type)
    return responses[response.type]()
  },
}

export const examSaveRemotelyInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examSaveRemotelyInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'examSlice/storingResults',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'examSaveRemotelyInputs.getinputsfunction',
      tags: ['function'],
    })
    return { ...directInputs }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'exam.error.missinginputs',
      subchecks: [
        {
          // Check examid is available
          field: 'examid',
          error: 'patient.error.missingexamid',
          fieldsinerror: ['examid'],
        },
        {
          // Check token is available
          field: 'token',
          error: 'patient.error.missingtoken',
          fieldsinerror: ['token'],
        },
        {
          // Check results is available
          field: 'results',
          error: 'patient.error.missingresults',
          fieldsinerror: ['results'],
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'examSaveRemotelyInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiExamSaveRemotely(inputs)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'examSaveRemotelyInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exam.saveremotely.success.modified': () => {
        appStore.dispatch({
          type: 'examSlice/saveRemotely',
          payload: 'success',
        })
      },
      'exam.saveremotely.alreadyperformed': () => {
        console.warn(
          'getmanageresponsefunction exam.saveremotely.alreadyperformed'
        )
        appStore.dispatch({
          type: 'examSlice/saveRemotely',
          payload: 'alreadyperformed',
        })
      },
      'exam.saveremotely.error.inputs': () => {
        console.warn('getmanageresponsefunction exam.saveremotely.error.inputs')
        appStore.dispatch({
          type: 'examSlice/saveRemotely',
          payload: 'error',
        })
      },
      'exam.saveremotely.error.onfind': () => {
        console.warn('getmanageresponsefunction exam.saveremotely.error.onfind')
        appStore.dispatch({
          type: 'examSlice/saveRemotely',
          payload: 'error',
        })
      },
    }
    //console.log('WHAT IS THE response.type : ' + response.type)
    return responses[response.type]()
  },
}
