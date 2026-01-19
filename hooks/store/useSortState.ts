import { create } from "zustand";

export type sortTypes = "none" | "asc" | "desc";
export type sortMapType = Record<string, sortTypes>;

interface SortState {
  sortMap: sortMapType;
  filterName: string;
  toggleSort: (id: string) => void;
  resetSort: () => void;
}

export const createSortStore = ({ key, sort }: { key: string; sort: sortTypes }) => {
  const initial_sate = { sortMap: { [key]: sort }, filterName: key };

  return create<SortState>((set) => ({
    ...initial_sate,
    toggleSort: (id) =>
      set((state) => {
        const current = state.sortMap[id] ?? "none";

        let next: sortTypes;

        if (id === key) {
          if (current === "asc") next = "desc";
          else next = "asc";
        } else {
          if (current === "none") next = "desc";
          else if (current === "desc") next = "asc";
          else next = "none";
        }

        if (next === "none") {
          return {
            ...initial_sate,
          };
        }

        return {
          sortMap: {
            [id]: next,
          },
          filterName: id,
        };
      }),
    resetSort: () => set(initial_sate),
  }));
};

export const useUserSortStore = createSortStore({ key: "created_at", sort: "desc" });
export const useSermonSortStore = createSortStore({ key: "published_date", sort: "desc" });
export const useAlbumSortStore = createSortStore({ key: "created_at", sort: "desc" });
