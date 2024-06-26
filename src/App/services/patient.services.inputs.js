// APIs
import {
  apiPatientCreate,
  apiPatientSave,
  apiPatientDelete,
  apiPatientGet,
} from './patient.api.js'
// Services
import { random_id, random_string } from './toolkit.js'
import appStore from '../store.js'

export const patientCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'patientCreateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'patientModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'patientCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'patientModalSlice/unlock',
    })
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'patientCreateInputs.getinputsfunction',
      tags: ['function'],
    })
    let inputs = {
      inputs: appStore.getState().patientModalSlice.inputs,
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
          // Check name is available
          field: 'name',
          error: 'generic.error.missingname',
          fieldsinerror: ['name'],
          subchecks: [
            {
              // Check name is valid
              error: 'generic.error.invalidname',
              fieldsinerror: ['name'],
              checkfunction: (serviceInputs) => {
                console.log(
                  'sercivechecks.checkfunction serviceInputs',
                  serviceInputs
                )
                if (serviceInputs.inputs.name === '') {
                  return {
                    errors: ['generic.error.invalidname'],
                    stateChanges: {
                      errors: {
                        name: true,
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
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'patientCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'patientModalSlice/change'
  },
  repackagingfunction: (serviceInputs, log) => {
    log.push({
      date: new Date(),
      message: 'patientCreateInputs.repackagingfunction',
      tags: ['function'],
    })

    let repackagedInputs = {}
    repackagedInputs.inputs = {}
    repackagedInputs.inputs.patientid = random_string()
    repackagedInputs.inputs.name = serviceInputs.inputs.name
    console.log('repackagedInputs', repackagedInputs)
    return repackagedInputs
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'patientCreateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiPatientCreate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'patientCreateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'patient.create.success': () => {
        appStore.dispatch({
          type: 'patientModalSlice/close',
        })
        window.location = '/patient/' + response.data.patientid
      },
      'patient.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'patientModalSlice/unlock',
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
    //console.log("patientCreateInputs response", response)
    return responses[response.type]()
  },
}
export const patientSaveInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'patientSaveInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'patientModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'patientSaveInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'patientModalSlice/unlock',
    })
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'patientSaveInputs.getinputsfunction',
      tags: ['function'],
    })
    let inputs = {
      inputs: appStore.getState().patientModalSlice.inputs,
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
          // Check name is available
          field: 'name',
          error: 'generic.error.missingname',
          fieldsinerror: ['name'],
          subchecks: [
            {
              // Check name is valid
              error: 'generic.error.invalidname',
              fieldsinerror: ['name'],
              checkfunction: (serviceInputs) => {
                console.log(
                  'sercivechecks.checkfunction serviceInputs',
                  serviceInputs
                )
                if (serviceInputs.inputs.name === '') {
                  return {
                    errors: ['generic.error.invalidname'],
                    stateChanges: {
                      errors: {
                        name: true,
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
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'patientSaveInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'patientModalSlice/change'
  },
  repackagingfunction: (serviceInputs, log) => {
    log.push({
      date: new Date(),
      message: 'patientSaveInputs.repackagingfunction',
      tags: ['function'],
    })

    let repackagedInputs = {}
    repackagedInputs.inputs = {}
    repackagedInputs.inputs.name = serviceInputs.inputs.name
    repackagedInputs.inputs.databaseURL = serviceInputs.inputs.databaseURL

    let patientid = appStore.getState().patientModalSlice.patientid
    if (patientid !== undefined && patientid !== null && patientid !== '') {
      repackagedInputs.inputs.patientid = patientid
    } else {
      repackagedInputs.inputs.patientid = random_string()
    }

    console.log('repackagedInputs', repackagedInputs)
    return repackagedInputs
  },
  apicall: async (inputs, log) => {
    //console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'patientCreateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      let patientid = appStore.getState().patientModalSlice.patientid
      if (patientid === undefined || patientid === null || patientid === '') {
        return await apiPatientCreate(
          inputs,
          appStore.getState().authSlice.token
        )
      } else {
        return await apiPatientSave(inputs, appStore.getState().authSlice.token)
      }
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'patientSaveInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'patient.create.success': () => {
        appStore.dispatch({
          type: 'patientModalSlice/close',
        })
        window.location = '/patient/' + response.data.patientid
      },
      'patient.save.success.modified': () => {
        appStore.dispatch({
          type: 'patientModalSlice/close',
        })
        //window.location = '/patient/' + response.data.patientid
      },
      'patient.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'patientModalSlice/unlock',
        })
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'ppatient.save.error.onmodify': () => {
        appStore.dispatch({
          type: 'patientModalSlice/unlock',
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
    //console.log("patientSaveInputs response", response)
    return responses[response.type]()
  },
}

export const patientDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'servicePatientDelete.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {
        patientid: directInputs.patientid,
      },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'patient.error.missinginputs',
      subchecks: [
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
      message: 'servicePatientDelete.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiPatientDelete(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'servicePatientDelete.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'patient.delete.success': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'patient.snack.deleted',
          },
        })
      },
      'patient.delete.errorondelete': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    return responses[response]()
  },
}

export const patientGetInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'servicePatientGet.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {
        patientid: directInputs.patientid,
      },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'patient.error.missinginputs',
      subchecks: [
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
      message: 'servicePatientGet.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiPatientGet(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'servicePatientGet.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'patient.getmine.success': () => {
        appStore.dispatch({
          type: 'patientSlice/set',
          payload: response.data.patient,
        })
        appStore.dispatch({
          type: 'userSlice/update',
          payload: {
            patient: response.data.patient,
          },
        })
      },
      'patient.getmine.error.onfinduser': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'patient.getmine.error.onaggregate': () => {
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
