import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { DetailRow } from './DetailRow';
import { formatCurrency, formatProfit, formatDate, formatRoi } from '../../utils/formatters';
import type { ArticleWithCalculations } from '../../../shared/types/article';

interface ArticleModalProps {
  readonly article: ArticleWithCalculations | null;
  readonly categoryName: string | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

export function ArticleModal({
  article,
  categoryName,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: ArticleModalProps) {
  if (!article) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={article.title} size="md">
      {/* Basis-Sektion */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
          Basis
        </h3>
        <div className="space-y-2">
          <DetailRow label="Kategorie" value={categoryName ?? 'Keine Kategorie'} />
          <DetailRow label="Status" value={<StatusBadge status={article.status} />} />
        </div>
      </section>

      {/* Einkauf-Sektion */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
          Einkauf
        </h3>
        <div className="space-y-2">
          <DetailRow label="Plattform" value={article.purchasePlatform ?? '–'} />
          <DetailRow label="Kaufpreis" value={formatCurrency(article.purchasePrice)} />
          <DetailRow label="Kaufdatum" value={formatDate(article.purchaseDate)} />
          <DetailRow label="Versandkosten" value={formatCurrency(article.shippingCostIn)} />
        </div>
      </section>

      {/* Verkauf-Sektion */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
          Verkauf
        </h3>
        <div className="space-y-2">
          <DetailRow label="Plattform" value={article.salePlatform ?? '–'} />
          <DetailRow label="Verkaufspreis" value={formatCurrency(article.salePrice)} />
          <DetailRow label="Verkaufsdatum" value={formatDate(article.saleDate)} />
          <DetailRow label="Gebühren" value={formatCurrency(article.fees)} />
          <DetailRow label="Versandkosten" value={formatCurrency(article.shippingCostOut)} />
        </div>
      </section>

      {/* Berechnungen-Sektion */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
          Berechnungen
        </h3>
        <div className="space-y-2">
          {article.salePrice === null ? (
            <p className="text-gray-400 dark:text-gray-500 italic">
              Noch nicht verkauft
            </p>
          ) : (
            <>
              <DetailRow
                label="Profit"
                value={
                  <span className={formatProfit(article.profit).className}>
                    {formatProfit(article.profit).text}
                  </span>
                }
              />
              <DetailRow
                label="ROI"
                value={
                  <span className={formatRoi(article.roi).className}>
                    {formatRoi(article.roi).text}
                  </span>
                }
              />
            </>
          )}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="danger" onClick={onDelete}>
          Löschen
        </Button>
        <Button variant="primary" onClick={onEdit}>
          Bearbeiten
        </Button>
      </div>
    </Modal>
  );
}
