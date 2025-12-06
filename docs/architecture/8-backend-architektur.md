# 8. Backend-Architektur

## 8.1 Main Process Organisation

```
src/main/
├── index.ts                   # Entry Point
├── window.ts                  # BrowserWindow Config
├── database/
│   ├── index.ts               # Database Service
│   ├── schema.ts              # Schema-Definition
│   └── repositories/
│       ├── articleRepository.ts
│       ├── categoryRepository.ts
│       └── settingsRepository.ts
├── ipc/
│   ├── index.ts               # Handler Registration
│   └── handlers/
│       ├── articleHandlers.ts
│       ├── categoryHandlers.ts
│       ├── settingsHandlers.ts
│       └── metricsHandlers.ts
└── services/
    └── metricsService.ts
```

## 8.2 Database Service

```typescript
// src/main/database/index.ts

import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';

class DatabaseService {
  private db: Database.Database | null = null;
  private dbPath: string;

  constructor() {
    const userDataPath = app.getPath('userData');
    this.dbPath = path.join(userDataPath, 'data.db');
  }

  initialize(): void {
    this.db = new Database(this.dbPath);
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('foreign_keys = ON');
    initializeSchema(this.db);
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
```

---
