import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useDeleteDetailedTransaction } from "./detailed-transactions";
import { useDeleteTransaction } from "./delete-transaction";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
      clearUser: () => {
        set({ user: null });
        useDeleteDetailedTransaction.getState().clearTransactions();
        useDeleteTransaction.getState().clearDeleteTransactions();
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
