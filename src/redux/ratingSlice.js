import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
   name: "rating",
   initialState: { averageRating: 0, totalComments: 0 },
   reducers: {
      setRatingInfo: (state, action) => {
         state.averageRating = action.payload.averageRating;
         state.totalComments = action.payload.totalComments;
      },
   },
});

export const { setRatingInfo } = ratingSlice.actions;

export default ratingSlice.reducer;
