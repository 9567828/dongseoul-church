import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SideBarState {
  isClose: boolean;
  _hasHydrated: boolean;
  toggleSideBar: () => void;
}

export const useSideBarStateStore = create<SideBarState>()(
  persist<SideBarState>(
    (set) => ({
      isClose: false,
      _hasHydrated: false,
      toggleSideBar: () => set((s) => ({ isClose: !s.isClose })),
    }),
    {
      name: "side-collapse",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);
