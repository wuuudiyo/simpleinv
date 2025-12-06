# PO Epic 3 Arbeitsplan

**Erstellt:** 2025-12-06
**Aktualisiert:** 2025-12-06
**Status:** Stories Approved - Bereit für Implementierung
**Agent:** Sarah (PO)

---

## Aktueller Stand

| Story | Status | Beschreibung |
|-------|--------|--------------|
| Epic 1 (1.1-1.5) | Done | Foundation & Projekt-Setup |
| Epic 2 (2.1-2.6) | Done | Artikel-Management (CRUD) |
| **Story 3.1** | Approved | Dashboard-Metriken implementieren |
| **Story 3.2** | Approved | Profit- und ROI-Berechnung finalisieren |
| **Story 3.3** | Approved | Einstellungen-Seite |
| **Story 3.4** | Approved | Feinschliff und UX-Verbesserungen |

---

## Epic 3 Übersicht

**Ziel:** Automatische Profit- und ROI-Berechnungen sowie ein Dashboard mit Metriken bieten dem Benutzer sofortigen Überblick über seinen Business-Status. Am Ende dieses Epics sieht der Benutzer auf einen Blick: Gesamtprofit, offener Warenwert und Anzahl nicht verkaufter Artikel.

### Story-Zusammenfassung

| Story | Kern-Funktionalität | Abhängigkeiten |
|-------|---------------------|----------------|
| **3.1** | 3 Dashboard-Metriken-Karten | Epic 2 (Artikel-Daten) |
| **3.2** | Konsistente Profit/ROI-Formel | 3.1 (Metriken-Backend) |
| **3.3** | Einstellungen-Modal mit Theme | Epic 1 (Theme-System) |
| **3.4** | Toast-System, Empty States, UX | 3.1, 3.2, 3.3 |

---

## Implementierungs-Reihenfolge

Die Stories sollten in dieser Reihenfolge implementiert werden:

1. **Story 3.1** (Dashboard-Metriken) - Basis für Metriken-Anzeige
2. **Story 3.2** (Profit/ROI-Berechnung) - Konsolidiert Berechnungslogik
3. **Story 3.3** (Einstellungen-Seite) - Unabhängig von 3.1/3.2
4. **Story 3.4** (Feinschliff/UX) - Finale Verbesserungen

**Hinweis:** Story 3.3 kann parallel zu 3.1 oder 3.2 entwickelt werden.

---

## Befehle für den Dev Agent

```bash
# App starten zum Testen
npm start

# Stories lesen
cat docs/stories/3.1.story.md
cat docs/stories/3.2.story.md
cat docs/stories/3.3.story.md
cat docs/stories/3.4.story.md

# Architektur-Referenz
cat docs/architecture/5-apiipc-spezifikation.md
cat docs/architecture/6-komponenten-architektur.md
cat docs/architecture/7-frontend-architektur.md
```

---

## Wichtige Dateipfade

| Typ | Pfad |
|-----|------|
| Stories | `docs/stories/` |
| Components | `src/renderer/components/` |
| UI Components | `src/renderer/components/ui/` |
| Dashboard Components | `src/renderer/components/dashboard/` |
| Settings Components | `src/renderer/components/settings/` |
| Stores | `src/renderer/stores/` |
| Utils (Renderer) | `src/renderer/utils/` |
| Utils (Shared) | `src/shared/utils/` |
| Services | `src/main/services/` |
| IPC Handlers | `src/main/ipc/handlers/` |
| Shared Types | `src/shared/types/` |
| IPC Channels | `src/shared/ipc/channels.ts` |

---

## Neue Dateien in Epic 3

### Story 3.1: Dashboard-Metriken
- `src/main/services/metricsService.ts`
- `src/main/ipc/handlers/metricsHandlers.ts`
- `src/renderer/stores/metricsStore.ts`
- `src/renderer/components/ui/MetricCard.tsx`
- `src/renderer/components/dashboard/MetricsRow.tsx`
- `src/renderer/utils/formatters.ts`

### Story 3.2: Profit/ROI-Berechnung
- `src/shared/utils/calculations.ts`
- Erweiterung: `src/shared/types/article.ts` (ArticleWithCalculations)

### Story 3.3: Einstellungen-Seite
- `src/main/ipc/handlers/appHandlers.ts`
- `src/renderer/components/settings/ThemeSelector.tsx`
- `src/renderer/components/settings/InfoSection.tsx`
- Überarbeitung: `src/renderer/components/settings/SettingsModal.tsx`

### Story 3.4: Feinschliff/UX
- `src/renderer/components/ui/Toast.tsx`
- `src/renderer/components/ui/ToastContainer.tsx`
- `src/renderer/components/ui/EmptyState.tsx`
- `src/renderer/stores/uiStore.ts`
- `resources/icon.ico`

---

## Validierungsstatus

Alle Stories wurden am 2025-12-06 validiert und freigegeben:

| Story | Readiness Score | Validierungsergebnis |
|-------|-----------------|----------------------|
| 3.1 | 10/10 | GO |
| 3.2 | 10/10 | GO |
| 3.3 | 10/10 | GO |
| 3.4 | 10/10 | GO |

---

## Nächste Schritte

1. [x] Stories 3.1-3.4 validieren (`*validate-story-draft`)
2. [x] Stories auf "Approved" setzen nach erfolgreicher Validierung
3. [ ] Dev Agent mit Implementierung beginnen lassen

---

## Nach Epic 3: MVP Complete

Nach Abschluss von Epic 3 ist der **MVP fertig**:

- [x] Epic 1: Foundation & Setup
- [x] Epic 2: Artikel-Management (CRUD)
- [ ] Epic 3: Dashboard & Berechnungen

### MVP Features (PRD FR1-FR13)

| Feature | Epic | Status |
|---------|------|--------|
| FR1: Inventar-Übersicht als Tabelle | Epic 2 | Done |
| FR2: Artikel hinzufügen | Epic 2 | Done |
| FR3: Artikel bearbeiten | Epic 2 | Done |
| FR4: Artikel löschen | Epic 2 | Done |
| FR5: Detail-Ansicht | Epic 2 | Done |
| FR6: Dashboard-Metriken | Epic 3 | 3.1 |
| FR7: Profit/ROI-Berechnung | Epic 3 | 3.2 |
| FR8: SQLite-Persistenz | Epic 1 | Done |
| FR9: Status-Enum | Epic 2 | Done |
| FR10: Kategorie-Verwaltung | Epic 2 | Done |
| FR11: Tabellen-Sortierung | Epic 2 | Done |
| FR12: Theme-Wechsel | Epic 1 | Done |
| FR13: Theme-Persistenz | Epic 1 | Done |

---

## Change Log

| Datum | Aktion | Details |
|-------|--------|---------|
| 2025-12-06 | Erstellt | Epic 3 Arbeitsplan und Stories 3.1-3.4 erstellt |
| 2025-12-06 | Validiert | Stories 3.1-3.4 validiert (alle GO) |
| 2025-12-06 | Approved | Stories 3.1-3.4 auf "Approved" gesetzt |
