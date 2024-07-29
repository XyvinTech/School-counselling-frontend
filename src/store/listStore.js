import { create } from "zustand";
import {
  counselorSession,
  counselorSessionByCase,
  fetchList,
  getCounselorCase,
  getCounselorSession,
  getSession,
  getUserSession,
} from "../api/listapi";
import {
  getAdminSessionByCase,
  getSessionByCase,
} from "../api/counselor/sessionApi";

const useListStore = create((set, get) => ({
  lists: [],
  totalCount: 0,
  rowPerSize: 10,
  pageNo: 1,
  pageInc: () => {
    const { pageNo, totalCount, rowPerSize } = get();
    const totalPages = Math.ceil(totalCount / rowPerSize);

    if (pageNo < totalPages) {
      set({ pageNo: pageNo + 1 });
    }
  },
  pageDec: () => {
    const { pageNo } = get();
    if (pageNo > 1) {
      set({ pageNo: pageNo - 1 });
    }
  },
  rowChange: (value) => {
    set({ rowPerSize: value, pageNo: 1 });
  },
  fetchLists: async (filter) => {
    set({ lists: [] });
    const allData = await fetchList(filter);
    set({ lists: allData?.data || [] });
  },
  fetchSession: async (id) => {
    set({ lists: [] });
    const session = await getSession(id);
    set({ lists: session.data });
  },
  fetchCounselorSession: async (id) => {
    set({ lists: [] });
    const counselor = await getCounselorSession(id);
    set({ lists: counselor.data });
  },
  fetchCounselorCase: async (id) => {
    set({ lists: [] });
    const cases = await getCounselorCase(id);
    set({ lists: cases.data });
  },

  userSession: async (filter) => {
    set({ lists: [] });
    const allData = await getUserSession(filter);
    set({ lists: allData?.data || [] });
  },
  fetchUserSession: async (id) => {
    set({ lists: [] });
    const session = await getSessionByCase(id);
    set({ lists: session.data });
  },
  counselorSessions: async (filter) => {
    set({ lists: [] });
    const allData = await counselorSession(filter);
    set({ lists: allData?.data || [] });
  },
  counselorSesssionsByCaseId: async (id) => {
    set({ lists: [] });
    const session = await counselorSessionByCase(id);
    set({ lists: session.data });
  },
  adminSesssionsByCaseId: async (id) => {
    set({ lists: [] });
    const session = await getAdminSessionByCase(id);
    set({ lists: session.data });
  },
}));

export { useListStore };
