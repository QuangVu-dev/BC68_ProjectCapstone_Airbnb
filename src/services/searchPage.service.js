import { http } from "./config";

export const searchPageService = {
  getAllSearchPage: (pageIndex, pageSize) => {
    return http.get(
      `/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
};
