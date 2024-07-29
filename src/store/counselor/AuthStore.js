import { create } from "zustand";
import { getCounselor } from "../../api/counselor/authApi";

const useAuthStore = create((set) => ({
  counselor: [],
  isAuth: true,
  isChange: false,
  updateChange: (isChange) => {
    set({ isChange: !isChange });
  },
  getCounselor: async () => {
    const fetch = await getCounselor();
    set({ counselor: fetch.data });
  },
  logoutAuth: (navigate) => {
    localStorage.removeItem("token");
    set({ isAuth: false });
    navigate("/counselor");
  },
}));

export { useAuthStore };
