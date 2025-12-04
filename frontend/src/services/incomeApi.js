import axiosClient from "./axiosClient";

const incomeApi = {
  getAll: () => axiosClient.get("/api/income").then((res) => res.data),
  create: (newIncome) =>
    axiosClient.post("/api/income", newIncome).then((res) => res.data),
  update: (updatedIncome) =>
    axiosClient.patch("/api/income", updatedIncome).then((res) => res.data),
  delete: (id) =>
    axiosClient.delete(`/api/income`, { data: id }).then((res) => res.data),
};

export default incomeApi;
