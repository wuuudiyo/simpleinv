# 11. Coding-Standards

## 11.1 Kritische Regeln

- **Type Sharing:** Typen in `src/shared/types/` definieren und importieren
- **IPC Calls:** Nur über `window.api` im Renderer, nie direkt `ipcRenderer`
- **State Updates:** Nie State direkt mutieren, immer über Store Actions
- **Error Handling:** Alle IPC Handler müssen Fehler abfangen
- **DB Mapping:** snake_case in DB, camelCase in TypeScript

## 11.2 Naming Conventions

| Element | Konvention | Beispiel |
|---------|------------|----------|
| React Components | PascalCase | `ArticleTable.tsx` |
| Hooks | camelCase mit 'use' | `useArticles.ts` |
| Stores | camelCase mit 'Store' | `articleStore.ts` |
| IPC Channels | kebab:case | `articles:getAll` |
| DB Tabellen | snake_case | `articles` |
| DB Spalten | snake_case | `purchase_price` |
| TS Interfaces | PascalCase | `Article` |
| TS Properties | camelCase | `purchasePrice` |

## 11.3 Datei-Struktur

- Eine Komponente pro Datei
- Index-Dateien für Re-Exports
- Shared Code in `src/shared/`
- Feature-basierte Ordner-Struktur

---
