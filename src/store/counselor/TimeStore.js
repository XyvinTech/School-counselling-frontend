import { create } from "zustand";
import { toast } from "react-toastify";
import {
  addTime,
  counsellorTimeSlot,
  getSlot,
  getTime,
} from "../../api/counselor/Timeapi";

const useTimeStore = create((set) => ({
  times: [],
  slots: [],
  addTimes: async (data) => {
    try {
      const newTime = await addTime(data);
      set((state) => ({ times: [...state.times, newTime] }));
      toast.success(newTime.message );
    } catch (error) {
      toast.error(error);
    }
  },
  getTimes: async () => {
    const time = await getTime();
    set({ times: time.data });
  },
  fetchSlot: async (id, filter) => {
    set({ slots: [] });
    const time = await getSlot(id, filter);
    set({ slots: time.data });
  },
  timeSlot: async (id, filter) => {
    set({ slots: [] });
    const time = await counsellorTimeSlot(id, filter);
    set({ slots: time.data });
  },
}));

export { useTimeStore };
