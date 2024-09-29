import { http } from "./config";

export const rentalRoomListService = {
  getAllRentalRoomList: (data) => {
    return http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${data}`);
  },
};
