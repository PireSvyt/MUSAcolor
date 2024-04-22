import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    loaded: false,
    signedin: false,
    token: '',
    state: {},
    nextattempt: Date.now(),
  },
  reducers: {
    signingin: (state) => {
      state.state.signedin = 'loading'
    },
    signin: (state, action) => {
      state.signedin = true
      state.token = action.payload
      state.loaded = true
      state.state.signedin = 'confirmed'
    },
    signout: (state) => {
      state.signedin = false
      state.token = ''
      state.loaded = true
      delete state.state.signedin
    },
    change: (state, action) => {
      if (action.payload.state !== undefined) {
        if (action.payload.state.passwordreset !== undefined) {
          state.state.passwordreset = action.payload.state.passwordreset
        }
        if (action.payload.state.signedin !== undefined) {
          state.state.signedin = action.payload.state.signedin
        }
      }
    },
  },
})

export default authSlice.reducer
