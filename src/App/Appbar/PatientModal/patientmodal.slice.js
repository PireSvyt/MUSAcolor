import { createSlice } from "@reduxjs/toolkit";

const patientModalSlice = createSlice({
  name: "patientModalSlice",
  initialState: {
    disabled: false,
    loading: false,
    open: false,
    inputs: {
      name: "",
    },
    errors: {
      name: false,
    },
  },
  reducers: {
    lock: (state) => {
      // Locking the modal
      state.disabled = true;
      state.loading = true;
    },
    unlock: (state) => {
      // Unlocking the modal
      state.disabled = false;
      state.loading = false;
    },
    new: (state) => {
      state.open = true;
      state.inputs.name = "";
      state.errors.name = false;
      state.disabled = false;
      state.loading = false;
    },
    close: (state) => {
      state.open = false;
      state.inputs.name = "";
      state.errors.name = false;
      state.disabled = false;
      state.loading = false;
    },
    change: (state, action) => {
      //console.log("patientModalSlice/change", action.payload)
      if (action.payload.open !== undefined) {
        state.open = action.payload.open;
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.name !== undefined) {
          state.inputs.name = action.payload.inputs.name;
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.name !== undefined) {
          state.errors.name = action.payload.errors.name;
        }
      }
      // Lock
      if (action.payload.disabled !== undefined) {
        state.disabled = action.payload.disabled;
      }
      if (action.payload.loading !== undefined) {
        state.loading = action.payload.loading;
      }
    },
  },
});

export default patientModalSlice.reducer;
