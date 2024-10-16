import { createSlice } from "@reduxjs/toolkit";

const roomInfoSlice = createSlice({
   name: "room",
   initialState: { hinhAnh: "", tenPhong: "" },
   reducers: {
      setRoomInfo: (state, action) => {
         state.hinhAnh = action.payload.hinhAnh;
         state.tenPhong = action.payload.tenPhong;
      },
   },
});

export const { setRoomInfo } = roomInfoSlice.actions;

export default roomInfoSlice.reducer;
