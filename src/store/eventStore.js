import { create } from "zustand";
import { addEvent } from "../api/eventapi";

const useEventStore = create((set) => ({
  events: [],

  addEvents: async (data) => {
    const newData = await addEvent(data);
    set((state) => ({ events: [...state.events, newData] }));
  },
}));

export { useEventStore };
