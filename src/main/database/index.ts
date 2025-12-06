import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import { initializeSchema } from './schema';

class DatabaseService {
  private db: Database.Database | null = null;
  private dbPath: string;

  constructor() {
    const userDataPath = app.getPath('userData');
    this.dbPath = path.join(userDataPath, 'data.db');
    console.log('[DatabaseService] DB path:', this.dbPath);
  }

  initialize(): void {
    try {
      console.log('[DatabaseService] Initializing database...');
      this.db = new Database(this.dbPath);
      this.db.pragma('journal_mode = WAL');
      this.db.pragma('foreign_keys = ON');
      initializeSchema(this.db);
      console.log('[DatabaseService] Database initialized successfully');
    } catch (error) {
      console.error('[DatabaseService] Failed to initialize database:', error);
      throw error;
    }
  }

  getDb(): Database.Database {
    if (!this.db) throw new Error('Database not initialized');
    return this.db;
  }

  close(): void {
    this.db?.close();
    this.db = null;
  }
}

export const databaseService = new DatabaseService();
