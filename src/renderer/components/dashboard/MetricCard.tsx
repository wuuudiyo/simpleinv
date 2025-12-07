interface MetricCardProps {
  readonly title: string;
  readonly value: string;
  readonly valueColor?: 'default' | 'positive' | 'negative';
}

const valueColors = {
  default: 'text-gray-900 dark:text-gray-100',
  positive: 'text-green-600 dark:text-green-400',
  negative: 'text-red-600 dark:text-red-400',
};

export function MetricCard({ title, value, valueColor = 'default' }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className={`text-2xl font-semibold mt-1 ${valueColors[valueColor]}`}>
        {value}
      </p>
    </div>
  );
}
