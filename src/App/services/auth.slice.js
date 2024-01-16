import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loaded: false,
    signedin: false,
    token: "",
  },
  reducers: {
    signin: (state, action) => {
      state.signedin = true;
      state.token = action.payload;
      state.loaded = true;
    },
    signout: (state) => {
      state.signedin = false;
      state.token = "";
      state.loaded = true;
    },
  },
});

export default authSlice.reducer;
