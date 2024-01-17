import { createSlice } from '@reduxjs/toolkit'

const patientSlice = createSlice({
  name: 'patientSlice',
  initialState: {
    state: {},
    patientid: '',
    name: '',
    exams: [],
  },
  reducers: {
    load: (state) => {
      state.state.details = 'loading'
    },
    unload: (state) => {
      delete state.state.details
    },
    set: (state, action) => {
        state.patientid = action.payload.patientid
        state.name = action.payload.name
      if (action.payload.exams === undefined) {
        state.exams = []
      } else {
        state.exams = sortExams(action.payload.exams)
      }
      state.state.details = 'available'
    },
  },
})

export default patientSlice.reducer

function sortExams(exams) {
    let sortedExams = exams.sort(compareExams)
    return sortedExams
  
    function compareExams(a, b) {
      return a.date - b.date
    }
  }