import { http } from "./config";

export const locationService = {
  getAllDestinations: () => {
    return http.get("/vi-tri");
  },
};
