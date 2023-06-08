import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

export const toggleSlice = createSlice({
  name: "toggler",
  initialState,
  reducers: {
    toggler: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { toggler } = toggleSlice.actions;

export default toggleSlice.reducer;
