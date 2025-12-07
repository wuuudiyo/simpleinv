import { MetricCard } from './MetricCard';
import { formatCurrency } from '../../utils/formatters';
import type { DashboardMetrics } from '../../../shared/ipc/types';

interface MetricsRowProps {
  readonly metrics: DashboardMetrics;
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  const { totalProfit, openInventoryValue, unsoldCount } = metrics;

  // Determine profit color
  const getProfitColor = (): 'positive' | 'negative' | 'default' => {
    if (totalProfit > 0) return 'positive';
    if (totalProfit < 0) return 'negative';
    return 'default';
  };
  const profitColor = getProfitColor();

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
