import API from "../api/axios";

export const getEmployees = (
  page = 1,
  limit = 5,
  search = ""
) => {
  return API.get(
    `/employees?page=${page}&limit=${limit}&search=${search}`
  );
};