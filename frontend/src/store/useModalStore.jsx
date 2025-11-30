import { create } from "zustand";

const useModal = create((set) => ({
  name: "",
  mode: "",
  item: null,

  openModal: (name, mode, item = null) => set({ name, mode, item }),
  closeModal: () => set({ name: "", mode: "", item: null }),
}));

export default useModal;
