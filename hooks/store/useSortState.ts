import { create } from "zustand";

export type sortTypes = "none" | "asc" | "desc";
export type sortMapType = Record<string, sortTypes>;

interface SortState {
  sortMap: sortMapType;
  filterName: string;
  toggleSort: (id: string) => void;
}

export const useSortState = create<SortState>((set) => ({
  sortMap: { created_at: "desc" },
  filterName: "created_at",
  toggleSort: (id) =>
    set((state) => {
      const current = state.sortMap[id] ?? "none";

      let next: sortTypes;

      if (current === "none") next = "asc";
      else if (current === "asc") next = "desc";
      else next = "none";

      if (next === "none") {
        return {
          sortMap: { created_at: "desc" },
          filterName: "created_at",
        };
      }

      return {
        sortMap: {
          [id]: next,
        },
        filterName: id,
      };
    }),
}));
