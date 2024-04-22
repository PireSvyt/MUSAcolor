import { createSlice } from '@reduxjs/toolkit'

const patientModalSlice = createSlice({
  name: 'patientModalSlice',
  initialState: {
    disabled: false,
    loading: false,
    open: false,
    patientid: null,
    inputs: {
      name: '',
      databaseURL: '',
    },
    errors: {
      name: false,
      databaseURL: false,
    },
  },
  reducers: {
    lock: (state) => {
      // Locking the modal
      state.disabled = true
      state.loading = true
    },
    unlock: (state) => {
      // Unlocking the modal
      state.disabled = false
      state.loading = false
    },
    new: (state) => {
      state.open = true
      state.patientid = null
      state.inputs.name = ''
      state.errors.name = false
      state.inputs.databaseURL = ''
      state.errors.databaseURL = false
      state.disabled = false
      state.loading = false
    },
    load: (state, action) => {
      console.log("patientModalSlice/load", action.payload)
      state.open = true
      state.patientid = action.payload.patient.patientid
      state.inputs.name = action.payload.patient.name
      state.errors.name = false
      state.inputs.databaseURL = action.payload.patient.databaseURL
      state.errors.databaseURL = false
      state.disabled = false
      state.loading = false
    },
    close: (state) => {
      state.open = false
      state.patientid = null
      state.inputs.name = ''
      state.errors.name = false
      state.inputs.databaseURL = ''
      state.errors.databaseURL = false
      state.disabled = false
      state.loading = false
    },
    change: (state, action) => {
      //console.log("patientModalSlice/change", action.payload)
      if (action.payload.open !== undefined) {
        state.open = action.payload.open
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.name !== undefined) {
          state.inputs.name = action.payload.inputs.name
        }
        if (action.payload.inputs.databaseURL !== undefined) {
          state.inputs.databaseURL = action.payload.inputs.databaseURL
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.name !== undefined) {
          state.errors.name = action.payload.errors.name
        }
        if (action.payload.errors.databaseURL !== undefined) {
          state.errors.databaseURL = action.payload.errors.databaseURL
        }
      }
      // Lock
      if (action.payload.disabled !== undefined) {
        state.disabled = action.payload.disabled
      }
      if (action.payload.loading !== undefined) {
        state.loading = action.payload.loading
      }
    },
  },
})

export default patientModalSlice.reducer
