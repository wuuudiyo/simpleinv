import { MetricCard } from './MetricCard';
import { formatCurrency } from '../../utils/formatters';
import type { DashboardMetrics } from '../../../shared/ipc/types';

interface MetricsRowProps {
  metrics: DashboardMetrics;
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  const { totalProfit, openInventoryValue, unsoldCount } = metrics;

  // Determine profit color
  const profitColor: 'positive' | 'negative' | 'default' =
    totalProfit > 0 ? 'positive' : totalProfit < 0 ? 'negative' : 'default';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Gesamtprofit"
        value={formatCurrency(totalProfit)}
        valueColor={profitColor}
      />
      <MetricCard
        title="Offener Warenwert"
        value={formatCurrency(openInventoryValue)}
      />
      <MetricCard title="Nicht verkaufte Artikel" value={String(unsoldCount)} />
    </div>
  );
}
