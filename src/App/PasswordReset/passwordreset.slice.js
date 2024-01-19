import { createSlice } from '@reduxjs/toolkit'

const passwordResetSlice = createSlice({
  name: 'passwordResetSlice',
  initialState: {
    state: {},
    inputs: {
      password: '',
      passwordrepeat: ''
    },
    errors: {
      password: false,
      passwordrepeat: false
    },
    disabled: false
  },
  reducers: {
    lock: (state) => {
      state.disabled = true
    },
    unlock: (state) => {
      state.disabled = false
    },
    resetingpassword: (state) => {
      state.state.passwordreset = 'loading'
      state.disabled = true
    },
    resetedpassword: (state) => {
      state.state.passwordreset = 'available'
      state.disabled = false
    },
    change: (state, action) => {
      if (action.payload.disabled !== undefined) {
        state.disabled = action.payload.disabled
      }
      // State
      if (action.payload.state !== undefined) {
        if (action.payload.state.passwordreset !== undefined) {
          state.state.passwordreset = action.payload.state.passwordreset
        }
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.password !== undefined) {
          state.inputs.password = action.payload.inputs.password
        }
        if (action.payload.inputs.passwordrepeat !== undefined) {
          state.inputs.passwordrepeat = action.payload.inputs.passwordrepeat
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.password !== undefined) {
          state.errors.password = action.payload.errors.password
        }
        if (action.payload.errors.passwordrepeat !== undefined) {
          state.errors.passwordrepeat = action.payload.errors.passwordrepeat
        }
        if (action.payload.errors.url !== undefined) {
          state.errors.url = action.payload.errors.url
        }
      }
    }
  },
})

export default passwordResetSlice.reducer
