import { createSlice } from '@reduxjs/toolkit'
let exercises = require('./exercises.json')

const prescriptionModalSlice = createSlice({
  name: 'prescriptionModalSlice',
  initialState: {
    disabled: false,
    loading: false,
    open: false,
    inputs: {
      exercises: [],
    },
    errors: {
      exercises: false,
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
      state.inputs.exercises = []
      state.errors.exercises = false
      state.disabled = false
      state.loading = false
    },
    close: (state) => {
      state.open = false
      state.inputs.exercises = []
      state.errors.exercises = false
      state.disabled = false
      state.loading = false
    },
    change: (state, action) => {
      //console.log("prescriptionModalSlice/change", action.payload)
      if (action.payload.open !== undefined) {
        state.open = action.payload.open
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.exercises !== undefined) {
          state.inputs.exercises = action.payload.inputs.exercises
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.exercises !== undefined) {
          state.errors.exercises = action.payload.errors.exercises
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
    addExercise: (state, action) => {
      //console.log("prescriptionModalSlice/addExercise", action.payload)
      let currentExercises = [...state.inputs.exercises]
      currentExercises.push(
        exercises[action.payload.exerciseid]
      )
      state.inputs.exercises = currentExercises
    }
  },
})

export default prescriptionModalSlice.reducer
