import API from "../api/axios";

export const getIncentives = () => {
  return API.get("/incentives");
};


export const getMyIncentive = () =>
  API.get("/incentives/my");