import type Database from 'better-sqlite3';
import type { DashboardMetrics } from '../../shared/ipc/types';

export class MetricsService {
  constructor(private readonly db: Database.Database) {}

  getDashboardMetrics(): DashboardMetrics {
    // Gesamtprofit: Summe aller Profits von "sold" Artikeln
    // Profit = sale_price - purchase_price - fees - shipping_cost_in - shipping_cost_out
    const profitResult = this.db
      .prepare(
        `
      SELECT COALESCE(SUM(
        COALESCE(sale_price, 0) -
        COALESCE(purchase_price, 0) -
        COALESCE(fees, 0) -
        COALESCE(shipping_cost_in, 0) -
        COALESCE(shipping_cost_out, 0)
      ), 0) as totalProfit
      FROM articles
      WHERE status = 'sold'
    `
      )
      .get() as { totalProfit: number };

    // Offener Warenwert: Summe Kaufpreise nicht verkaufter Artikel
    const inventoryResult = this.db
      .prepare(
        `
      SELECT COALESCE(SUM(purchase_price), 0) as openInventoryValue
      FROM articles
      WHERE status IN ('in_stock', 'listed')
    `
      )
      .get() as { openInventoryValue: number };

    // Anzahl nicht verkaufter Artikel
    const countResult = this.db
      .prepare(
        `
      SELECT COUNT(*) as unsoldCount
      FROM articles
      WHERE status IN ('in_stock', 'listed')
    `
      )
      .get() as { unsoldCount: number };

    return {
      totalProfit: profitResult.totalProfit,
      openInventoryValue: inventoryResult.openInventoryValue,
      unsoldCount: countResult.unsoldCount,
    };
  }
}
