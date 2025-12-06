# 16. Dependency Management

## 16.1 Externe Dependencies

### Lizenz-Übersicht

| Dependency | Lizenz | Kompatibel | Hinweis |
|------------|--------|------------|---------|
| Electron | MIT | ✅ | |
| React | MIT | ✅ | |
| Zustand | MIT | ✅ | |
| TanStack Table | MIT | ✅ | |
| TailwindCSS | MIT | ✅ | |
| better-sqlite3 | MIT | ✅ | Native Module |
| electron-log | MIT | ✅ | |
| react-colorful | MIT | ✅ | |
| Zod | MIT | ✅ | |

**Alle Dependencies sind MIT-lizenziert** — keine Einschränkungen für kommerzielle Nutzung.

### Lizenz-Prüfung in CI

```json
// package.json
{
  "scripts": {
    "license-check": "license-checker --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC'"
  }
}
```

## 16.2 Update-Strategie

### Renovate/Dependabot Konfiguration

```yaml
# .github/dependabot.yml

version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      dev-dependencies:
        patterns:
          - "@types/*"
          - "eslint*"
          - "prettier*"
          - "vitest*"
          - "@testing-library/*"
    ignore:
      # Major Updates manuell prüfen
      - dependency-name: "electron"
        update-types: ["version-update:semver-major"]
      - dependency-name: "react"
        update-types: ["version-update:semver-major"]
```

### Update-Policy

| Typ | Häufigkeit | Automatisch |
|-----|------------|-------------|
| **Security Patches** | Sofort | Ja (Dependabot) |
| **Minor Updates** | Wöchentlich | Ja (mit CI) |
| **Major Updates** | Manuell | Nein |
| **Electron Updates** | Pro Release | Manuell prüfen |

### Kritische Dependencies

| Dependency | Risiko bei Update | Strategie |
|------------|-------------------|-----------|
| **Electron** | Hoch (Breaking Changes) | Changelog lesen, in Dev testen |
| **better-sqlite3** | Mittel (Native Rebuild) | `npm run rebuild` nach Update |
| **React** | Niedrig (stabile API) | Automatisch mit Tests |

## 16.3 Native Module Handling

`better-sqlite3` ist ein natives Node-Modul und muss für Electron rebuilt werden:

```json
// package.json
{
  "scripts": {
    "rebuild": "electron-rebuild -f -w better-sqlite3",
    "postinstall": "electron-rebuild -f -w better-sqlite3"
  }
}
```

### Troubleshooting

| Problem | Lösung |
|---------|--------|
| `MODULE_NOT_FOUND` | `npm run rebuild` |
| `NODE_MODULE_VERSION mismatch` | Electron und Node.js Versionen prüfen |
| Build-Fehler Windows | Visual Studio Build Tools installieren |

## 16.4 Dependency Lockfile

- **Verwende `package-lock.json`** — Garantiert reproduzierbare Builds
- **Commit lockfile** — Immer in Git einchecken
- **`npm ci` in CI** — Installiert exakt die gelockte Version

---
