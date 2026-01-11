import { create } from "zustand";

export type sortTypes = "none" | "asc" | "desc";
export type sortMapType = Record<string, sortTypes>;

interface SortState {
  sortMap: sortMapType;
  filterName: string;
  toggleSort: (id: string) => void;
}

export const createSortStore = ({ key, sort }: { key: string; sort: sortTypes }) =>
  create<SortState>((set) => ({
    sortMap: { [key]: sort },
    filterName: key,
    toggleSort: (id) =>
      set((state) => {
        const current = state.sortMap[id] ?? "none";

        let next: sortTypes;

        if (id === key) {
          if (current === "asc") next = "desc";
          else next = "asc";
        } else {
          if (current === "none") next = "asc";
          else if (current === "asc") next = "desc";
          else next = "none";
        }

        if (next === "none") {
          return {
            sortMap: { [key]: sort },
            filterName: key,
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

export const useUserSortStore = createSortStore({ key: "created_at", sort: "desc" });
export const useSermonSortStore = createSortStore({ key: "published_date", sort: "desc" });
export const useAlbumSortStore = createSortStore({ key: "created_at", sort: "desc" });
