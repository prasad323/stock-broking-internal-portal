import API from "../api/axios";

export const getClients = (
  page = 1,
  limit = 5,
  search = ""
) =>
  API.get(
    `/clients?page=${page}&limit=${limit}&search=${search}`
  );

export const getMyClients = (
  page = 1,
  limit = 5,
  search = ""
) =>
  API.get(
    `/clients/my-clients?page=${page}&limit=${limit}&search=${search}`
  );