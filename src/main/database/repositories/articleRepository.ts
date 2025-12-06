import type Database from 'better-sqlite3';
import type { Article, ArticleInput, ArticleStatus } from '../../../shared/types/article';

// DB Row Type (snake_case)
interface DbArticleRow {
  id: number;
  title: string;
  category_id: number | null;
  status: ArticleStatus;
  purchase_platform: string | null;
  purchase_price: number;
  purchase_date: string | null;
  shipping_cost_in: number;
  sale_platform: string | null;
  sale_price: number | null;
  sale_date: string | null;
  fees: number;
  shipping_cost_out: number;
  created_at: string;
  updated_at: string;
}

export class ArticleRepository {
  constructor(private db: Database.Database) {}

  getAll(): Article[] {
    const stmt = this.db.prepare(`
      SELECT
        id, title, category_id, status,
        purchase_platform, purchase_price, purchase_date, shipping_cost_in,
        sale_platform, sale_price, sale_date, fees, shipping_cost_out,
        created_at, updated_at
      FROM articles
      ORDER BY created_at DESC
    `);
    const rows = stmt.all() as DbArticleRow[];
    return rows.map(this.mapToArticle);
  }

  getById(id: number): Article | null {
    const stmt = this.db.prepare(`
      SELECT
        id, title, category_id, status,
        purchase_platform, purchase_price, purchase_date, shipping_cost_in,
        sale_platform, sale_price, sale_date, fees, shipping_cost_out,
        created_at, updated_at
      FROM articles
      WHERE id = ?
    `);
    const row = stmt.get(id) as DbArticleRow | undefined;
    return row ? this.mapToArticle(row) : null;
  }

  create(input: ArticleInput): Article {
    const stmt = this.db.prepare(`
      INSERT INTO articles (
        title, category_id, status,
        purchase_platform, purchase_price, purchase_date, shipping_cost_in,
        sale_platform, sale_price, sale_date, fees, shipping_cost_out
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      input.title,
      input.categoryId ?? null,
      input.status ?? 'in_stock',
      input.purchasePlatform ?? null,
      input.purchasePrice,
      input.purchaseDate ?? null,
      input.shippingCostIn ?? 0,
      input.salePlatform ?? null,
      input.salePrice ?? null,
      input.saleDate ?? null,
      input.fees ?? 0,
      input.shippingCostOut ?? 0
    );

    return this.getById(Number(result.lastInsertRowid))!;
  }

  update(id: number, input: Partial<ArticleInput>): Article {
    // Dynamisches UPDATE - nur übergebene Felder aktualisieren
    const fields: string[] = [];
    const values: unknown[] = [];

    if (input.title !== undefined) {
      fields.push('title = ?');
      values.push(input.title);
    }
    if (input.categoryId !== undefined) {
      fields.push('category_id = ?');
      values.push(input.categoryId);
    }
    if (input.status !== undefined) {
      fields.push('status = ?');
      values.push(input.status);
    }
    if (input.purchasePlatform !== undefined) {
      fields.push('purchase_platform = ?');
      values.push(input.purchasePlatform || null);
    }
    if (input.purchasePrice !== undefined) {
      fields.push('purchase_price = ?');
      values.push(input.purchasePrice);
    }
    if (input.purchaseDate !== undefined) {
      fields.push('purchase_date = ?');
      values.push(input.purchaseDate || null);
    }
    if (input.shippingCostIn !== undefined) {
      fields.push('shipping_cost_in = ?');
      values.push(input.shippingCostIn);
    }
    if (input.salePlatform !== undefined) {
      fields.push('sale_platform = ?');
      values.push(input.salePlatform || null);
    }
    if (input.salePrice !== undefined) {
      fields.push('sale_price = ?');
      values.push(input.salePrice ?? null);
    }
    if (input.saleDate !== undefined) {
      fields.push('sale_date = ?');
      values.push(input.saleDate || null);
    }
    if (input.fees !== undefined) {
      fields.push('fees = ?');
      values.push(input.fees);
    }
    if (input.shippingCostOut !== undefined) {
      fields.push('shipping_cost_out = ?');
      values.push(input.shippingCostOut);
    }

    // updated_at immer setzen
    fields.push("updated_at = datetime('now')");

    if (fields.length === 1) {
      // Nur updated_at, keine echten Änderungen
      return this.getById(id)!;
    }

    const sql = `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    this.db.prepare(sql).run(...values);
    return this.getById(id)!;
  }

  delete(id: number): void {
    const result = this.db.prepare('DELETE FROM articles WHERE id = ?').run(id);

    if (result.changes === 0) {
      throw new Error(`Artikel mit ID ${id} nicht gefunden`);
    }
  }

  // Helper: DB row (snake_case) → Article (camelCase)
  private mapToArticle(row: DbArticleRow): Article {
    return {
      id: row.id,
      title: row.title,
      categoryId: row.category_id,
      status: row.status,
      purchasePlatform: row.purchase_platform,
      purchasePrice: row.purchase_price,
      purchaseDate: row.purchase_date,
      shippingCostIn: row.shipping_cost_in,
      salePlatform: row.sale_platform,
      salePrice: row.sale_price,
      saleDate: row.sale_date,
      fees: row.fees,
      shippingCostOut: row.shipping_cost_out,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
