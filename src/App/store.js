import { configureStore } from '@reduxjs/toolkit'
// Domains
import authSlice from './services/auth.slice.js'
import userSlice from './services/user.slice.js'
import patientSlice from './services/patient.slice.js'
import examSlice from './services/exam.slice.js'
// Modals
import signinModalSlice from './Appbar/SignInModal/signin.slice.js'
import patientModalSlice from './Appbar/PatientModal/patientmodal.slice.js'
import examModalSlice from './Appbar/ExamModal/exammodal.slice.js'
import passwordResetSlice from './PasswordReset/passwordreset.slice.js'
// Admin
import adminSlice from './Admin/admin.slice.js'

// Slices
const slices = {
  // Authentication
  authSlice: authSlice,
  // Collections
  userSlice: userSlice,
  patientSlice: patientSlice,
  examSlice: examSlice,
  // Modals
  signinModalSlice: signinModalSlice,
  patientModalSlice: patientModalSlice,
  examModalSlice: examModalSlice,
  passwordResetSlice: passwordResetSlice,
  // Admin
  adminSlice: adminSlice
}

export default configureStore({
  reducer: slices,
})
