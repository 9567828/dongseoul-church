import { create } from "zustand";

interface tabState {
  isActive: Record<string, boolean>;
  toggleTab: (id: string) => void;
}

export const useTabStore = create<tabState>((set) => ({
  isActive: {
    all: true,
    show: false,
    noShow: false,
  },

  toggleTab: (id: string) =>
    set(() => ({
      isActive: {
        all: false,
        show: false,
        noShow: false,
        [id]: true,
      },
    })),
}));
