import { create } from "zustand";

const useBudget = create((set) => ({
  budget: {
    id: "",
    amount: 0,
  },

  setBudget: (budget) => set({ budget }),
}));

export default useBudget;
