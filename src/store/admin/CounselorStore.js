import { create } from "zustand";
import {
  addCounselor,
  allCounselor,
  editCounsellor,
  fetchCounselor,
  getUser,
} from "../../api/admin/counselorapi";

const useCounselorStore = create((set) => ({
  counselors: [],
  counselor: [],

  addCounselors: async (data) => {
    const newCounselor = await addCounselor(data);
    set((state) => ({ counselors: [...state.counselors, newCounselor] }));
  },
  updateCounsellor: async (id, data) => {
    const updatedData = await editCounsellor(id, data);
    set((state) => ({
      counselors: state.counselors.map((counsellor) =>
        counsellor.id === id ? updatedData : counsellor
      ),
    }));
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
  allCounselors: async (filter) => {
    set({ counselors: [] });

    const allData = await allCounselor(filter);
    set({ counselors: allData?.data || [] });
  },
}));

export { useCounselorStore };
