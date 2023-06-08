import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "../features/getToggle/toggleSlice";
export const store = configureStore({
  reducer: {
    toggler: toggleSlice,
  },
});
