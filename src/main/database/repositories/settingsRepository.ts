import type Database from 'better-sqlite3';

export class SettingsRepository {
  protected db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  get(key: string): string | null {
    const stmt = this.db.prepare('SELECT value FROM settings WHERE key = ?');
    const row = stmt.get(key) as { value: string } | undefined;
    return row?.value ?? null;
  }

  set(key: string, value: string): void {
    const stmt = this.db.prepare(`
      INSERT INTO settings (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `);
    stmt.run(key, value);
  }

  delete(key: string): void {
    const stmt = this.db.prepare('DELETE FROM settings WHERE key = ?');
    stmt.run(key);
  }

  getJson<T>(key: string): T | null {
    const value = this.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  setJson<T>(key: string, value: T): void {
    this.set(key, JSON.stringify(value));
  }
}
