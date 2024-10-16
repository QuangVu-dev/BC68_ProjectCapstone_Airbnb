import { http } from "./config";

export const viTriService = {
  getLocations: () => http.get("/vi-tri"),

  postLocation: (location, token) =>
    http.post("/vi-tri", location, { headers: { token } }),

  updateLocation: (id, newLocation, token) =>
    http.put(`/vi-tri/${id}`, newLocation, { headers: { token } }),

  deleteLocation: (id, token) =>
    http.delete(`/vi-tri/${id}`, { headers: { token } }),

  getLocationsById: (id) => http.get(`/vi-tri/${id}`),

  uploadImageLocation: (maViTri, img, token) =>
    http.post(`/vi-tri/upload-hinh-vitri?maViTri=${maViTri}`, img, {
      headers: { token },
    }),
};
