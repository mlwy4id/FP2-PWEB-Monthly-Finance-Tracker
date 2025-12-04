import incomeApi from "@/services/incomeApi";
import useIncome from "@/store/useIncomeStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetIncome = () => {
  return useQuery({
    queryKey: ["incomes"],
    queryFn: incomeApi.getAll,
  });
};

export const useCreateIncome = () => {
  const qc = useQueryClient();
  const addIncomes = useIncome((state) => state.addIncomes);

  return useMutation({
    mutationFn: (data) => incomeApi.create(data),
    onSuccess: (data) => {
      qc.invalidateQueries(["incomes"]);
      addIncomes(data);
    },
  });
};

export const usePatchIncome = () => {
  const qc = useQueryClient();
  const updatedIncome = useIncome((state) => state.updatedIncome);

  return useMutation({
    mutationFn: (data) => incomeApi.update(data),
    onSuccess: (res, variables) => {
      qc.invalidateQueries(["incomes"]);
      updatedIncome(variables.id, res);
    },
  });
};

export const useDeleteIncome = () => {
  const qc = useQueryClient();
  const deleteIncome = useIncome((state) => state.deleteIncome);

  return useMutation({
    mutationFn: (id) => incomeApi.delete(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries(["incomes"]);
      deleteIncome(id);
    },
  });
};
