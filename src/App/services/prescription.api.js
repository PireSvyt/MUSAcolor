require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiPrescriptionCreate(prescriptionCreateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'prescription/v1/create',
      data: prescriptionCreateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiPrescriptionDelete(deleteInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'prescription/v1/delete',
      data: deleteInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiPrescriptionGet(getInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'prescription/v1/getanalysis',
      data: getInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}
