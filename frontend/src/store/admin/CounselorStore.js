import { create } from "zustand";
import {
  addCounselor,
  fetchCounselor,
  getUser,
} from "../../api/admin/counselorapi";
import { toast } from "react-toastify";

const useCounselorStore = create((set) => ({
  counselors: [],
  counselor: [],

  addCounselors: async (data) => {
    try {
      const newCounselor = await addCounselor(data);
      set((state) => ({ counselors: [...state.counselors, newCounselor] }));
      toast.success(`Counselor successfully`);
    } catch (error) {
      toast.error(error);
    }
  },
  fetchUser: async (id) => {
    const session = await getUser(id);
    set({ counselor: session.data });
  },
  fetchCounselors: async (filter) => {
    set({ counselors: [] });

    const allData = await fetchCounselor(filter);
    set({ counselors: allData?.data || [] });
  },
}));

export { useCounselorStore };
