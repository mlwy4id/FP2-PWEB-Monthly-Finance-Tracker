import budgetApi from "@/services/budgetApi";
import useBudget from "@/store/useBudgetStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetBudget = () => {
  return useQuery({
    queryKey: ["budget"],
    queryFn: budgetApi.getAll,
  });
};

export const useCreateBudget = () => {
  const qc = useQueryClient();
  const addBudget = useBudget((state) => state.addBudget);

  return useMutation({
    mutationFn: (data) => budgetApi.create(data),
    onSuccess: (data) => {
      qc.invalidateQueries(["budget"]);
      addBudget(data);
    },
  });
};

export const usePatchBudget = () => {
  const qc = useQueryClient();
  const updatedBudget = useBudget((state) => state.updateBudget);

  return useMutation({
    mutationFn: (data) => budgetApi.update(data),
    onSuccess: (res, variables) => {
      qc.invalidateQueries(["budget"]);
      updatedBudget(variables.id, res);
    },
  });
};

export const useDeleteBudget = () => {
  const qc = useQueryClient();
  const deleteBudget = useBudget((state) => state.deleteBudget);

  return useMutation({
    mutationFn: (id) => budgetApi.delete(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries(["budget"]);
      deleteBudget(id);
    },
  });
};
