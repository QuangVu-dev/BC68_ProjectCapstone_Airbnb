import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import listSlice from "./listSlice";
export const store = configureStore({
  reducer: {
    authSlice,
    listSlice
  },
});
