import { createSlice } from '@reduxjs/toolkit'

const exerciseModalSlice = createSlice({
  name: 'exerciseModalSlice',
  initialState: {
    disabled: false,
    loading: false,
    open: false,
    exerciseid: null,
    inputs: {
      name: null,
      type: null, // userDefined, videoYoutube
      duration: null,
      // for type === userDefined
      fixedDuration: false,
      // type === videoYoutube
      instructions: null,
      videoToken: null, // for 
    },
    errors: {
      name: false,
      type: false,
      duration: false,
      instructions: false,
      videoToken: false,      
      title: false,      
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
      state.inputs.name = null
      state.errors.name = false
      state.inputs.type = null
      state.errors.type = false
      state.inputs.duration = null
      state.errors.duration = false
      state.inputs.fixedDuration = false
      state.errors.fixedDuration = false
      state.inputs.instructions = null
      state.errors.instructions = false
      state.inputs.videoToken = null
      state.errors.videoToken = false
      state.inputs.title = null
      state.errors.title = false
      state.disabled = false
      state.loading = false
      state.exerciseid = null
    },
    load: (state, action) => {
      state.open = true
      state.inputs.name = action.payload.exercise.name
      state.errors.name = false
      state.inputs.type = action.payload.exercise.type
      state.errors.type = false
      state.inputs.duration = action.payload.exercise.duration
      state.errors.duration = false
      state.inputs.fixedDuration = action.payload.exercise.fixedDuration
      state.errors.fixedDuration = false
      state.inputs.instructions = action.payload.exercise.instructions
      state.errors.instructions = false
      state.inputs.videoToken = action.payload.exercise.videoToken
      state.errors.videoToken = false
      state.inputs.title = action.payload.exercise.title
      state.errors.title = false
      state.disabled = false
      state.loading = false
      state.exerciseid = action.payload.exercise.exerciseid
    },
    close: (state) => {
      state.open = false
      state.inputs.name = null
      state.errors.name = false
      state.inputs.type = null
      state.errors.type = false
      state.inputs.duration = null
      state.errors.duration = false
      state.inputs.instructions = null
      state.errors.instructions = false
      state.inputs.videoToken = null
      state.errors.videoToken = false
      state.disabled = false
      state.loading = false
    },
    change: (state, action) => {
      //console.log("exerciseModalSlice/change", action.payload)
      if (action.payload.open !== undefined) {
        state.open = action.payload.open
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.name !== undefined) {
          state.inputs.name = action.payload.inputs.name
        }
        if (action.payload.inputs.type !== undefined) {
          state.inputs.type = action.payload.inputs.type
        }
        if (action.payload.inputs.duration !== undefined) {
          state.inputs.duration = action.payload.inputs.duration
        }
        if (action.payload.inputs.fixedDuration !== undefined) {
          state.inputs.fixedDuration = action.payload.inputs.fixedDuration
        }
        if (action.payload.inputs.instructions !== undefined) {
          state.inputs.instructions = action.payload.inputs.instructions
        }
        if (action.payload.inputs.videoToken !== undefined) {
          state.inputs.videoToken = action.payload.inputs.videoToken
        }
        if (action.payload.inputs.title !== undefined) {
          state.inputs.title = action.payload.inputs.title
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.name !== undefined) {
          state.errors.name = action.payload.errors.name
        }
        if (action.payload.errors.type !== undefined) {
          state.errors.type = action.payload.errors.type
        }
        if (action.payload.errors.duration !== undefined) {
          state.errors.duration = action.payload.errors.duration
        }
        if (action.payload.errors.fixedDuration !== undefined) {
          state.errors.fixedDuration = action.payload.errors.fixedDuration
        }
        if (action.payload.errors.instructions !== undefined) {
          state.errors.instructions = action.payload.errors.instructions
        }
        if (action.payload.errors.videoToken !== undefined) {
          state.errors.videoToken = action.payload.errors.videoToken
        }
        if (action.payload.errors.title !== undefined) {
          state.errors.title = action.payload.errors.title
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

export default exerciseModalSlice.reducer
