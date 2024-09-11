require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiExamCreate(examCreateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exam/v1/create',
      data: examCreateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiExamDelete(deleteInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exam/v1/delete',
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

export async function apiExamGet(getInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exam/v1/getanalysis',
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

export async function apiExamGetRemotely(getInputs) {
  try {
    const res = await axios({
      method: 'get',
      url: apiURL + 'exam/v1/getremotely/' + getInputs.token,
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiExamSaveRemotely(saveInputs) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exam/v1/saveremotely',
      data: saveInputs,
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}
