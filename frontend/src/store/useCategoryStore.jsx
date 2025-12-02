import { create } from "zustand";

const useCategory = create((set) => ({
  categories: [],

  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
}));

export default useCategory;
