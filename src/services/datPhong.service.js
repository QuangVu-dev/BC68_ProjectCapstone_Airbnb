import { http } from "./config";

export const datPhongService = {
  getBookedRooms: () => http.get(`/dat-phong`),

  postBookedRoom: (data) => http.post(`/dat-phong`, data),

  updateBookedRoom: (id, newData) => http.put(`/dat-phong/${id}`, newData),

  deleteBookedRoom: (id) => http.delete(`/dat-phong/${id}`),

  getBookedRoomsById: (id) => http.get(`/dat-phong/${id}`),

  getBookedRoomsByUser: (maNguoiDung) =>
    http.get(`/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`),
};