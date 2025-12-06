import type Database from 'better-sqlite3';
import type { Category, CategoryInput } from '../../../shared/types/category';

export class CategoryRepository {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  getAll(): Category[] {
    const stmt = this.db.prepare('SELECT id, name FROM categories ORDER BY name ASC');
    return stmt.all() as Category[];
  }

  getById(id: number): Category | undefined {
    const stmt = this.db.prepare('SELECT id, name FROM categories WHERE id = ?');
    return stmt.get(id) as Category | undefined;
  }

  create(input: CategoryInput): Category {
    const stmt = this.db.prepare('INSERT INTO categories (name) VALUES (?)');
    const result = stmt.run(input.name);
    return { id: Number(result.lastInsertRowid), name: input.name };
  }

  update(id: number, input: CategoryInput): Category {
    const stmt = this.db.prepare('UPDATE categories SET name = ? WHERE id = ?');
    stmt.run(input.name, id);
    return { id, name: input.name };
  }

  delete(id: number): void {
    const stmt = this.db.prepare('DELETE FROM categories WHERE id = ?');
    stmt.run(id);
  }

  existsByName(name: string, excludeId?: number): boolean {
    const stmt = excludeId
      ? this.db.prepare('SELECT 1 FROM categories WHERE name = ? AND id != ? LIMIT 1')
      : this.db.prepare('SELECT 1 FROM categories WHERE name = ? LIMIT 1');
    const result = excludeId ? stmt.get(name, excludeId) : stmt.get(name);
    return result !== undefined;
  }
}
