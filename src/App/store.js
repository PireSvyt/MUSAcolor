import { configureStore } from "@reduxjs/toolkit";
// Domains
import authSlice from "./services/auth.slice.js";
import userSlice from "./services/user.slice.js";
// Modals
import signinModalSlice from "./Appbar/SignInModal/signin.slice.js";
import patientModalSlice from "./Appbar/PatientModal/patientmodal.slice.js";

// Slices
const slices = {
  // Authentication
  authSlice: authSlice,
  // Collections
  userSlice: userSlice,
  // Modals
  signinModalSlice: signinModalSlice,
  patientModalSlice: patientModalSlice,
};

export default configureStore({
  reducer: slices,
});
