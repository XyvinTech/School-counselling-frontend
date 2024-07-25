import { create } from "zustand";
import { getUser } from "../../api/admin/adminapi";

const useAdminStore = create((set) => ({
  admin: [],
  isAuth: true,
  isChange: false,
  updateChange: (isChange) => {
    set({ isChange: !isChange });
  },
  getAdmin: async () => {
    const fetch = await getUser();
    set({ admin: fetch.data });
  },
  logoutAuth: (navigate) => {
    localStorage.removeItem('token');
    set({ isAuth: false });
    navigate('/');
  }
}));

export { useAdminStore };
