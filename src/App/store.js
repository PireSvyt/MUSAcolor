import { configureStore } from "@reduxjs/toolkit";
// Domains
import authSlice from "./services/auth.slice.js"
import userSlice from "./services/user.slice.js"
// Modals
import signinModalSlice from "./Appbar/SignInModal/signin.slice.js"

// Slices
const slices = {
  // Authentication
  authSlice: authSlice,
  // Collections
  userSlice: userSlice,
  // Modals
  signinModalSlice: signinModalSlice,
}

export default configureStore({
  reducer: slices,
});