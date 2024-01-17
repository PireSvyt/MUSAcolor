// APIs
import { apiExamCreate, apiExamDelete, apiExamGet } from './exam.api.js'
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
      type: 'examModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'examModalSlice/unlock',
    })
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.getinputsfunction',
      tags: ['function'],
    })
    let inputs = {
      inputs: appStore.getState().examModalSlice.inputs,
    }
    return inputs
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
            // Check date is available
            field: 'date',
            error: 'generic.error.missingdate',
            fieldsinerror: ['date'],
        },        
        {
            // Check results is available
            field: 'results',
            error: 'generic.error.missingresults',
            fieldsinerror: ['results'],
        }
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'examCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'examModalSlice/change'
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
    repackagedInputs.inputs.patientid = appStore.getState().patientSlice.patientid
    repackagedInputs.inputs.type = serviceInputs.inputs.type
    repackagedInputs.inputs.date = serviceInputs.inputs.date
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
          type: 'examModalSlice/close',
        })
        window.location = '/exam/' + response.data.examid
      },
      'exam.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'examModalSlice/unlock',
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
