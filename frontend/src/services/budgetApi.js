import axiosClient from "./axiosClient";

const budgetApi = {
  getAll: () => axiosClient.get("/api/budget").then((res) => res.data),
  create: (newBudget) =>
    axiosClient.post("/api/budget", newBudget).then((res) => res.data),
  update: (updatedBudget) =>
    axiosClient.patch("/api/budget", updatedBudget).then((res) => res.data),
  delete: (id) =>
    axiosClient.delete(`/api/budget`, { data: id }).then((res) => res.data),
};

export default budgetApi;
