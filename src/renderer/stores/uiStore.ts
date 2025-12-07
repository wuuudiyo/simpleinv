import { create } from 'zustand';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
  toasts: Toast[];
  showToast: (message: string, type: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

let toastId = 0;

export const useUIStore = create<UIState>((set) => ({
  toasts: [],

  showToast: (message, type) => {
    const id = `toast-${++toastId}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

// Helper für einfache Aufrufe
export const toast = {
  success: (message: string) => useUIStore.getState().showToast(message, 'success'),
  error: (message: string) => useUIStore.getState().showToast(message, 'error'),
  info: (message: string) => useUIStore.getState().showToast(message, 'info'),
  warning: (message: string) => useUIStore.getState().showToast(message, 'warning'),
};
