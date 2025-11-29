import { create } from "zustand";

const useExpense = create((set) => ({
  expenses: [],

  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),
  updateExpense: (id, newExpense) =>
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...newExpense } : expense
      ),
    })),
}));

export default useExpense;
