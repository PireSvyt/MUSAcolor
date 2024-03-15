import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    state: {},
    userid: '',
    type: '',
    patients: [],
    exercises: []
  },
  reducers: {
    change: (state, action) => {
      if (action.payload.userid !== undefined) {
        state.userid = action.payload.userid
      }
      if (action.payload.type !== undefined) {
        state.type = action.payload.type
      }
      if (action.payload.patients !== undefined) {
        state.patients = action.payload.patients
      }
      if (action.payload.exercises !== undefined) {
        state.exercises = action.payload.exercises
      }
      //
      if (action.payload.state !== undefined) {
        if (action.payload.state.details !== undefined) {
          state.state.details = action.payload.state.details
        }
        if (action.payload.state.patients !== undefined) {
          state.state.patients = action.payload.state.patients
        }
        if (action.payload.state.exercises !== undefined) {
          state.state.exercises = action.payload.state.exercises
        }
      }
    },
    set: (state, action) => {
      // Details
      if (action.payload.userid !== undefined && action.payload.type !== undefined) {
        state.userid = action.payload.userid
        state.type = action.payload.type
        state.state.details = 'available'
      }
      // Patients
      if (action.payload.patients === undefined) {
        state.patients = []
      } else {
        state.patients = sortPatients(action.payload.patients)
        state.state.patients = 'available'
      }
      // Exercises
      if (action.payload.exercises === undefined) {
        state.exercises = []
      } else {
        state.exercises = sortExercises(action.payload.exercises)
        state.state.exercises = 'available'
      }
    },
    unload: (state) => {
      state.state = {}
      state.userid = ''
      state.type = ''
      state.patients = []
      state.exercises = []
      delete state.state.details
    },
  },
})

export default userSlice.reducer

function sortPatients(patients) {
  let sortedPatients = patients.sort(comparePatients)
  return sortedPatients

  function comparePatients(a, b) {
    return ('' + a.name).localeCompare(b.name)
  }
}
function sortExercises(exercises) {
  let sortedExercises = exercises.sort(compareExercises)
  return sortedExercises

  function compareExercises(a, b) {
    return a.editionDate - b.editionDate
  }
}

