import { create } from "zustand";
import { toast } from "react-toastify";
import {
  acceptSession,
  addSession,
  counselorReschedule,
  getCounselorSessionReport,
  getSessionReport,
  reschedule,
} from "../../api/counselor/sessionApi";

const useSessionStore = create((set) => ({
  sessions: [],

  addSessions: async (data) => {
    try {
      const newData = await addSession(data);
      set((state) => ({ sessions: [...state.sessions, newData] }));
      toast.success("Counselor added successfully");
    } catch (error) {
      toast.error(error.message || "Failed to add counselor");
    }
  },

  updateSession: async (id, data) => {
    try {
      const updatedData = await reschedule(id, data);
      set((state) => ({
        sessions: state.sessions.map((session) =>
          session.id === id ? updatedData : session
        ),
      }));
      toast.success(updatedData.message);
    } catch (error) {
      toast.error(error.message || "Failed to reschedule session");
    }
  },

  fetchReport: async (id) => {
    const report = await getSessionReport(id);
    set({ sessions: report.data });
  },
  acceptSessions: async (id, data) => {
    try {
      const updatedData = await acceptSession(id, data);
      set((state) => ({
        sessions: state.sessions.map((session) =>
          session.id === id ? updatedData : session
        ),
      }));
      toast.success(updatedData.message);
    } catch (error) {
      toast.error(error.message || "Failed to reschedule session");
    }
  },
  counsellorReport: async (id) => {
    const report = await getCounselorSessionReport(id);
    set({ sessions: report.data });
  },
  rescheduleSession: async (id, data) => {
    try {
      const updatedData = await counselorReschedule(id, data);
      set((state) => ({
        sessions: state.sessions.map((session) =>
          session.id === id ? updatedData : session
        ),
      }));
      toast.success(updatedData.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to reschedule session";
      toast.error(errorMessage);
    }
  },
}));

export { useSessionStore };
