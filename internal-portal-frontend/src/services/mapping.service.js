import API from "../api/axios";

export const getMappings = (
  page = 1,
  limit = 5,
  search = ""
) => {
  return API.get(
    `/mappings?page=${page}&limit=${limit}&search=${search}`
  );
};