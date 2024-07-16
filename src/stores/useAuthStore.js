import { create } from "zustand";
import { useDeleteDetailedTransaction } from "./detailed-transactions";
import { useDeleteTransaction } from "./delete-transaction";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  clearUser: () => {
    set({ user: null });
    useDeleteDetailedTransaction.getState().clearTransactions();
    useDeleteTransaction.getState().clearDeleteTransactions();
  },
}));
