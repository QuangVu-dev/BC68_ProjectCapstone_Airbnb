import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import roomReducer from "./roomInfoSlice";
import priceReducer from "./priceSlice";
import ratingReducer from "./ratingSlice";
import listSlice from "./listSlice";
export const store = configureStore({
   reducer: {
      authSlice,
      listSlice,
      room: roomReducer,
      price: priceReducer,
      rating: ratingReducer,
   },
});
