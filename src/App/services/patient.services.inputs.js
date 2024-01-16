// APIs
import { apiPatientCreate } from "./patient.api.js";
// Services
import { random_id } from "./toolkit.js";
import appStore from "../store.js";

export const patientCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "patientCreateInputs.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({
      type: "patientModalSlice/lock",
    });
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "patientCreateInputs.getinputsfunction",
      tags: ["function"],
    });
    let inputs = {
      inputs: {
        inputs: appStore.getState().patientModalSlice.inputs,
      },
    };
    return inputs;
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "generic.error.missinginputs",
      subchecks: [
        {
          // Check key is available
          field: "key",
          error: "generic.error.missingkey",
          fieldsinerror: ["key"],
          checkfunction: (serviceInputs) => {
            if (serviceInputs.inputs.key === "") {
              return {
                errors: ["generic.error.invalidkey"],
                stateChanges: {
                  errors: {
                    key: true,
                  },
                },
                proceed: false,
              };
            } else {
              return { proceed: true };
            }
          },
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: "patientCreateInputs.getcheckoutcomedispatchfunction",
      tags: ["function"],
    });
    return "patientModalSlice/change";
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "patientCreateInputs.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiPatientCreate(
        inputs,
        appStore.getState().authSlice.token,
      );
    } catch (err) {
      return err;
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "patientCreateInputs.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "patient.create.success": () => {
        appStore.dispatch({
          type: "patientModalSlice/close",
        });
        window.location = "/patient/" + response.data.patientid;
      },
      "patient.create.error.notfound": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: ["home.snack.userdetailsnotfound"],
          },
        });
      },
      "patient.create.error.onaggregate": () => {
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
      },
    };
    //console.log("patientCreateInputs response", response)
    return responses[response.type]();
  },
};
