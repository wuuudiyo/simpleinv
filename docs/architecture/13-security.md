# 13. Security

## 13.1 Electron Security Best Practices

SimpleInv folgt den offiziellen [Electron Security Guidelines](https://www.electronjs.org/docs/latest/tutorial/security):

| Maßnahme | Implementierung | Status |
|----------|-----------------|--------|
| **Context Isolation** | `contextIsolation: true` | ✅ Aktiviert |
| **Node Integration** | `nodeIntegration: false` | ✅ Deaktiviert |
| **Sandbox** | `sandbox: true` | ✅ Aktiviert |
| **Remote Module** | Nicht verwendet | ✅ |
| **WebSecurity** | `webSecurity: true` | ✅ Default |

### BrowserWindow Konfiguration

```typescript
// src/main/window.ts

import { BrowserWindow } from 'electron';
import path from 'path';

export function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,    // Renderer hat keinen Zugriff auf Node.js
      nodeIntegration: false,    // require() im Renderer deaktiviert
      sandbox: true,             // Renderer in Sandbox
      webSecurity: true,         // Same-Origin-Policy aktiv
      allowRunningInsecureContent: false,
    },
  });

  // Keine externen URLs öffnen
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  // Navigation auf lokale Dateien beschränken
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://')) {
      event.preventDefault();
    }
  });

  return mainWindow;
}
```

## 13.2 IPC Security

### Prinzip der minimalen Berechtigung

Die Preload-API exponiert nur explizit definierte Funktionen:

```typescript
// src/preload/index.ts

// RICHTIG: Nur spezifische Operationen exponieren
const api = {
  articles: {
    getAll: () => ipcRenderer.invoke('articles:getAll'),
    create: (input: ArticleInput) => ipcRenderer.invoke('articles:create', input),
    // ...
  },
};

// FALSCH: Nie generische IPC-Methoden exponieren
// ❌ ipcRenderer.invoke(channel, ...args)  // Erlaubt beliebige Channels
// ❌ ipcRenderer.send(channel, ...args)    // Sicherheitslücke
```

### Channel-Validierung im Main Process

```typescript
// src/main/ipc/index.ts

const ALLOWED_CHANNELS = [
  'articles:getAll',
  'articles:getById',
  'articles:create',
  'articles:update',
  'articles:delete',
  'categories:getAll',
  'categories:create',
  'categories:update',
  'categories:delete',
  'settings:get',
  'settings:set',
  'metrics:getDashboard',
] as const;

// Typ-Sicherheit: Nur erlaubte Channels können registriert werden
type AllowedChannel = typeof ALLOWED_CHANNELS[number];
```

## 13.3 Input Validation

### Zod-Schemas für alle Eingaben

```typescript
// src/shared/validation/schemas.ts

import { z } from 'zod';

// Article Input Validation
export const articleInputSchema = z.object({
  title: z
    .string()
    .min(1, 'Titel ist erforderlich')
    .max(200, 'Titel darf maximal 200 Zeichen haben'),
  categoryId: z.number().int().positive().nullable(),
  status: z.enum(['in_stock', 'listed', 'sold', 'returned']),
  purchasePlatform: z.string().max(100).nullable().optional(),
  purchasePrice: z
    .number()
    .min(0, 'Kaufpreis muss >= 0 sein')
    .max(999999.99, 'Kaufpreis zu hoch'),
  purchaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  shippingCostIn: z.number().min(0).max(9999.99).default(0),
  salePlatform: z.string().max(100).nullable().optional(),
  salePrice: z.number().min(0).max(999999.99).nullable().optional(),
  saleDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  fees: z.number().min(0).max(9999.99).default(0),
  shippingCostOut: z.number().min(0).max(9999.99).default(0),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;

// Category Input Validation
export const categoryInputSchema = z.object({
  name: z
    .string()
    .min(1, 'Name ist erforderlich')
    .max(50, 'Name darf maximal 50 Zeichen haben')
    .regex(/^[a-zA-Z0-9äöüÄÖÜß\s\-_]+$/, 'Ungültige Zeichen im Namen'),
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;

// Settings Validation
export const themeSettingsSchema = z.object({
  mode: z.enum(['light', 'dark', 'custom']),
  customColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});
```

### Validierung im IPC Handler

```typescript
// src/main/ipc/handlers/articleHandlers.ts

import { articleInputSchema } from '../../../shared/validation/schemas';

ipcMain.handle('articles:create', async (_, rawInput: unknown) => {
  // Validierung vor Verarbeitung
  const result = articleInputSchema.safeParse(rawInput);

  if (!result.success) {
    throw new IpcError('VALIDATION_ERROR', result.error.message);
  }

  return articleRepository.create(result.data);
});
```

## 13.4 Datensicherheit

### Datenklassifizierung

| Datentyp | Sensibilität | Schutzmaßnahme |
|----------|--------------|----------------|
| Artikel-Titel | Niedrig | Keine besondere |
| Preise/Profit | Mittel | Lokale Speicherung nur |
| Einstellungen | Niedrig | Keine besondere |

### Keine persönlichen Daten

SimpleInv speichert **keine personenbezogenen Daten**:
- Keine Benutzernamen oder Passwörter
- Keine E-Mail-Adressen
- Keine Zahlungsinformationen
- Keine Tracking- oder Analyse-Daten

**Datenschutz-Hinweis:** Alle Daten verbleiben lokal auf dem Gerät des Nutzers in `%APPDATA%/simpleinv/`.

### SQLite-Sicherheit

```typescript
// src/main/database/index.ts

// Prepared Statements gegen SQL Injection
const stmt = db.prepare('SELECT * FROM articles WHERE id = ?');
const article = stmt.get(id); // ✅ Sicher

// ❌ NIEMALS String-Konkatenation
// db.exec(`SELECT * FROM articles WHERE id = ${id}`); // SQL Injection!
```

## 13.5 Build-Sicherheit

| Aspekt | Maßnahme |
|--------|----------|
| Dependencies | `npm audit` in CI/CD Pipeline |
| Code Signing | Post-MVP: Windows Authenticode Zertifikat |
| Integrity | Checksums für Release-Artefakte |

---
