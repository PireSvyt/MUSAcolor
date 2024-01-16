// Services
import serviceProceedCheck from "./serviceProceedCheck.js";
import { random_id } from "./toolkit.js";
// Reducers
import appStore from "../store.js";

let debugProceed = true;

async function serviceProceed(
  serviceProceedInputs,
  directInputs = undefined,
  log = [],
) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    // Lock UI
    if (serviceProceedInputs.lockuifunction !== undefined) {
      serviceProceedInputs.lockuifunction(log);
    }

    // Inputs management
    let serviceInputs = undefined;
    if (serviceProceedInputs.getinputsfunction !== undefined) {
      if (directInputs === undefined) {
        serviceInputs = serviceProceedInputs.getinputsfunction(log);
      } else {
        serviceInputs = serviceProceedInputs.getinputsfunction(
          log,
          directInputs,
        );
      }
    }
    if (serviceProceedInputs.wrappingfunction !== undefined) {
      if (serviceProceedInputs.wrappingfunction !== undefined) {
        serviceInputs = serviceProceedInputs.wrappingfunction(
          serviceInputs,
          log,
        );
      }
    }
    if (debugProceed) {
      console.log("log");
      log.forEach((l) => {
        console.log(l);
      });
      console.log("serviceInputs");
      Object.keys(serviceInputs).forEach((k) => {
        console.log(k, serviceInputs[k]);
      });
    }

    // Inputs checks
    let proceedCheckOutcome = undefined;
    if (serviceProceedInputs.sercivechecks !== undefined) {
      proceedCheckOutcome = serviceProceedCheck(
        serviceInputs,
        serviceProceedInputs.sercivechecks,
      );
    }
    if (debugProceed) {
      console.log("proceedCheckOutcome");
      Object.keys(proceedCheckOutcome).forEach((k) => {
        console.log(k, proceedCheckOutcome[k]);
      });
    }

    if (serviceProceedInputs.getcheckoutcomedispatchfunction !== undefined) {
      if (debugProceed) {
        console.log("serviceInputs");
        Object.keys(serviceInputs).forEach((k) => {
          console.log(k, serviceInputs[k]);
        });
      }

      if (proceedCheckOutcome.stateChanges !== undefined) {
        appStore.dispatch({
          type: serviceProceedInputs.getcheckoutcomedispatchfunction(log),
          payload: proceedCheckOutcome.stateChanges,
        });
      }
    } else {
      proceedCheckOutcome = { proceed: true };
    }
    if (proceedCheckOutcome.proceed === true) {
      // Repackaging
      if (serviceProceedInputs.repackagingfunction !== undefined) {
        if (serviceProceedInputs.repackagingfunction !== undefined) {
          serviceInputs = await serviceProceedInputs.repackagingfunction(
            serviceInputs,
            log,
          );
        }
      }
      if (debugProceed) {
        console.log("serviceInputs");
        Object.keys(serviceInputs).forEach((k) => {
          console.log(k, serviceInputs[k]);
        });
      }

      // API call
      let proceedResponse = await serviceProceedInputs.apicall(
        serviceInputs.inputs,
        log,
      );
      if (debugProceed) {
        console.log("proceedResponse", proceedResponse);
        //Object.keys(proceedResponse).forEach(k => {
        //  console.log(k,proceedResponse[k])
        //})
      }

      // Response management
      if (serviceProceedInputs.getmanageresponsefunction !== undefined) {
        serviceProceedInputs.getmanageresponsefunction(proceedResponse, log);
      } else {
        if (serviceProceedInputs.unlockuifunction !== undefined) {
          serviceProceedInputs.unlockuifunction(log);
        }
        // Generic snack for unsupported api response type
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
          },
        });
      }
      return;
    } else {
      // When proceed outcome is false
      if (proceedCheckOutcome.errors.length > 0) {
        if (debugProceed) {
          console.log("proceedCheckOutcome.errors", proceedCheckOutcome.errors);
        }
        if (serviceProceedInputs.unlockuifunction !== undefined) {
          serviceProceedInputs.unlockuifunction(log);
        }
        // Generic snack with details
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        });
      }
      // Manage confirmation
      if (proceedCheckOutcome.confirmation !== undefined) {
        serviceProceedInputs.manageconfirmation(
          proceedCheckOutcome.confirmation,
          log,
        );
      }
      return;
    }
  } catch (err) {
    // Generic error log
    log.push({
      date: new Date(),
      message: "serviceProceed caught error",
      error: err,
      tags: ["error"],
    });
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    if (debugProceed) {
      console.log("service caught error");
      console.log(log);
    }
    // Post error command
    if (serviceProceedInputs.unlockuifunction !== undefined) {
      serviceProceedInputs.unlockuifunction(log);
    }
    // Generic error network snack
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
    return;
  }
}

export default serviceProceed;
