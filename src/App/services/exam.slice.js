import { createSlice } from '@reduxjs/toolkit'

const examSlice = createSlice({
  name: 'examSlice',
  initialState: {
    state: {},
    examid: '',
    patientid: '',
    type: '',
    results: {},
    analysis: {},
  },
  reducers: {
    new: (state, action) => {
      state.type = action.payload.type
      state.patientid = action.payload.patientid
      state.state.type = 'available'
    },
    existing: (state, action) => {
      state.examid = action.payload.examid
      state.patientid = action.payload.patientid
    },
    storingResults: (state) => {
      state.state.storage = 'loading'
    },
    storedResults: (state, action) => {
      state.state.storage = 'available'
      if (action !== undefined) {
        if (action.payload !== undefined) {
          if (action.payload.examid !== undefined) {
            state.examid = action.payload.examid
          }
        }
      }
    },
    loadAnalysis: (state) => {
      state.state.analysis = 'loading'
    },
    unloadAnalysis: (state) => {
      delete state.state.analysis
    },
    setAnalysis: (state, action) => {
      state.examid = action.payload.examid
      state.type = action.payload.type
      state.analysis = action.payload.analysis
      state.state.analysis = 'available'
    },
    change: (state, action) => {
      if (action.payload.examid !== undefined) {
        state.examid = action.payload.examid
      }
      if (action.payload.state !== undefined) {
        if (action.payload.state.storage !== undefined) {
          state.state.storage = action.payload.state.storage
        }
        if (action.payload.state.analysis !== undefined) {
          state.state.analysis = action.payload.state.analysis
        }
      }
    },
  },
})

export default examSlice.reducer
