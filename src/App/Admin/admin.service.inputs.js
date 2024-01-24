// APIs
import { apiAdminGetDatabaseLoad } from './admin.api.js'
// Services
import { random_id } from '../services/toolkit.js'
import appStore from '../store.js'

export const adminGetDatabaseLoadInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'adminGetDatabaseLoadInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'adminSlice/lock',
      action: 'stats'
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'adminGetDatabaseLoadInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'adminSlice/unlock',
      action: 'stats'
    })
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'adminGetDatabaseLoadInputs.getinputsfunction',
      tags: ['function'],
    })
    let inputs = {
      inputs: {
        token: appStore.getState().authSlice.token,
      },
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
          // Check token is available
          field: 'token',
          error: 'generic.error.missingtoken',
          fieldsinerror: ['token'],
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'adminGetDatabaseLoadInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'adminSlice/change'
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'adminGetDatabaseLoadInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiAdminGetDatabaseLoad(inputs.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'adminGetDatabaseLoadInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'admin.databaseload.success': () => {
        appStore.dispatch({
          type: 'adminSlice/set',
          payload: {
            stats: response.data
          },
        })
      },
      'admin.databaseload.error.deniedaccess': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'admin.databaseload.error.oncountusers': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'admin.databaseload.error.oncountpatients': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'admin.databaseload.error.oncountexams': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'admin.databaseload.error.oncountsettings': () => {
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
