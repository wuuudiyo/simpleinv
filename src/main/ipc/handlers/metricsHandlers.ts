import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../../shared/ipc/channels';
import { getMetricsService } from '../../services';

export function registerMetricsHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.METRICS.GET_DASHBOARD, () => {
    try {
      const metricsService = getMetricsService();
      return metricsService.getDashboardMetrics();
    } catch (error) {
      console.error('[MetricsHandlers] Error getting dashboard metrics:', error);
      throw error;
    }
  });
}
