import { create } from "zustand";

interface SortState {
  sortMap: Record<string, "none" | "asc" | "desc">;
  toggleSort: (id: string) => void;
}

export const useSortState = create<SortState>((set) => ({
  sortMap: {},
  toggleSort: (id) =>
    set((state) => {
      const current = state.sortMap[id] ?? "none";

      let next: "none" | "asc" | "desc";

      if (current === "none") next = "asc";
      else if (current === "asc") next = "desc";
      else next = "none";

      return {
        sortMap: {
          ...state.sortMap,
          [id]: next,
        },
      };
    }),
}));
