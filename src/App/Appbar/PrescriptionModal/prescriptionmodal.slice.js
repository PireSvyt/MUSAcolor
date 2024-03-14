import { createSlice } from '@reduxjs/toolkit'

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
      if (action.payload.index !== undefined) {
        if (action.payload.posology !== undefined) {
          let changingExercise = {...state.inputs.exercises[action.payload.index]}
          //console.log("changingExercise", changingExercise)
          changingExercise.posology = action.payload.posology
          let exercises = [...state.inputs.exercises]
          exercises[action.payload.index] = changingExercise
          //console.log("exercises", exercises)
          state.inputs.exercises = exercises
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
      currentExercises.push({
        posology: '',
        exercise: action.payload.exercise
      })
      state.inputs.exercises = currentExercises
    },
    move: (state, action) => {
      //console.log("prescriptionModalSlice/move", action.payload)
      if (state.inputs.exercises.length > 1) {
        let movingExercise = state.inputs.exercises[action.payload.index]
        let exercises = [...state.inputs.exercises]
        exercises.splice(action.payload.index, 1)
        switch (action.payload.by) {
          case 'totop':
            exercises.unshift(movingExercise)
            break
          case 'up':
            exercises.splice(action.payload.index-1, 0, movingExercise)
            break
          case 'down':
            exercises.splice(action.payload.index+1, 0, movingExercise)
            break
          case 'tobottom':
            exercises.push(movingExercise)
            break
        }
        state.inputs.exercises = exercises
      }
    },
    delete: (state, action) => {
      //console.log("prescriptionModalSlice/delete", action.payload)
      let exercises = [...state.inputs.exercises]
      exercises.splice(action.payload.index, 1)
      state.inputs.exercises = exercises
    }
  },
})

export default prescriptionModalSlice.reducer
