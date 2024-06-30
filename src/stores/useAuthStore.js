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
        useDeleteDetailedTransaction.clearTransactions();
        useDeleteTransaction.clearDeleteTransactions();
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
