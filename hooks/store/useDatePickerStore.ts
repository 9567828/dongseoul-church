import { filterDateType } from '@/utils/propType';
import { create } from 'zustand';

const INITIAL_DATE: filterDateType = { startDate: null, endDate: null, isOneDay: false };

interface ISelectDates {
  draftRange: filterDateType;
  applyRange: filterDateType;
  setDraftRange: (range: filterDateType) => void;
  applyDate: () => void;
  resetDraft: () => void;
  resetAllDates: () => void;
}

export const createDatePickerStore = () =>
  create<ISelectDates>((set, get) => ({
    draftRange: INITIAL_DATE,
    applyRange: INITIAL_DATE,
    setDraftRange: (range) => set({ draftRange: range }),
    applyDate: () => {
      const { draftRange } = get();
      set({ applyRange: draftRange });
    },

    resetDraft: () => set({ draftRange: INITIAL_DATE }),
    resetAllDates: () =>
      set({
        draftRange: INITIAL_DATE,
        applyRange: INITIAL_DATE,
      }),
  }));

export const useAlbumDateFilter = createDatePickerStore();
export const useSermonDateFilter = createDatePickerStore();
export const useUserDateFilter = createDatePickerStore();
