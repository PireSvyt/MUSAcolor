import { createSlice } from '@reduxjs/toolkit'

const prescriptionModalSlice = createSlice({
  name: 'prescriptionModalSlice',
  initialState: {
    disabled: false,
    loading: false,
    open: false,
    prescriptionid: null,
    inputs: {
      exercises: [],
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
      state.prescriptionid = null
      state.inputs.exercises = []
      state.disabled = false
      state.loading = false
    },
    load: (state, action) => {
      //console.log("prescriptionModalSlice.load", action.payload)
      state.open = true
      state.prescriptionid = action.payload.prescription.prescriptionid
      let exercises = [...action.payload.prescription.exercises]
      exercises = exercises.map((exercise) => {
        if (exercise.exerciseid === 'userDefined') {
          return {
            exerciseid: exercise.exerciseid,
            posology: exercise.posology,
            data: exercise.data,
            errors: {
              name: false,
              instructions: false,
              posology: false,
            },
          }
        } else {
          return {
            exerciseid: exercise.exerciseid,
            posology: exercise.posology,
            errors: {
              posology: false,
            },
          }
        }
      })
      state.inputs.exercises = exercises
      state.disabled = false
      state.loading = false
    },
    close: (state) => {
      state.open = false
      state.inputs.exercises = []
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
      /*if (action.payload.errors !== undefined) {
        if (action.payload.errors.exercises !== undefined) {
          state.errors.exercises = action.payload.errors.exercises
        }
      }*/
      // Exercise edit
      if (action.payload.index !== undefined) {
        if (action.payload.name !== undefined) {
          let changingExercise = {
            ...state.inputs.exercises[action.payload.index],
          }
          //console.log("changingExercise", changingExercise)
          if (changingExercise.data === undefined) {
            changingExercise.data = {}
          }
          changingExercise.data.name = action.payload.name
          if (changingExercise.errors === undefined) {
            changingExercise.errors = {}
          }
          changingExercise.errors.name = false
          let exercises = [...state.inputs.exercises]
          exercises[action.payload.index] = changingExercise
          //console.log("exercises", exercises)
          state.inputs.exercises = exercises
        }
        if (action.payload.instructions !== undefined) {
          let changingExercise = {
            ...state.inputs.exercises[action.payload.index],
          }
          //console.log("changingExercise", changingExercise)
          if (changingExercise.data === undefined) {
            changingExercise.data = {}
          }
          changingExercise.data.instructions = action.payload.instructions
          if (changingExercise.errors === undefined) {
            changingExercise.errors = {}
          }
          changingExercise.errors.instructions = false
          let exercises = [...state.inputs.exercises]
          exercises[action.payload.index] = changingExercise
          //console.log("exercises", exercises)
          state.inputs.exercises = exercises
        }
        if (action.payload.posology !== undefined) {
          let changingExercise = {
            ...state.inputs.exercises[action.payload.index],
          }
          //console.log("changingExercise", changingExercise)
          changingExercise.posology = action.payload.posology
          if (changingExercise.errors === undefined) {
            changingExercise.errors = {}
          }
          changingExercise.errors.posology = false
          let exercises = [...state.inputs.exercises]
          exercises[action.payload.index] = changingExercise
          //console.log("exercises", exercises)
          state.inputs.exercises = exercises
        }
      }
      if (action.payload.exercises !== undefined) {
        let exercises = [...state.inputs.exercises]
        action.payload.exercises.forEach((exercise) => {
          console.log('exercise', exercise)
          let changingExercise = { ...state.inputs.exercises[exercise.index] }
          console.log('changingExercise', changingExercise)

          if (exercise.errors.name !== undefined) {
            if (changingExercise.errors === undefined) {
              changingExercise.errors = {}
            }
            changingExercise.errors.name = exercise.errors.name
          }
          if (exercise.errors.instructions !== undefined) {
            if (changingExercise.errors === undefined) {
              changingExercise.errors = {}
            }
            changingExercise.errors.instructions = exercise.errors.instructions
          }
          if (exercise.errors.posology !== undefined) {
            if (changingExercise.errors === undefined) {
              changingExercise.errors = {}
            }
            changingExercise.errors.posology = exercise.errors.posology
          }

          exercises[exercise.index] = changingExercise
        })
        //console.log("exercises", exercises)
        state.inputs.exercises = exercises
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
        exerciseid: action.payload.exerciseid,
        posology: '',
        data: {
          name: '',
          instructions: '',
        },
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
            exercises.splice(action.payload.index - 1, 0, movingExercise)
            break
          case 'down':
            exercises.splice(action.payload.index + 1, 0, movingExercise)
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
    },
  },
})

export default prescriptionModalSlice.reducer
