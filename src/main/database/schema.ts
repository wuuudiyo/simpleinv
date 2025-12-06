import type Database from 'better-sqlite3';

export function initializeSchema(db: Database.Database): void {
  // Categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  // Articles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category_id INTEGER,
      status TEXT NOT NULL DEFAULT 'in_stock'
        CHECK (status IN ('in_stock', 'listed', 'sold', 'returned')),
      purchase_platform TEXT,
      purchase_price REAL NOT NULL,
      purchase_date TEXT,
      shipping_cost_in REAL NOT NULL DEFAULT 0,
      sale_platform TEXT,
      sale_price REAL,
      sale_date TEXT,
      fees REAL NOT NULL DEFAULT 0,
      shipping_cost_out REAL NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `);

  // Settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status)
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id)
  `);
}
