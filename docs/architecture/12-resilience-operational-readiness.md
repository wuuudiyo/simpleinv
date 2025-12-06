# 12. Resilience & Operational Readiness

## 12.1 Logging-Strategie

### Log-Konfiguration

| Aspekt | Wert | Begründung |
|--------|------|------------|
| Library | `electron-log` | De-facto-Standard für Electron, unterstützt Main + Renderer |
| Log-Pfad | `%APPDATA%/simpleinv/logs/` | Windows-Standard, neben Datenbank |
| Rotation | 7 Tage / max 5MB pro Datei | Verhindert Speicherprobleme |
| Log-Level (Prod) | `info` | Fehler + wichtige Events |
| Log-Level (Dev) | `debug` | Vollständiges Debugging |

### Log-Implementierung

```typescript
// src/main/utils/logger.ts

import log from 'electron-log';
import path from 'path';
import { app } from 'electron';

// Konfiguration
log.transports.file.resolvePathFn = () =>
  path.join(app.getPath('userData'), 'logs', 'main.log');
log.transports.file.maxSize = 5 * 1024 * 1024; // 5MB
log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}] [{level}] {text}';

// Log-Level basierend auf Environment
log.transports.file.level = app.isPackaged ? 'info' : 'debug';
log.transports.console.level = app.isPackaged ? 'warn' : 'debug';

export { log };
```

```typescript
// src/preload/index.ts (Renderer-Logging via IPC)

const api: ElectronApi = {
  // ... bestehende API
  log: {
    info: (msg: string) => ipcRenderer.send('log:info', msg),
    warn: (msg: string) => ipcRenderer.send('log:warn', msg),
    error: (msg: string) => ipcRenderer.send('log:error', msg),
  },
};
```

### Log-Events

| Event | Level | Beispiel |
|-------|-------|----------|
| App-Start | `info` | `App started v1.0.0` |
| DB-Initialisierung | `info` | `Database initialized at ...` |
| Artikel erstellt/gelöscht | `info` | `Article created: id=5` |
| IPC-Fehler | `error` | `IPC Error [articles:create]: ...` |
| Unhandled Exception | `error` | Stack Trace |
| Performance-Warnung | `warn` | `Slow query: 150ms` |

## 12.2 Retry-Strategie

Für eine lokale Desktop-App mit SQLite sind Retries minimal nötig. Dennoch:

```typescript
// src/main/utils/retry.ts

export async function withRetry<T>(
  operation: () => T,
  options: { maxRetries?: number; delayMs?: number } = {}
): T {
  const { maxRetries = 3, delayMs = 100 } = options;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      if (error.code === 'SQLITE_BUSY') {
        // DB ist temporär gesperrt (WAL checkpoint)
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
        continue;
      }
      throw error; // Andere Fehler sofort werfen
    }
  }
  throw new Error('Retry failed');
}
```

**Anwendung:** Nur bei `SQLITE_BUSY` (selten bei Single-User-App).

## 12.3 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/build.yml

name: Build & Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type Check
        run: npm run typecheck

      - name: Unit Tests
        run: npm run test:coverage

      - name: Upload Coverage
        uses: codecov/codecov-action@v4
        if: github.event_name == 'push'

  build:
    runs-on: windows-latest
    needs: test
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run make

      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: simpleinv-win-x64
          path: out/make/**/*
          retention-days: 7

  release:
    runs-on: windows-latest
    needs: build
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build & Package
        run: npm run make
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: out/make/**/*.exe
          draft: true
```

## 12.4 Deployment-Strategie

### Packaging mit Electron Forge

```typescript
// forge.config.ts

import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { VitePlugin } from '@electron-forge/plugin-vite';

const config: ForgeConfig = {
  packagerConfig: {
    name: 'SimpleInv',
    executableName: 'simpleinv',
    icon: './resources/icon',
    appBundleId: 'com.simpleinv.app',
    // Code Signing (Post-MVP)
    // osxSign: {},
    // windowsSign: {},
  },
  makers: [
    new MakerSquirrel({
      name: 'SimpleInv',
      authors: 'SimpleInv Team',
      description: 'Inventory Management for Resellers',
      setupIcon: './resources/icon.ico',
      // Post-MVP: Code Signing Certificate
      // certificateFile: './cert.pfx',
      // certificatePassword: process.env.CERT_PASSWORD,
    }),
  ],
  plugins: [
    new VitePlugin({
      build: [
        { entry: 'src/main/index.ts', config: 'vite.main.config.ts' },
        { entry: 'src/preload/index.ts', config: 'vite.preload.config.ts' },
      ],
      renderer: [{ name: 'main_window', config: 'vite.renderer.config.ts' }],
    }),
  ],
};

export default config;
```

### Installer-Ausgabe

| Format | Tool | Datei |
|--------|------|-------|
| Windows Installer | Squirrel.Windows | `SimpleInv-Setup.exe` |
| Portable (Post-MVP) | electron-builder | `SimpleInv-Portable.exe` |

### Umgebungs-Strategie

| Umgebung | Zweck | Konfiguration |
|----------|-------|---------------|
| **Development** | Lokale Entwicklung | `npm start`, HMR, DevTools offen |
| **Staging** | Interne Tests | Unsigned Build, Debug-Logging |
| **Production** | End-User | Signed Build, Info-Logging, keine DevTools |

```typescript
// src/main/config.ts

export const config = {
  isDev: !app.isPackaged,
  logLevel: app.isPackaged ? 'info' : 'debug',
  dbPath: path.join(app.getPath('userData'), 'data.db'),
};
```

## 12.5 Auto-Update (Post-MVP)

```typescript
// src/main/updater.ts (Post-MVP)

import { autoUpdater } from 'electron-updater';
import { log } from './utils/logger';

export function initAutoUpdater(): void {
  if (!app.isPackaged) return;

  autoUpdater.logger = log;
  autoUpdater.autoDownload = false;

  autoUpdater.on('update-available', (info) => {
    // Notify renderer to show update dialog
    mainWindow?.webContents.send('update:available', info.version);
  });

  autoUpdater.on('update-downloaded', () => {
    // User can choose to restart
    mainWindow?.webContents.send('update:ready');
  });

  // Check on startup (delayed)
  setTimeout(() => autoUpdater.checkForUpdates(), 10000);
}
```

**Update-Server:** GitHub Releases (kostenlos, automatisch via `electron-updater`).

---
