import { http } from "./config";

export const phongThueService = {
  getRooms: () => http.get(`/phong-thue`),

  postRoom: (room, token) =>
    http.post(`/phong-thue`, room, { headers: { token } }),

  updateRoom: (id, newRoom, token) =>
    http.put(`/phong-thue${id}`, newRoom, { headers: { token } }),

  deleteRoom: (id, token) =>
    http.delete(`/phong-thue${id}`, { headers: { token } }),

  getRoomsByLocation: (maViTri) =>
    http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`),

  getRoomsById: (id) => http.get(`/phong-thue/${id}`),

  uploadImageRoom: (maPhong, img, token) =>
    http.post(`/phong-thue/upload-hinh-phong?maPhong=${maPhong}`, img, {
      headers: { token },
    }),
};