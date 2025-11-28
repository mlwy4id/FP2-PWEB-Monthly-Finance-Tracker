import { create } from "zustand";

const useExpense = create((set) => ({
  expenses: [],

  addExpenses: (newExpense) =>
    set((state) => ({
      expenses: [...state.expenses, newExpense],
    })),
}));

export default useExpense;