import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { AES } from 'crypto-js'
// Inputs
import {
  //authSignupInputs,
  authSigninInputs,
  //authSendActivationInputs,
  authSendPasswordInputs,
  authPasswordResetInputs,
} from './auth.service.inputs.js'
// APIs
import { apiAuthAssess } from './auth.api.js'
// Services
import { random_id } from './toolkit.js'
import { serviceUserGetDetails } from './user.services.js'
import serviceProceed from './serviceProceed.js'
// Reducers
import appStore from '../store.js'

/*
export async function serviceAuthSignUp() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthSignUp");
  }
  await serviceProceed(authSignupInputs);
}
*/
/*
export async function serviceAuthActivate(activationInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthActivate");
  }

  try {
    let stateChanges = {};
    let errors = [];

    // API call
    let data = await apiAuthActivate(activationInputs);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "auth.activate.success.activated":
      case "auth.activate.success.alreadyctivated":
        stateChanges.activationStatus = "activated";
        break;
      case "auth.activate.error.notfound":
      case "auth.activate.error.onsave":
      default:
        stateChanges.activationStatus = "error";
    }

    // Response
    return {
      stateChanges: stateChanges,
      errors: errors,
    };
  } catch (err) {
    console.error("serviceActivate", err);
    // Snack
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
    return {
      stateChanges: {
        activationStatus: "error",
      },
      errors: err,
    };
  }
}
*/
/*
export async function serviceAuthSendActivation() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthSendActivation");
  }
  await serviceProceed(authSendActivationInputs);
}
*/

export async function serviceAuthSignIn() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceAuthSignIn')
  }
  await serviceProceed(authSigninInputs)
}

export function serviceAuthAccessDeny() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceAuthAccessDeny')
  }
  let callbacks = []
  let errors = []
  let stateChanges = {}

  // State management
  appStore.dispatch({
    type: 'authSlice/signout',
  })

  // Remove cookies
  Cookies.remove('musacolor_token')

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  }
}

export async function serviceAuthGrantAccess(data) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceAuthGrantAccess')
  }
  let callbacks = []
  let errors = []
  let stateChanges = {}

  if (data.token === null || data.token === '') {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
      console.log('empty token')
    }
    errors.push('generic.error.emptytoken')
    serviceAuthAccessDeny()
  } else {
    //console.log("serviceAuthGrantAccess data",data)
    let decodedtoken = jwtDecode(data.token)
    // User status tollgate
    /*if (
      decodedtoken.usertype === "activated"
    ) {*/
    // Then update variables to signed in
    appStore.dispatch({
      type: 'authSlice/signin',
      payload: data.token,
    })
    serviceUserGetDetails()
    /*} else {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("invalid status");
      }
      errors.push("generic.error.invalidstatus");
      serviceAuthAccessDeny();
    }*/
  }

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  }
}

export async function serviceAuthAssessCookie() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceAuthAssessCookie')
  }

  try {
    // Load token from cookies
    let token = Cookies.get('musacolor_token')
    if (token === undefined) {
      if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceAuthAssessCookie no token from cookies')
      }
      serviceAuthAccessDeny()
    } else {
      // API call
      const data = await apiAuthAssess(token)

      // Response management
      switch (data.type) {
        case 'auth.assess.success.validtoken':
          // Sign in token
          serviceAuthGrantAccess({ token: token }).then((proceedOutcome) => {
            if (proceedOutcome.errors.length > 0) {
              if (process.env.REACT_APP_DEBUG === 'TRUE') {
                console.log('proceedOutcome errors')
                console.log(proceedOutcome.errors)
              }
            }
          })
          break
        default:
          serviceAuthAccessDeny()
          break
      }
    }
  } catch (error) {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
      console.log('service caught error')
      console.log(error)
    }
    serviceAuthAccessDeny()
  }
}

export async function serviceAuthSendPassword() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceAuthSendPassword')
  }
  await serviceProceed(authSendPasswordInputs)
}

export async function serviceAuthPasswordReset(directinputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceAuthPasswordReset')
  }
  await serviceProceed(authPasswordResetInputs, {...directinputs})
}
/*
export async function serviceAuthExistingPseudo() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAuthExistingPseudo");
  }
}
*/
