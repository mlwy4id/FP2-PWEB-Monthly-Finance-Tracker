import useIncome from "@/store/useIncomeStore";
import { useMemo } from "react";

export const useIncomeByWallet = () => {
  const incomes = useIncome((state) => state.incomes);

  const incomeByWallet = useMemo(() => {
    return incomes.reduce((map, i) => {
      map[i.wallet] = (map[i.wallet] || 0) + i.amount;
      return map;
    }, {});
  }, [incomes]);

  return incomeByWallet;
};
