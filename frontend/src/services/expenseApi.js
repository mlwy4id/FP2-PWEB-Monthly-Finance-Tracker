import axiosClient from "./axiosClient";

const expenseApi = {
  getAll: () => axiosClient.get("/api/expense").then((res) => res.data),
  create: (newexpense) =>
    axiosClient.post("/api/expense", newexpense).then((res) => res.data),
  update: (updatedexpense) =>
    axiosClient.patch("/api/expense", updatedexpense).then((res) => res.data),
  delete: (id) =>
    axiosClient.delete(`/api/expense`, { data: id }).then((res) => res.data),
};

export default expenseApi;
