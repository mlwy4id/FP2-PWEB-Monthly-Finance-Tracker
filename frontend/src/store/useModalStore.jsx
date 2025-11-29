import { create } from "zustand";

const useModal = create((set) => ({
  name: "",
  mode: "",

  openModal: (name, mode) => set({ ['name']: name, ['mode']: mode }),
  closeModal: () => set({ ['name']: "", ['mode']: "" }),
}));

export default useModal;