import API from "../api/axios";

export const getEmployeeDashboard = () => {
  return API.get("/dashboard/employee");
};