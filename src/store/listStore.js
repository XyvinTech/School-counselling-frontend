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
import { getSessionByCase } from "../api/counselor/sessionApi";

const useListStore = create((set, get) => ({
  lists: [],

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
}));

export { useListStore };
