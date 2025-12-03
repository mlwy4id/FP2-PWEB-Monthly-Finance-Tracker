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
    }
  });
};
