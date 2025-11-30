import { create } from "zustand";

const useIncome = create((set) => ({
  incomes: [],

  setIncomes: (incomes) => set({ incomes }),
  addIncome: (income) =>
    set((state) => ({
      incomes: [...state.incomes, income],
    })),
  updateIncome: (id, newIncome) =>
    set((state) => ({
      incomes: state.incomes.map((income) =>
        income.id === id ? { ...income, ...newIncome } : income
      ),
    })),
  deleteIncome: (id) =>
    set((state) => ({
      incomes: state.incomes.filter((income) => income.id !== id),
    })),
}));

export default useIncome;