import { create } from "zustand";

const useExpense = create((set) => ({
  expenses: [],

  setExpenses: (expenses) => set({ expenses }),

  addExpenses: (newExpense) =>
    set((state) => ({
      expenses: [...state.expenses, newExpense],
    })),
}));

export default useExpense;
