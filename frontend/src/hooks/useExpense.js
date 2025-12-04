import expenseApi from "@/services/expenseApi";
import useExpense from "@/store/useExpenseStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetExpense = () => {
  return useQuery({
    queryKey: ["expense"],
    queryFn: expenseApi.getAll,
  });
};

export const useCreateExpense = () => {
  const qc = useQueryClient();
  const addExpense = useExpense((state) => state.addExpense);

  return useMutation({
    mutationFn: (data) => expenseApi.create(data),
    onSuccess: (data) => {
      qc.invalidateQueries(["expense"]);
      addExpense(data);
    },
  });
};

export const usePatchExpense = () => {
  const qc = useQueryClient();
  const updatedExpense = useExpense((state) => state.updatedExpense);

  return useMutation({
    mutationFn: (data) => expenseApi.update(data),
    onSuccess: (res, variables) => {
      qc.invalidateQueries(["expense"]);
      updatedExpense(variables.id, res);
    },
  });
};

export const useDeleteExpense = () => {
  const qc = useQueryClient();
  const deleteExpense = useExpense((state) => state.deleteExpense);

  return useMutation({
    mutationFn: (id) => expenseApi.delete(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries(["expense"]);
      deleteIncome(id);
    },
  });
};
