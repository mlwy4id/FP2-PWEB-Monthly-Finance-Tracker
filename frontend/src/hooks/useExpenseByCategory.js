import useExpense from "@/store/useExpenseStore";
import { useMemo } from "react";

export const useExpenseByCategory = () => {
  const expenses = useExpense((state) => state.expenses);

  const expenseByCategory = useMemo(() => {
    return expenses.reduce((map, e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
      return map;
    }, {});
  }, [expenses]);

  return expenseByCategory;
};
