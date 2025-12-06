# 17. AI Agent Implementation Guide

## 17.1 Architektur-Übersicht für AI Agents

Diese Architektur ist optimiert für AI-Agent-Implementierung:

| Aspekt | Design-Entscheidung | Vorteil für AI |
|--------|---------------------|----------------|
| **Klare Grenzen** | Main/Preload/Renderer Trennung | Isolierte Implementierung |
| **Typsicherheit** | TypeScript + Zod | Fehler werden früh erkannt |
| **Konsistente Patterns** | Repository, Store, Component | Vorhersagbare Struktur |
| **Explizite Interfaces** | `shared/types/` + `shared/ipc/` | Klare Contracts |

## 17.2 Implementierungs-Reihenfolge

Empfohlene Reihenfolge für AI-Agent-Implementierung:

```
1. Shared Types & Validation    (src/shared/)
   └── Types definieren, Zod-Schemas erstellen

2. Database Layer              (src/main/database/)
   └── Schema, Repositories implementieren

3. IPC Layer                   (src/main/ipc/ + src/preload/)
   └── Handler registrieren, Preload exponieren

4. Stores                      (src/renderer/stores/)
   └── Zustand Stores für jeden Bereich

5. UI Components               (src/renderer/components/)
   └── Bottom-up: ui/ → features/ → pages/
```

## 17.3 Häufige Pitfalls & Lösungen

| Pitfall | Problem | Lösung |
|---------|---------|--------|
| **IPC Type Mismatch** | Renderer sendet falschen Typ | Zod-Validation im Handler |
| **DB Column Naming** | camelCase in TS, snake_case in DB | Mapping-Funktionen nutzen |
| **Store Mutation** | Direktes State-Mutieren | Immer `set()` verwenden |
| **Missing await** | IPC-Calls sind async | Alle `window.api.*` awaiten |
| **Preload Exposure** | Zu viel API exponiert | Nur spezifische Funktionen |
| **better-sqlite3 Build** | Native Module Error | `npm run rebuild` |

## 17.4 Code-Beispiel: Feature implementieren

Beispiel: Neue "Notes"-Eigenschaft zu Artikeln hinzufügen:

```typescript
// 1. Type erweitern (src/shared/types/article.ts)
export interface Article {
  // ... bestehende Felder
  notes: string | null;  // NEU
}

// 2. Zod-Schema erweitern (src/shared/validation/schemas.ts)
export const articleInputSchema = z.object({
  // ... bestehende Felder
  notes: z.string().max(1000).nullable().optional(),  // NEU
});

// 3. DB-Schema erweitern (src/main/database/schema.ts)
// Migration oder ALTER TABLE:
// ALTER TABLE articles ADD COLUMN notes TEXT;

// 4. Repository anpassen (src/main/database/repositories/articleRepository.ts)
// INSERT/UPDATE Statements erweitern

// 5. UI-Formular erweitern (src/renderer/components/articles/ArticleForm.tsx)
// Input-Feld für notes hinzufügen
```

## 17.5 Referenz-Ressourcen

| Ressource | URL | Zweck |
|-----------|-----|-------|
| Electron Docs | electronjs.org/docs | Electron APIs |
| React Docs | react.dev | React Patterns |
| Zustand Docs | docs.pmnd.rs/zustand | State Management |
| TanStack Table | tanstack.com/table | Tabellen-API |
| better-sqlite3 | github.com/WiseLibs/better-sqlite3 | SQLite API |

---
