import { create } from "zustand";

export type ToastType = "success" | "error";

export interface IToast {
  id: string;
  type: ToastType;
  message: string;
}

interface IToastState {
  toasts: IToast[];
  success: (msg: string) => void;
  error: (msg: string) => void;
}

const DURATION = {
  success: 2000,
  error: 3500,
};

export const useToastStore = create<IToastState>((set) => ({
  toasts: [],
  success: (message) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, type: "success", message }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, DURATION.success);
  },
  error: (message) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, type: "error", message }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, DURATION.error);
  },
}));
