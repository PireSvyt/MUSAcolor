import { createSlice } from '@reduxjs/toolkit'

const prescriptionSlice = createSlice({
  name: 'prescriptionSlice',
  initialState: {
    state: {},
    prescriptionid: '',
    patientid: '',
    editionDate: null,
    exercises: [],
  },
  reducers: {
    new: (state, action) => {
      state.type = action.payload.type
      state.patientid = action.payload.patientid
      state.state.type = 'available'
    },
    existing: (state, action) => {
      state.prescriptionid = action.payload.prescriptionid
      state.patientid = action.payload.patientid
    },
    storing: (state) => {
      state.state.storage = 'loading'
    },
    stored: (state, action) => {
      state.state.storage = 'available'
      //state.prescriptionid = action.payload.prescriptionid
    },
    loading: (state) => {
      state.state.load = 'loading'
    },
    loaded: (state) => {
      state.state.load = 'available'
    },
    unloadAnalysis: (state) => {
      delete state.state.load
    },
    setPrescription: (state, action) => {
      //console.log("prescriptionSlice.setPrescription", action.payload)
      state.exercises = action.payload.exercises
      state.editionDate = action.payload.editionDate
      state.state.load = 'available'
    },
    change: (state, action) => {
      if (action.payload.prescriptionid !== undefined) {
        state.prescriptionid = action.payload.prescriptionid
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

export default prescriptionSlice.reducer
