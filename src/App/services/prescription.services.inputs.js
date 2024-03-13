// APIs
import { apiPrescriptionCreate, apiPrescriptionDelete, apiPrescriptionGet } from './prescription.api.js'
// Services
import { random_id, random_string } from './toolkit.js'
import appStore from '../store.js'

export const prescriptionCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionCreateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'prescriptionModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'prescriptionModalSlice/unlock',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'prescriptionCreateInputs.getinputsfunction',
      tags: ['function'],
    })
    //console.log("directInputs", directInputs)
    let inputs = {...appStore.getState().prescriptionModalSlice.inputs}
    Object.keys(directInputs).forEach(k => {
      //console.log("directInput", k, directInputs[k])
      inputs[k] = directInputs[k]
    })
    //console.log("getinputsfunction", inputs)
    return {inputs: inputs}
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
          // Check results is available
          field: 'exercises',
          error: 'generic.error.missingexercises',
          fieldsinerror: ['exercises'],
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'prescriptionModalSlice/change'
  },
  repackagingfunction: (serviceInputs, log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionCreateInputs.repackagingfunction',
      tags: ['function'],
    })

    let repackagedInputs = {}
    repackagedInputs.inputs = {}
    repackagedInputs.inputs.prescriptionid = random_string()
    repackagedInputs.inputs.patientid = appStore.getState().patientSlice.patientid
    repackagedInputs.inputs.exercises = serviceInputs.inputs.exercises
    console.log('repackagedInputs', repackagedInputs)
    return repackagedInputs
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'prescriptionCreateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiPrescriptionCreate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionCreateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'prescription.create.success': () => {
        appStore.dispatch({
          type: 'prescriptionModalSlice/close',
        })
      },
      'prescription.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'prescriptionModalSlice/change',
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
    //console.log("prescriptionCreateInputs response", response)
    return responses[response.type]()
  },
}

export const prescriptionDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'servicePrescriptionDelete.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {
        prescriptionid: directInputs.prescriptionid,
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
          // Check prescriptionid is available
          field: 'prescriptionid',
          error: 'prescription.error.missingprescriptionid',
        },
        {
          // Check patientid is available
          field: 'patientid',
          error: 'prescription.error.missingpatientid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'servicePrescriptionDelete.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiPrescriptionDelete(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'servicePrescriptionDelete.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'prescription.deletemine.success': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'prescription.snack.deleted',
          },
        })
      },
      'prescription.deletemine.errorondelete': () => {
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

export const prescriptionGetInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionGetInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'prescriptionSlice/loading',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionGetInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'prescriptionSlice/loaded',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'servicePrescriptionGet.getinputsfunction',
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
      error: 'prescription.error.missinginputs',
      subchecks: [
        {
          // Check patientid is available
          field: 'prescriptionid',
          error: 'patient.error.missingprescriptionid',
        }
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'servicePrescriptionGet.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiPrescriptionGet(inputs)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'servicePrescriptionGet.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'prescription.get.success': () => {
        appStore.dispatch({
          type: 'prescriptionSlice/setPrescription',
          payload: response.data.prescription,
        })
      },
      'prescription.get.error.undefined': () => {
        console.warn("getmanageresponsefunction prescription.get.error.undefined")
        appStore.dispatch({
          type: 'prescriptionSlice/change',
          payload: {
            state: {
              analysis: 'denied'
            }
          },
        })
      },
      'prescription.get.error.onfind': () => {
        console.warn("getmanageresponsefunction prescription.get.error.onfind")
        appStore.dispatch({
          type: 'prescriptionSlice/setAnalysis',
          payload: {
            type: 'prescriptionSlice/change',
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
    //console.log("WHAT IS THE response.type : " + response.type)
    return responses[response.type]()
  },
}

