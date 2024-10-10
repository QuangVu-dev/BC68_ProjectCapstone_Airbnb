import { http } from "./config";

export const commentRoomDetailService = {
  getAllCommentRoomDetailById: (id) => {
    return http.get(`binh-luan/lay-binh-luan-theo-phong/${id}`);
  },
  addComment: (token, data) => {
    return http.post("/binh-luan", data, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzMzcyIiwiZW1haWwiOiJib3FpZGFtQG1haWxpbmF0b3IuY29tIiwicm9sZSI6IlVTRVIiLCJuYmYiOjE3MjY4MjEyMzYsImV4cCI6MTcyNzQyNjAzNn0.fJ0mnNVh8_NgasksNLTsnF_uM-uXiQg_8O1oOs3PKGo",
      },
    });
  },
};
