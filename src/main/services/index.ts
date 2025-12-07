import { databaseService } from '../database';
import { MetricsService } from './metricsService';

// Lazy initialization to ensure database is ready
let _metricsService: MetricsService | null = null;

export function getMetricsService(): MetricsService {
  if (!_metricsService) {
    _metricsService = new MetricsService(databaseService.getDb());
  }
  return _metricsService;
}
