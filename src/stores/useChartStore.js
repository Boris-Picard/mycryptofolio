import { create } from "zustand";

export const useChartStore = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  addData: (newData) =>
    set((state) => ({ transactions: [...state.data, newData] })),
}));