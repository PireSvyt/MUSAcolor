require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiUserChangePassword(changePasswordInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'user/v1/changepassword',
      data: changePasswordInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

// TESTED
export async function apiUserGetDetails(token) {
  try {
    const res = await axios({
      method: 'get',
      url: apiURL + 'user/v1',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    //console.log("res",res)
    return res.data
  } catch (err) {
    console.log('err', err)
    return err.response.data
  }
}
