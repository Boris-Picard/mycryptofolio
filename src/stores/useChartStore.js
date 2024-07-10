import { create } from "zustand";

export const useChartStore = create((set) => ({
  dataChart: [],
  setDataChart: (newData) => set({ dataChart: newData }),
  removeDataChart: (dataId) =>
    set((state) => ({
      dataChart: state.dataChart.filter((data) => data._id !== dataId),
    })),
}));
