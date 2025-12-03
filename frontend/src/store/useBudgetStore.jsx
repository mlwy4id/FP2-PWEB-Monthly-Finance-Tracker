import { create } from "zustand";

const useBudget = create((set) => ({
  budgets: [],

  setBudget: (budget) => set({ budget }),
  addBudget: (budget) =>
    set((state) => ({
      budgets: [...state.budgets, budget],
    })),
  updateBudget: (id, newBudget) =>
    set((state) => ({
      budgets: state.budgets.map((budget) =>
        budget.id === id ? { ...budget, ...newBudget } : budget
      ),
    })),
  deleteBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter((budget) => budget.id !== id),
    })),
}));

export default useBudget;
