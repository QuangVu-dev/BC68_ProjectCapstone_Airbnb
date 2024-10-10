import { http } from "./config";

export const bookingService = {
  getAllBooking: (data) => {
    return http.post("/dat-phong", data);
  },
};
