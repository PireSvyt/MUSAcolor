import { createSlice } from '@reduxjs/toolkit'

const exerciseSlice = createSlice({
  name: 'exerciseSlice',
  initialState: {
    state: {},
    exerciseid: '',
    name: '',
    exams: [],
    prescriptions: [],
  },
  reducers: {
    load: (state) => {
      state.state.details = 'loading'
    },
    unload: (state) => {
      delete state.state.details
    },
    set: (state, action) => {
      state.exerciseid = action.payload.exerciseid
      state.name = action.payload.name
      if (action.payload.exams === undefined) {
        state.exams = []
      } else {
        state.exams = sortExams(action.payload.exams)
      }
      if (action.payload.prescriptions === undefined) {
        state.prescriptions = []
      } else {
        state.prescriptions = sortPrescriptions(action.payload.prescriptions)
      }
      state.state.details = 'available'
    },
  },
})

export default exerciseSlice.reducer

function sortExams(exams) {
  let sortedExams = [...exams]
  sortedExams.sort(compareExams)
  return sortedExams

  function compareExams(a, b) {
    let aDate = new Date(a.date)
    let bDate = new Date(b.date)
    return bDate - aDate
  }
}

function sortPrescriptions(exams) {
  let sortedPrescriptions = [...exams]
  sortedPrescriptions.sort(comparePrescriptions)
  return sortedPrescriptions

  function comparePrescriptions(a, b) {
    let aDate = new Date(a.editionDate)
    let bDate = new Date(b.editionDate)
    return bDate - aDate
  }
}
