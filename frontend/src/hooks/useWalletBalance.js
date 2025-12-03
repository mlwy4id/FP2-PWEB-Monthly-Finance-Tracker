import useExpense from "@/store/useExpenseStore";
import useIncome from "@/store/useIncomeStore";
import { monthlyRecap } from "@/utils/monthlyRecap";
import { useMemo } from "react";

export const useBalance = () => {
  const incomes = useIncome((state) => state.incomes);
  const expenses = useExpense((state) => state.expenses);

  const balance = useMemo(() => {
    const incomesTotal = monthlyRecap(incomes);
    const expensesTotal = monthlyRecap(expenses);

    return incomesTotal - expensesTotal;
  }, [incomes, expenses]);

  return balance;
};
