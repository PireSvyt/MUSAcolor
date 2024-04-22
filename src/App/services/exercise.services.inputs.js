// APIs
import {
  apiExerciseCreate,
  apiExerciseSave,
  apiExerciseDelete,
  apiExerciseGet,
  apiExerciseGetMine,
} from './exercise.api.js'
// Services
import { random_id, random_string } from './toolkit.js'
import appStore from '../store.js'

export const exerciseSaveInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'exerciseSaveInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'exerciseModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'exerciseSaveInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'exerciseModalSlice/unlock',
    })
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'exerciseSaveInputs.getinputsfunction',
      tags: ['function'],
    })
    let inputs = {
      inputs: appStore.getState().exerciseModalSlice.inputs,
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
        },
        {
          // Check type is available
          field: 'type',
          error: 'generic.error.missingtype',
          fieldsinerror: ['type'],
          checkfunction: (serviceInputs) => {
            let supportedTypes = ['userDefined', 'videoYoutube']
            if (!supportedTypes.includes(serviceInputs.inputs.type)) {
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
              switch (serviceInputs.inputs.type) {
                case 'userDefined':
                  return { proceed: true }
                  break
                case 'videoYoutube':
                  if (serviceInputs.inputs.videoToken === undefined
                    || serviceInputs.inputs.videoToken === ''
                    || serviceInputs.inputs.videoToken === null) {
                    return {
                      errors: ['generic.error.missingvideoToken'],
                      stateChanges: {
                        errors: {
                          videoToken: true,
                        },
                      },
                      proceed: false,
                    }
                  }
                  return { proceed: true }
                  break
                default: 
                  return {
                    errors: ['generic.error.unmatchedtype'],
                    stateChanges: {
                      errors: {
                        type: true,
                      },
                    },
                    proceed: false,
                  }
              }
              
            }
          },
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'exerciseSaveInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'exerciseModalSlice/change'
  },
  repackagingfunction: (serviceInputs, log) => {
    log.push({
      date: new Date(),
      message: 'exerciseSaveInputs.repackagingfunction',
      tags: ['function'],
    })

    let repackagedInputs = {}
    repackagedInputs.inputs = {}
    repackagedInputs.inputs.data = {}

    let exerciseid = appStore.getState().exerciseModalSlice.exerciseid
    if (exerciseid === undefined 
      || exerciseid === null 
      || exerciseid === '' ) {
      repackagedInputs.inputs.exerciseid = random_string()
    } else {
      repackagedInputs.inputs.exerciseid = exerciseid
    }

    repackagedInputs.inputs.name = serviceInputs.inputs.name
    repackagedInputs.inputs.type = serviceInputs.inputs.type

    switch (serviceInputs.inputs.type) {
      case 'videoYoutube':
        repackagedInputs.inputs.data.videoToken = serviceInputs.inputs.videoToken
      break
    }
    if (serviceInputs.inputs.instructions !== undefined
      && serviceInputs.inputs.instructions !== ''
      && serviceInputs.inputs.instructions !== null) {
      repackagedInputs.inputs.data.instructions = serviceInputs.inputs.instructions
    }

    console.log('repackagedInputs', repackagedInputs)
    return repackagedInputs
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'exerciseSaveInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {

      let exerciseid = appStore.getState().exerciseModalSlice.exerciseid
      if (exerciseid === undefined 
        || exerciseid === null 
        || exerciseid === '' ) {
        return await apiExerciseCreate(inputs, appStore.getState().authSlice.token)
      } else {
        return await apiExerciseSave(inputs, appStore.getState().authSlice.token)
      }

    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'exerciseSaveInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exercise.create.success': () => {
        appStore.dispatch({
          type: 'exerciseModalSlice/close',
        })
      },
      'exercise.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'exerciseModalSlice/unlock',
        })
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'exercise.save.success.modified': () => {
        appStore.dispatch({
          type: 'exerciseModalSlice/close',
        })
      },
      'exercise.save.error.exerciseid': () => {
        appStore.dispatch({
          type: 'exerciseModalSlice/unlock',
        })
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'exercise.save.error.onmodify': () => {
        appStore.dispatch({
          type: 'exerciseModalSlice/unlock',
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
    //console.log("exerciseSaveInputs response", response)
    return responses[response.type]()
  },
}

export const exerciseDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseDelete.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {
        exerciseid: directInputs.exerciseid,
      },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'exercise.error.missinginputs',
      subchecks: [
        {
          // Check exerciseid is available
          field: 'exerciseid',
          error: 'exercise.error.missingexerciseid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseDelete.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiExerciseDelete(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseDelete.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exercise.delete.success': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'exercise.snack.deleted',
          },
        })
      },
      'exercise.delete.errorondelete': () => {
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

export const exerciseGetInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseGet.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {
        exerciseid: directInputs.exerciseid,
      },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'exercise.error.missinginputs',
      subchecks: [
        {
          // Check exerciseid is available
          field: 'exerciseid',
          error: 'exercise.error.missingexerciseid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseGet.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiExerciseGet(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseGet.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exercise.getmine.success': () => {
        appStore.dispatch({
          type: 'exerciseSlice/set',
          payload: response.data.exercise,
        })
      },
      'exercise.getmine.error.onfinduser': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'exercise.getmine.error.onaggregate': () => {
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

export const exerciseGetMineInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseGetMine.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'userSlice/change',
      payload: { state: { exercises: 'wip'} },
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseGetMine.getinputsfunction',
      tags: ['function'],
    })
    return directInputs
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseGetMine.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiExerciseGetMine(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceExerciseGetMine.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'exercise.getmine.success': () => {
        appStore.dispatch({
          type: 'userSlice/set',
          payload: { exerises: response.data.exercises },
        })
      },
      'exercise.getmine.error.onfinduser': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'exercise.getmine.error.onaggregate': () => {
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
