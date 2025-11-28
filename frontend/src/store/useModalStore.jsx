import { create } from "zustand";

const useModal = create((set) => ({
  expenseModal: false,

  openModal: (modalName) => set({ [modalName]: true }),
  closeModal: (modalName) => set({ [modalName]: false }),
}));

export default useModal;