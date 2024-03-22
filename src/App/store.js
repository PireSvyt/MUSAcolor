import { configureStore } from '@reduxjs/toolkit'
// Domains
import authSlice from './services/auth.slice.js'
import userSlice from './services/user.slice.js'
import patientSlice from './services/patient.slice.js'
import exerciseSlice from './services/exercise.slice.js'
import examSlice from './services/exam.slice.js'
import prescriptionSlice from './services/prescription.slice.js'
// Modals
import signinModalSlice from './Appbar/SignInModal/SignInModal.slice.js'
import patientModalSlice from './Appbar/PatientModal/PatientModal.slice.js'
import exerciseModalSlice from './Appbar/ExerciseModal/ExerciseModal.slice.js'
import examModalSlice from './Appbar/ExamModal/ExamModal.slice.js'
import prescriptionModalSlice from './Appbar/PrescriptionModal/PrescriptionModal.slice.js'
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
  exerciseSlice: exerciseSlice,
  examSlice: examSlice,
  prescriptionSlice: prescriptionSlice,
  // Modals
  signinModalSlice: signinModalSlice,
  patientModalSlice: patientModalSlice,
  exerciseModalSlice: exerciseModalSlice,
  examModalSlice: examModalSlice,
  prescriptionModalSlice: prescriptionModalSlice,
  passwordResetSlice: passwordResetSlice,
  // Admin
  adminSlice: adminSlice
}

export default configureStore({
  reducer: slices,
})
