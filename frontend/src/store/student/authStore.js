import { create } from "zustand";
import { getUser } from "../../api/student/authApi";

const useAuthStore = create((set) => ({
  student: [],
  isAuth: true,
  isChange: false,
  updateChange: (isChange) => {
    set({ isChange: !isChange });
  },
  getAdmin: async () => {
    const fetch = await getUser();
    set({ student: fetch.data });
  },
  logoutAuth: (navigate) => {
    localStorage.removeItem("token");
    set({ isAuth: false });
    navigate("/student");
  },
}));

export { useAuthStore };
