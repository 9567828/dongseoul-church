import { create } from "zustand";

interface tabState {
  isActive: Record<string, boolean>;
  toggleTab: (id: string) => void;
}

export const useTabStore = create<tabState>((set) => ({
  isActive: {
    all: true,
    active: false,
    inActive: false,
  },

  toggleTab: (id: string) =>
    set(() => ({
      isActive: {
        all: false,
        active: false,
        inActive: false,
        [id]: true,
      },
    })),
}));
