import API from "../api/axios";

export const getTrades = (
  page = 1,
  limit = 5,
  search = ""
) => {
  return API.get(
    `/trades?page=${page}&limit=${limit}&search=${search}`
  );
};