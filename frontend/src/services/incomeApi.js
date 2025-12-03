import axiosClient from "./axiosClient";

const incomeApi = {
  getAll: () => axiosClient.get("/api/income").then((res) => res.data),
  create: (newIncome) => axiosClient.post("/api/income", newIncome).then((res) => res.data),
};

export default incomeApi;