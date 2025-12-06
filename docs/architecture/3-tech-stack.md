# 3. Tech Stack

| Kategorie | Technologie | Version | Zweck |
|-----------|-------------|---------|-------|
| Runtime | Electron | 39.x | Desktop-App-Container |
| Frontend-Sprache | TypeScript | 5.9.x | Typsicherheit |
| Frontend-Framework | React | 19.x | UI-Komponenten |
| Build Tool | Electron Forge + Vite | 7.5+ | Build & HMR |
| CSS Framework | TailwindCSS | 4.1.x | Styling |
| State Management | Zustand | 5.x | Globaler State |
| Tabellen-Komponente | TanStack Table | 8.21.x | Sortierbare Tabelle |
| Color Picker | react-colorful | 5.x | Custom Theme |
| Datenbank | SQLite (better-sqlite3) | 11.x | Lokale Persistenz |
| Packaging | electron-builder | 25.x | Windows Installer |
| Linting | ESLint | 9.x | Code-Qualität |
| Formatting | Prettier | 3.x | Code-Formatierung |

## 3.1 Technologie-Entscheidungen

### State Management: Zustand

| Kriterium | Zustand | Redux | Jotai | Entscheidung |
|-----------|---------|-------|-------|--------------|
| Bundle Size | ~1KB | ~7KB | ~2KB | ✅ Zustand |
| Boilerplate | Minimal | Hoch (Actions, Reducers) | Minimal | ✅ Zustand |
| Lernkurve | Flach | Steil | Flach | ✅ Zustand |
| DevTools | Ja | Ja (besser) | Ja | Neutral |
| TypeScript | Exzellent | Gut | Exzellent | Neutral |

**Begründung:** Für eine kleine Desktop-App mit 3-4 Stores ist Zustand ideal. Redux wäre Overkill, Jotai ist atomarer als nötig.

### Tabellen-Komponente: TanStack Table

| Kriterium | TanStack Table | AG-Grid | React-Table v7 | Entscheidung |
|-----------|----------------|---------|----------------|--------------|
| Lizenz | MIT (kostenlos) | Community/Enterprise | MIT | ✅ TanStack |
| Bundle Size | ~15KB | ~200KB+ | Deprecated | ✅ TanStack |
| Sortierung | Built-in | Built-in | Built-in | Neutral |
| Virtualisierung | Plugin | Built-in | Nein | Neutral |
| Headless | Ja | Nein (eigenes Styling) | Ja | ✅ TanStack |

**Begründung:** TanStack Table ist der Nachfolger von React-Table, headless (passt zu TailwindCSS), und für unsere Anforderungen (Sortierung, <1000 Zeilen) perfekt dimensioniert.

### Datenbank: SQLite (better-sqlite3)

| Kriterium | better-sqlite3 | sql.js | LokiJS | Entscheidung |
|-----------|----------------|--------|--------|--------------|
| Performance | Nativ, schnell | WASM, langsamer | In-Memory | ✅ better-sqlite3 |
| Synchron | Ja | Nein | Ja | ✅ better-sqlite3 |
| Persistenz | Native File | Manual Save | Manual Save | ✅ better-sqlite3 |
| Electron-Kompatibilität | Exzellent | Gut | Gut | ✅ better-sqlite3 |

**Begründung:** better-sqlite3 ist synchron (kein Callback-Hell), nativ kompiliert (schnell), und der De-facto-Standard für Electron + SQLite.

### CSS Framework: TailwindCSS

| Kriterium | TailwindCSS | CSS Modules | Styled-Components | Entscheidung |
|-----------|-------------|-------------|-------------------|--------------|
| Dark Mode | Built-in (`dark:`) | Manual | Manual | ✅ Tailwind |
| Bundle Size | Purged ~10KB | Minimal | ~15KB Runtime | ✅ Tailwind |
| Entwicklungsgeschwindigkeit | Sehr hoch | Mittel | Mittel | ✅ Tailwind |
| Konsistenz | Design System | Manual | Manual | ✅ Tailwind |

**Begründung:** TailwindCSS bietet eingebautes Dark Mode Handling, schnelle Entwicklung durch Utility Classes, und automatisches Purging für kleine Bundle-Größen.

## 3.2 Migrations-Strategie

**Aktueller Stand (MVP):** Schema wird einmalig bei App-Start erstellt, keine Migrationen.

**Post-MVP Strategie:**

```typescript
// src/main/database/migrations/index.ts

interface Migration {
  version: number;
  up: (db: Database) => void;
  description: string;
}

const migrations: Migration[] = [
  {
    version: 1,
    description: 'Initial schema',
    up: (db) => { /* Initial tables */ }
  },
  {
    version: 2,
    description: 'Add notes field to articles',
    up: (db) => {
      db.exec('ALTER TABLE articles ADD COLUMN notes TEXT');
    }
  }
];

export function runMigrations(db: Database): void {
  const currentVersion = db.pragma('user_version', { simple: true }) as number;

  for (const migration of migrations) {
    if (migration.version > currentVersion) {
      migration.up(db);
      db.pragma(`user_version = ${migration.version}`);
    }
  }
}
```

**Versionierung:**
- SQLite `user_version` PRAGMA speichert aktuelle Schema-Version
- Migrationen sind vorwärts-only (kein Rollback für Einfachheit)
- Backup vor Migration empfohlen

## 3.3 Backup & Recovery

### Backup-Strategie

| Methode | Beschreibung | Wann |
|---------|--------------|------|
| **Manuell** | User kopiert `%APPDATA%/simpleinv/data.db` | Jederzeit |
| **Export (Post-MVP)** | "Daten exportieren" Button in Einstellungen | User-initiiert |
| **Auto-Backup (Post-MVP)** | Kopie vor Migrationen erstellen | Automatisch |

### Backup-Speicherort

```
%APPDATA%/simpleinv/
├── data.db              # Aktuelle Datenbank
├── backups/             # (Post-MVP)
│   ├── data_2025-12-06_pre-migration.db
│   └── data_2025-12-05_manual.db
```

### Recovery-Prozess

1. **App schließen**
2. **Backup-Datei nach `data.db` kopieren** (Original überschreiben)
3. **App starten** - Daten sind wiederhergestellt

### Datenintegrität

```typescript
// src/main/database/index.ts

// WAL-Modus für Crash-Resistenz
this.db.pragma('journal_mode = WAL');

// Foreign Keys für referentielle Integrität
this.db.pragma('foreign_keys = ON');

// Integrity Check bei Bedarf
const result = this.db.pragma('integrity_check');
if (result[0].integrity_check !== 'ok') {
  // Warnung an User, Backup empfehlen
}
```

---
