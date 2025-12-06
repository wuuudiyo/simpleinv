/**
 * Formatierungs-Utilities für die Anzeige von Werten
 */

/**
 * Formatiert einen Geldbetrag als Euro-Währung
 * @param value - Betrag in Euro (kann null sein)
 * @returns Formatierter String (z.B. "12,50 €") oder "–" bei null
 */
export function formatCurrency(value: number | null): string {
  if (value === null) return '–';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

/**
 * Formatiert einen Profit-Wert mit Farb-Klasse
 * @param profit - Profit in Euro (kann null sein)
 * @returns Objekt mit formatiertem Text und CSS-Klasse
 */
export function formatProfit(profit: number | null): { text: string; className: string } {
  if (profit === null) {
    return { text: '–', className: 'text-gray-400' };
  }
  const text = formatCurrency(profit);
  if (profit >= 0) {
    return { text, className: 'text-green-600 dark:text-green-400' };
  }
  return { text, className: 'text-red-600 dark:text-red-400' };
}

/**
 * Formatiert ein Datum im deutschen Format (DD.MM.YYYY)
 * @param dateString - ISO-Datum-String oder null
 * @returns Formatiertes Datum oder "–" bei null
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return '–';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Formatiert einen ROI-Wert als Prozent mit Farb-Klasse
 * @param roi - ROI als Dezimalzahl (kann null sein)
 * @returns Objekt mit formatiertem Text (z.B. "12,50 %") und CSS-Klasse
 */
export function formatRoi(roi: number | null): { text: string; className: string } {
  if (roi === null) {
    return { text: '–', className: 'text-gray-400' };
  }
  const formatted = `${roi.toFixed(2).replace('.', ',')} %`;
  if (roi >= 0) {
    return { text: formatted, className: 'text-green-600 dark:text-green-400' };
  }
  return { text: formatted, className: 'text-red-600 dark:text-red-400' };
}
