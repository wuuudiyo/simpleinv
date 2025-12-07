import { create } from 'zustand';
import type { DashboardMetrics } from '../../shared/ipc/types';

interface MetricsState {
  metrics: DashboardMetrics;
  isLoading: boolean;
  error: string | null;
  loadMetrics: () => Promise<void>;
}

export const useMetricsStore = create<MetricsState>((set) => ({
  metrics: {
    totalProfit: 0,
    openInventoryValue: 0,
    unsoldCount: 0,
  },
  isLoading: false,
  error: null,

  loadMetrics: async () => {
    set({ isLoading: true, error: null });
    try {
      const metrics = await globalThis.api.metrics.getDashboard();
      set({ metrics, isLoading: false });
    } catch (error) {
      console.error('[MetricsStore] Error loading metrics:', error);
      set({ error: String(error), isLoading: false });
    }
  },
}));
