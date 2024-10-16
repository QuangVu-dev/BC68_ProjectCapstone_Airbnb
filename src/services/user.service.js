import { http } from "./config";
export const userService = {
  getUsers: () => http.get(`/users`),

  postUser: (user) => http.post(`/users`, user),

  updateUser: (id, newUser) => http.put(`/users/${id}`, newUser),

  deleteUser: (id) => http.delete(`/users?id=${id}`),

  getUserById: (id) => http.get(`/users/${id}`),

  getUserByName: (name) => http.get(`/users/search/${name}`),

  uploadAvatar: (img, token) =>
    http.post(`/users/upload-avatar`, img, { headers: { token } }),
};