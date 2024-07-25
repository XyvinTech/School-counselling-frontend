import { create } from "zustand";

const useAuthStore = create((set) => ({
  counselor: [],
  isAuth: true,
  isChange: false,
  updateChange: (isChange) => {
    set({ isChange: !isChange });
  },
  logoutAuth: (navigate) => {
    localStorage.removeItem("token");
    set({ isAuth: false });
    navigate("/student");
  },
}));

export { useAuthStore };
