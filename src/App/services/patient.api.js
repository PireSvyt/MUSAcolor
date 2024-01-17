require("dotenv");
import axios from "axios";

let apiURL = process.env.REACT_APP_SERVER_URL;

export async function apiPatientCreate(patientCreateInputs, token) {
  try {
    const res = await axios({
      method: "post",
      url: apiURL + "patient/v1/create",
      data: patientCreateInputs,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function apiPatientDelete(deleteInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + "patient/v1/delete",
      data: deleteInputs,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}