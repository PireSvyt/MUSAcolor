import { createSlice } from '@reduxjs/toolkit'

const examModalSlice = createSlice({
  name: 'examModalSlice',
  initialState: {
    disabled: false,
    loading: false,
    open: false,
    inputs: {
      type: '',
      date: Date.now(),
      results: {},
      remote: false,
    },
    errors: {
      name: false,
      date: false,
      results: false,
      remote: false,
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
      state.inputs.type = ''
      state.errors.type = false
      state.disabled = false
      state.loading = false
    },
    close: (state) => {
      state.open = false
      state.inputs.type = ''
      state.errors.type = false
      state.inputs.remote = false
      state.errors.remote = false
      state.disabled = false
      state.loading = false
    },
    change: (state, action) => {
      //console.log("examModalSlice/change", action.payload)
      if (action.payload.open !== undefined) {
        state.open = action.payload.open
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.type !== undefined) {
          state.inputs.type = action.payload.inputs.type
        }
        if (action.payload.inputs.date !== undefined) {
          state.inputs.date = action.payload.inputs.date
        }
        if (action.payload.inputs.results !== undefined) {
          state.inputs.results = action.payload.inputs.results
        }
        if (action.payload.inputs.remote !== undefined) {
          state.inputs.remote = action.payload.inputs.remote
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.type !== undefined) {
          state.errors.type = action.payload.errors.type
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

export default examModalSlice.reducer
