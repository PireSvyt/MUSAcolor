import { createSlice } from "@reduxjs/toolkit";

const patientModalSlice = createSlice({
  name: "patientModalSlice",
  initialState: {
    disabled: false,
    loading: false,
    open: false,
    inputs: {
      key: "",
    },
    errors: {
      key: false,
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
      state.inputs.key = "";
      state.errors.key = false;
      state.disabled = false;
      state.loading = false;
    },
    close: (state) => {
      state.open = false;
      state.inputs.key = "";
      state.errors.key = false;
      state.disabled = false;
      state.loading = false;
    },
    change: (state, action) => {
      if (action.payload.open !== undefined) {
        state.open = action.payload.open;
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.key !== undefined) {
          state.inputs.key = action.payload.inputs.key;
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.key !== undefined) {
          state.errors.key = action.payload.errors.key;
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
