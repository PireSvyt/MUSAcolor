require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiAdminGetDatabaseLoad(token) {
  try {
    const res = await axios({
      method: 'get',
      url: apiURL + 'admin/v1/databaseload',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}