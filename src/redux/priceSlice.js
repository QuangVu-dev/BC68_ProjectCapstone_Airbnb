import { createSlice } from "@reduxjs/toolkit";

const priceSlice = createSlice({
   name: "price",
   initialState: { giaTien: 0 },
   reducers: {
      setPrice(state, action) {
         state.giaTien = action.payload.giaTien;
      },
   },
});

export const { setPrice } = priceSlice.actions;

export default priceSlice.reducer;
