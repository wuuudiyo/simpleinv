import type { ArticleStatus } from '../../../shared/types/article';
import { STATUS_CONFIG } from '../../../shared/types/article';

interface StatusBadgeProps {
  status: ArticleStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
