import { create } from "zustand";
import {
  acceptSession,
  addEntry,
  addSession,
  cancelcounselorSession,
  cancelUserSession,
  counselorReschedule,
  getAdminSessionReport,
  getCounselorSessionReport,
  getSessionReport,
  reschedule,
} from "../../api/counselor/sessionApi";

const useSessionStore = create((set) => ({
  sessions: [],

  addSessions: async (data) => {
    const newData = await addSession(data);
    set((state) => ({ sessions: [...state.sessions, newData] }));
  },

  updateSession: async (id, data) => {
    const updatedData = await reschedule(id, data);
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? updatedData : session
      ),
    }));
  },

  fetchReport: async (id) => {
    const report = await getSessionReport(id);
    set({ sessions: report.data });
  },
  acceptSessions: async (id, data) => {
    const updatedData = await acceptSession(id, data);
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? updatedData : session
      ),
    }));
  },
  counsellorReport: async (id) => {
    const report = await getCounselorSessionReport(id);
    set({ sessions: report.data });
  },
  rescheduleSession: async (id, data) => {
    const updatedData = await counselorReschedule(id, data);
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? updatedData : session
      ),
    }));
  },
  counsellorAddEntry: async (id, data) => {
    const newData = await addEntry(id, data);
    set((state) => ({ sessions: [...state.sessions, newData] }));
  },
  cancelSessionByCounselor: async (id) => {
    const updatedData = await cancelcounselorSession(id);
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? updatedData : session
      ),
    }));
  },
  cancelSessionByUser: async (id) => {
    const updatedData = await cancelUserSession(id);
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? updatedData : session
      ),
    }));
  },

  adminSessionReport: async (id) => {
    const report = await getAdminSessionReport(id);
    set({ sessions: report.data });
  },
}));

export { useSessionStore };
