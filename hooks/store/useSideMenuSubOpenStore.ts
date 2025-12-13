import { create } from "zustand";

interface SideMenuState {
  isSubOpen: boolean;
  toggleSideMenu: () => void;
}

export const useSideMenuSubOpenStore = create<SideMenuState>((set) => ({
  isSubOpen: false,
  toggleSideMenu: () => set((state) => ({ isSubOpen: !state.isSubOpen })),
}));
