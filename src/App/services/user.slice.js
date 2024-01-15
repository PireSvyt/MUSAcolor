import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    state: {},
    userid: "",
    type: "",
    patients: []
  },
  reducers: {
    change : (state, action) => {
      if (action.payload.userid !== undefined) {
        state.userid = action.payload.userid;
      }
      if (action.payload.type !== undefined) {
        state.type = action.payload.type;
      }
      if (action.payload.patients !== undefined) {
        state.patients = action.payload.patients;
      }
      // 
      if (action.payload.state !== undefined) {
        if (action.payload.state.details !== undefined) {
          state.state.details = action.payload.state.details;
        }
      }
    },
    set: (state, action) => {
      state.userid = action.payload.userid;
      state.type = action.payload.type;
      if (action.payload.patients === undefined) {
        state.patients = [];
      } else {
        state.patients = action.payload.patients;
      }
      state.state.details = "available";
    },
    unload: (state) => {
      state.state = {}
      state.userid = ""
      state.type = ""
      state.patients = [];
      delete state.state.details
    },
  },
});

export default userSlice.reducer;
