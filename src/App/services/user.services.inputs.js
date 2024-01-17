// APIs
import { apiUserGetDetails } from './user.api.js'
// Services
import { random_id } from './toolkit.js'
import appStore from '../store.js'

export const userGetDetailsInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'userGetStatsInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'userSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'userGetStatsInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'userSlice/unlock',
    })
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'userGetDetailsInputs.getinputsfunction',
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
      message: 'userGetDetailsInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'userSlice/change'
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'userGetDetailsInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiUserGetDetails(inputs.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'userGetDetailsInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'user.getme.success': () => {
        appStore.dispatch({
          type: 'userSlice/set',
          payload: response.data.user,
        })
      },
      'user.getme.error.notfound': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.withdetails',
            details: ['home.snack.userdetailsnotfound'],
          },
        })
      },
      'user.getme.error.onaggregate': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    //console.log("userGetDetailsInputs response", response)
    return responses[response.type]()
  },
}
