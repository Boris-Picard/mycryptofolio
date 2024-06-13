import { create } from "zustand";

export const useDeleteTransaction = create((set) => ({
  transactions: [],
  setTransactions: (newTransactions) => set({ transactions: newTransactions }),
  addTransaction: (newTransaction) =>
    set((state) => ({ transactions: newTransaction, ...state.transactions })),
  removeTransaction: (transactionId) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.coin._id !== transactionId
      ),
    })),
}));
