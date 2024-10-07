import { http } from "./config";

export const commentRoomDetailService = {
  getAllCommentRoomDetailById: (id) => {
    return http.get(`binh-luan/lay-binh-luan-theo-phong/${id}`);
  },
  submitComment: async (commentData) => {
    const response = await axios.post(`/binh-luan`, commentData);
    return response.data;
  },
};
