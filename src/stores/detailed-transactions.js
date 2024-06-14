import { create } from "zustand";

export const useDeleteDetailedTransaction = create((set) => ({
  transactions: [],
  setTransactions: (newTransactions) => set({ transactions: newTransactions }),
  addTransaction: (newTransaction) =>
    set((state) => ({ transactions: [...state.transactions, newTransaction] })),
  removeTransaction: (transactionId) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction._id !== transactionId
      ),
    })),
}));
