import { create } from "zustand";

const useModal = create((set) => ({
  name: "",
  mode: "",
  payload: null,

  openModal: (name, mode, payload = null) => set({ name, mode, payload }),
  closeModal: () => set({ name: "", mode: "", payload: null }),
}));

export default useModal;
