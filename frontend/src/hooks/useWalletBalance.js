import useExpense from "@/store/useExpenseStore";
import useIncome from "@/store/useIncomeStore";
import { useMemo } from "react";

export const useWalletBalance = () => {
  const incomes = useIncome((state) => state.incomes);
  const expenses = useExpense((state) => state.expenses);

  const walletBalance = useMemo(() => {
    const map = {};

    incomes.forEach((i) => {
      map[i.wallet] = (map[i.wallet] || 0) + i.amount;
    });

    expenses.forEach((e) => {
      map[e.wallet] = (map[e.wallet] || 0) - e.amount;
    });

    return map;
  }, [incomes, expenses]);

  return walletBalance;
};
