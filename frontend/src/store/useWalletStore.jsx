import { create } from "zustand";

const useWallet = create((set) => ({
  wallets: [],

  setWallets: (wallets) => set({ wallets }),
  addWallet: (wallet) =>
    set((state) => ({ wallets: [...state.wallets, wallet] })),
}));

export default useWallet;
