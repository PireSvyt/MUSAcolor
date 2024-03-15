require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiExerciseCreate(exerciseCreateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exercise/v1/create',
      data: exerciseCreateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}
export async function apiExerciseSave(exerciseSaveInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exercise/v1/save',
      data: exerciseSaveInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiExerciseDelete(deleteInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exercise/v1/delete',
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

export async function apiExerciseGet(getInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exercise/v1/get',
      data: {
        exerciseid: getInputs.exerciseid
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiExerciseGetMine(getMineInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'exercise/v1/getmine',
      data: getMineInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}