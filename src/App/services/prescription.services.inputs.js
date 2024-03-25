// APIs
import { 
  apiPrescriptionCreate, 
  apiPrescriptionSave, 
  apiPrescriptionDelete, 
  apiPrescriptionGet 
} from './prescription.api.js'
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
    console.log("getinputsfunction", inputs)
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
export const prescriptionSaveInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionSaveInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'prescriptionModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionSaveInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'prescriptionModalSlice/unlock',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'prescriptionSaveInputs.getinputsfunction',
      tags: ['function'],
    })
    //console.log("directInputs", directInputs)
    let inputs = {...appStore.getState().prescriptionModalSlice.inputs}
    Object.keys(directInputs).forEach(k => {
      //console.log("directInput", k, directInputs[k])
      inputs[k] = directInputs[k]
    })
    console.log("getinputsfunction", inputs)
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
          // Check exercises is available
          field: 'exercises',
          error: 'generic.error.missingexercises',
          fieldsinerror: ['exercises'],
          subchecks: [
            {
              // Check exerciseid for userDefined
              error: 'generic.error.invalidexercise',
              fieldsinerror: ['exercises'],
              checkfunction: (serviceInputs) => {
                console.log(
                  'sercivechecks.checkfunction serviceInputs',
                  serviceInputs
                )
                let onlySupportedTypes = true
                let errors = []
                let i = -1
                let erroneousExercises = []
                serviceInputs.inputs.exercises.forEach(exercise => {
                  i += 1
                  let fieldsinerror = []
                  let exerciseIsValid = true
                  if (exercise.exerciseid === 'userDefined') {
                    if (exercise.data === undefined) {
                      exerciseIsValid = false
                      errors.push('generic.error.missingdata')
                    } else {
                      if (exercise.data.name === undefined
                        || exercise.data.name === null 
                        || exercise.data.name ===  '') {
                        exerciseIsValid = false
                        errors.push('generic.error.missingname')
                        fieldsinerror.push('name')
                      }
                      if (exercise.data.tag === undefined
                        || exercise.data.tag === null 
                        || exercise.data.tag ===  '') {
                        exerciseIsValid = false
                        errors.push('generic.error.missingtag')
                        fieldsinerror.push('tag')
                      }
                      if (exercise.data.instructions === undefined
                        || exercise.data.instructions === null 
                        || exercise.data.instructions ===  '') {
                        exerciseIsValid = false
                        errors.push('generic.error.missinginstructions')
                        fieldsinerror.push('instructions')
                      }
                      if (exercise.data.duration === undefined
                        || exercise.data.duration === null 
                        || exercise.data.duration ===  0) {
                        exerciseIsValid = false
                        errors.push('generic.error.missingduration')
                        fieldsinerror.push('duration')
                      }
                    }
                    if (!exerciseIsValid) {
                      onlySupportedTypes = false
                      let exerciseErrors = {}
                      fieldsinerror.forEach(f => { exerciseErrors[f] = true })
                      erroneousExercises.push({
                        index: i,
                        errors: exerciseErrors
                      })
                    }
                  }
                })
                console.log("onlySupportedTypes", onlySupportedTypes)
                console.log("erroneousExercises", erroneousExercises)
                if (!onlySupportedTypes) {
                  return {
                    stateChanges: {
                      exercises : erroneousExercises
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
      message: 'prescriptionSaveInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'prescriptionModalSlice/change'
  },
  repackagingfunction: (serviceInputs, log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionSaveInputs.repackagingfunction',
      tags: ['function'],
    })

    let repackagedInputs = {}
    repackagedInputs.inputs = {}

    repackagedInputs.inputs.patientid = appStore.getState().patientSlice.patientid
    repackagedInputs.inputs.exercises = serviceInputs.inputs.exercises
    
    let prescriptionid = appStore.getState().prescriptionModalSlice.prescriptionid
    if (prescriptionid !== undefined && prescriptionid !== null && prescriptionid !== '') {
      repackagedInputs.inputs.prescriptionid = prescriptionid
    } else {
      repackagedInputs.inputs.prescriptionid = random_string()
    }

    console.log('repackagedInputs', repackagedInputs)
    return repackagedInputs
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'prescriptionSaveInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      
      let prescriptionid = appStore.getState().prescriptionModalSlice.prescriptionid
      if (prescriptionid === undefined 
        || prescriptionid === null 
        || prescriptionid === '' ) {
        return await apiPrescriptionCreate(inputs, appStore.getState().authSlice.token)
      } else {
        return await apiPrescriptionSave(inputs, appStore.getState().authSlice.token)
      }

    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'prescriptionSaveInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'prescription.create.success': () => {
        appStore.dispatch({
          type: 'prescriptionModalSlice/close',
        })
      },
      'prescription.save.success.modified': () => {
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
      'prescription.save.error.prescriptionid': () => {
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
      'prescription.save.error.onsave': () => {
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
    //console.log("prescriptionSaveInputs response", response)
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

