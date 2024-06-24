import { create } from "zustand";
import { useCookies } from "react-cookie";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set((state) => {
      state.cookies.set("token", user.token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      return { user };
    });
  },
  clearUser: () => {
    set((state) => {
      state.cookies.remove("token", { path: "/" });
      return { user: null };
    });
  },
  setCookies: (cookies) => set({ cookies }),
}));
