import { configureStore } from '@reduxjs/toolkit'
// Domains
import authSlice from './services/auth.slice.js'
import userSlice from './services/user.slice.js'
import patientSlice from './services/patient.slice.js'
// Modals
import signinModalSlice from './Appbar/SignInModal/signin.slice.js'
import patientModalSlice from './Appbar/PatientModal/patientmodal.slice.js'
import examModalSlice from './Appbar/ExamModal/exammodal.slice.js'

// Slices
const slices = {
  // Authentication
  authSlice: authSlice,
  // Collections
  userSlice: userSlice,
  patientSlice: patientSlice,
  // Modals
  signinModalSlice: signinModalSlice,
  patientModalSlice: patientModalSlice,
  examModalSlice: examModalSlice,
}

export default configureStore({
  reducer: slices,
})
