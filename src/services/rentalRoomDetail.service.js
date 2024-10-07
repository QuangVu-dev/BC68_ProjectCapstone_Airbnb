import { http } from "./config";

export const rentalRoomDetailService = {
  getRentalRoomDetailById: (id) => {
    return http.get(`phong-thue/${id}`);
  },
};
