# 15. Development Environment

## 15.1 Voraussetzungen

| Tool | Version | Installation |
|------|---------|--------------|
| **Node.js** | 20.x LTS | [nodejs.org](https://nodejs.org) |
| **npm** | 10.x | Mit Node.js |
| **Git** | 2.x | [git-scm.com](https://git-scm.com) |
| **VS Code** | Latest | Empfohlen |

## 15.2 Projekt-Setup

```bash
# 1. Repository klonen
git clone https://github.com/your-org/simpleinv.git
cd simpleinv

# 2. Dependencies installieren
npm install

# 3. Native Module rebuilden (für better-sqlite3)
npm run rebuild

# 4. Development Server starten
npm start
```

## 15.3 VS Code Konfiguration

### Empfohlene Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "vitest.explorer"
  ]
}
```

### Workspace Settings

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"]
  ]
}
```

## 15.4 npm Scripts Übersicht

| Script | Beschreibung |
|--------|--------------|
| `npm start` | Development mit HMR |
| `npm run build` | Production Build |
| `npm run make` | Windows Installer erstellen |
| `npm run lint` | ESLint ausführen |
| `npm run typecheck` | TypeScript Prüfung |
| `npm test` | Unit Tests (watch mode) |
| `npm run test:coverage` | Tests mit Coverage Report |

## 15.5 Git-Workflow

### Branch-Strategie

```
main ─────────────────────────────────────►
       │                    ▲
       │ feature/xyz        │ PR + Squash Merge
       └────────────────────┘
```

| Branch | Zweck |
|--------|-------|
| `main` | Stable, immer deploybar |
| `feature/*` | Neue Features |
| `fix/*` | Bugfixes |
| `chore/*` | Maintenance (deps, config) |

### Commit-Konventionen

```
<type>(<scope>): <description>

Typen: feat, fix, docs, style, refactor, test, chore
Scope: articles, categories, settings, ui, db, ipc

Beispiele:
feat(articles): add profit calculation
fix(db): handle null category on delete
chore(deps): update electron to 39.1
```

### Pull Request Workflow

1. Branch von `main` erstellen
2. Änderungen committen
3. PR erstellen mit Beschreibung
4. CI muss grün sein (Lint, Type, Test)
5. Code Review (wenn Team > 1)
6. Squash & Merge

## 15.6 Debugging

### Main Process

```typescript
// In VS Code: F5 mit folgender launch.json

// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "args": [".", "--inspect=5858"],
      "sourceMaps": true
    }
  ]
}
```

### Renderer Process

- DevTools öffnen: `Ctrl+Shift+I` im App-Fenster
- React DevTools: Chrome Extension (wird automatisch geladen in Dev)

---
