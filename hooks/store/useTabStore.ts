import { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import { create } from "zustand";

interface tabState {
  isActive: Record<tabStatusType, boolean>;
  boardName: string;
  toggleTab: (id: string, name: string) => void;
}

export const useTabStore = create<tabState>((set) => ({
  isActive: {
    all: true,
    active: false,
    inActive: false,
  },
  boardName: "",

  toggleTab: (id: string, name: string) =>
    set((state) => {
      return {
        boardName: name,
        isActive: {
          all: false,
          active: false,
          inActive: false,
          [id]: true,
        },
      };
    }),
}));
