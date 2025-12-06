# SimpleInv Product Requirements Document (PRD)

**Version:** 1.0
**Datum:** 06.12.2025
**Status:** Draft
**Autor:** PM John

---

## Inhaltsverzeichnis

1. [Ziele und Hintergrund-Kontext](#1-ziele-und-hintergrund-kontext)
2. [Anforderungen](#2-anforderungen)
3. [User Interface Design Goals](#3-user-interface-design-goals)
4. [Technical Assumptions](#4-technical-assumptions)
5. [Epic List](#5-epic-list)
6. [Epic Details](#6-epic-details)
7. [Checklist Results Report](#7-checklist-results-report)
8. [Next Steps](#8-next-steps)

---

## 1. Ziele und Hintergrund-Kontext

### 1.1 Ziele

- **Überblick wiedergewinnen:** Reseller soll jederzeit wissen, welche Artikel er besitzt, was sie gekostet haben und wie profitabel sie waren
- **Profit-Transparenz schaffen:** Automatische Berechnung von Profit und ROI eliminiert manuelle Kalkulationen und Schätzungen
- **Sofortige Nutzbarkeit:** Erster Artikel in unter 2 Minuten erfassbar – minimaler Lernaufwand
- **Offline-First Prinzip:** Vollständige Funktionalität ohne Internetverbindung durch lokale SQLite-Datenbank
- **Erweiterbare Basis:** Architektur ermöglicht spätere Features (Cloud-Sync, Mobile App) ohne Neuaufbau

### 1.2 Hintergrund-Kontext

SimpleInv adressiert ein systematisches Überblicksproblem von Resellern: Ungeöffnete Pakete sammeln sich an, Einkaufspreise werden vergessen, und Profit-Kalkulationen werden zur Schätzarbeit. Bestehende Lösungen wie Excel sind zu manuell, Notion zu aufwändig einzurichten, und professionelle Inventory-Software ist überdimensioniert und teuer.

Die Anwendung bildet den gesamten Artikel-Lebenszyklus ab: Einkauf → Lagerung → Listing → Verkauf → Versand. Im Zentrum steht eine cleane, Notion-inspirierte Oberfläche mit automatischen Berechnungen und Dashboard-Metriken für sofortigen Business-Überblick.

### 1.3 Change Log

| Datum | Version | Beschreibung | Autor |
|-------|---------|--------------|-------|
| 06.12.2025 | 1.0 | Initiale PRD-Erstellung | PM John |

---

## 2. Anforderungen

### 2.1 Funktionale Anforderungen (FR)

**FR1:** Das System muss eine Inventar-Übersicht als Tabelle anzeigen mit Titel, Status, Kaufpreis und Profit auf einen Blick.

**FR2:** Das System muss das Hinzufügen neuer Artikel über ein Formular ermöglichen mit folgenden Feldern: Titel (Pflicht), Kategorie (Auswahl aus benutzerdefinierten Kategorien), Status, Kaufplattform, Kaufpreis (Pflicht), Kaufdatum, Versandkosten eingehend, Verkaufsplattform, Verkaufspreis, Verkaufsdatum, Gebühren, Versandkosten ausgehend.

**FR3:** Das System muss das Bearbeiten bestehender Artikel ermöglichen, einschließlich Status-Updates (In Stock → Listed → Sold → Returned).

**FR4:** Das System muss das Löschen von Artikeln aus dem Inventar ermöglichen.

**FR5:** Das System muss eine Detail-Ansicht pro Artikel anzeigen, die durch Klick auf einen Artikel in der Übersicht erreichbar ist und alle Artikelinformationen darstellt.

**FR6:** Das System muss ein Dashboard mit folgenden Metriken anzeigen: Gesamtprofit, offener Warenwert (Summe Kaufpreise für Status In Stock + Listed), Anzahl nicht verkaufter Artikel.

**FR7:** Das System muss Profit und ROI automatisch berechnen:
- Profit = Verkaufspreis − Kaufpreis − Gebühren − Versandkosten (ein- und ausgehend)
- ROI = Profit ÷ Kaufpreis × 100 (in Prozent)

**FR8:** Das System muss alle Daten lokal in einer SQLite-Datenbank persistieren, die App-Neustarts überlebt.

**FR9:** Das System muss Artikel-Status als Enum mit den Werten "In Stock", "Listed", "Sold" und "Returned" verwalten.

**FR10:** Das System muss das Erstellen, Bearbeiten und Löschen von benutzerdefinierten Kategorien ermöglichen. Kategorien werden vom Benutzer frei definiert und stehen bei der Artikelerfassung zur Auswahl.

**FR11:** Die Inventar-Tabelle muss nach allen sichtbaren Spalten sortierbar sein (Titel, Status, Kaufpreis, Profit, Datum etc.).

**FR12:** Das System muss einen Wechsel zwischen Light Mode, Dark Mode und Custom Mode ermöglichen. Im Custom Mode kann der Benutzer eine eigene Hintergrundfarbe über einen Color Picker festlegen.

**FR13:** Die Theme-Einstellung muss persistiert werden und beim App-Neustart erhalten bleiben.

### 2.2 Nicht-Funktionale Anforderungen (NFR)

**NFR1:** Die App muss in unter 3 Sekunden starten und UI-Reaktionen müssen unter 100ms erfolgen.

**NFR2:** Die App muss vollständig offline ohne Internetverbindung funktionieren.

**NFR3:** Die App muss auf Windows 10 und Windows 11 lauffähig sein.

**NFR4:** Die SQLite-Datenbank muss im Benutzer-Datenverzeichnis (%APPDATA%/simpleinv/) gespeichert werden.

**NFR5:** Die Benutzeroberfläche muss ein cleanes, Notion-inspiriertes Design haben mit minimaler Lernkurve.

**NFR6:** Ein neuer Artikel muss in unter 30 Sekunden erfassbar sein (Standardfall).

**NFR7:** Der Inventar-Status muss in unter 5 Sekunden erfassbar sein (visueller Scan).

**NFR8:** Die App muss TypeScript für Typsicherheit verwenden.

**NFR9:** Die Architektur muss erweiterbar sein für zukünftige Features wie Cloud-Sync oder Mobile App ohne komplettes Refactoring.

---

## 3. User Interface Design Goals

### 3.1 Overall UX Vision

Eine minimalistische, Notion-inspirierte Desktop-Anwendung, die sofortigen Überblick bietet ohne visuelle Überladung. Die App fühlt sich an wie ein persönlicher Assistent – aufgeräumt, schnell und intuitiv. Der Fokus liegt auf Klarheit: Wichtige Informationen (Profit, Status, Artikelanzahl) sind sofort sichtbar, Details nur einen Klick entfernt.

### 3.2 Key Interaction Paradigms

- **Zwei-Ebenen-Navigation:** Übersicht (Tabelle) → Detail (Klick auf Artikel)
- **Inline-Editing:** Schnelle Status-Änderungen direkt in der Tabelle wo möglich
- **Modal-Dialoge:** Artikel hinzufügen/bearbeiten in übersichtlichen Formularen
- **Dashboard-First:** App startet mit Metriken-Überblick und Inventar-Tabelle auf einer Seite
- **Minimale Klicks:** Häufigste Aktionen (Artikel hinzufügen, Status ändern) in maximal 2 Klicks erreichbar

### 3.3 Core Screens and Views

| Screen | Beschreibung |
|--------|--------------|
| **Dashboard/Hauptansicht** | Kombinierte Ansicht mit Metriken-Karten oben (Gesamtprofit, offener Warenwert, Artikelanzahl) und sortierbare Inventar-Tabelle darunter |
| **Artikel-Detail-Modal** | Vollständige Artikelinformationen in einem Modal/Slide-Over Panel |
| **Artikel-Formular** | Modal für Hinzufügen/Bearbeiten mit allen Feldern in logischen Gruppen (Basis, Einkauf, Verkauf) |
| **Kategorie-Verwaltung** | Einfache Liste mit Hinzufügen/Bearbeiten/Löschen für benutzerdefinierte Kategorien |
| **Einstellungen** | Theme-Auswahl (Light/Dark/Custom) mit Farbwähler für benutzerdefinierte Hintergrundfarbe |

### 3.4 Accessibility

**Stufe:** Keine formalen WCAG-Anforderungen für MVP

*Begründung: Einzelnutzer-App für eigenen Gebrauch. Barrierefreiheit kann in späteren Versionen ergänzt werden.*

### 3.5 Branding

- **Theme-System:**
  - Light Mode (Standard): Weiß/Hellgrau-Hintergründe
  - Dark Mode: Dunkle Hintergründe mit heller Schrift
  - Custom Mode: Benutzer wählt eigene Hintergrundfarbe via Color Picker
- **Theme-Wechsel:** Einfacher Toggle in der App-Leiste oder Einstellungen
- **Typografie:** System-Fonts für native Performance (Inter oder ähnlich als Fallback)
- **Visuelle Sprache:** Notion-inspiriert – viel Whitespace, subtile Borders, keine schweren Schatten
- **Status-Farben:**
  - In Stock: Blau/Neutral
  - Listed: Gelb/Orange
  - Sold: Grün
  - Returned: Rot

### 3.6 Target Device and Platforms

**Plattform:** Desktop Only (Windows 10/11)

- Optimiert für Bildschirmauflösungen ab 1280x720
- Keine Mobile-Responsiveness im MVP erforderlich
- Electron-basiert mit nativen Windows-Fenster-Kontrollen

---

## 4. Technical Assumptions

### 4.1 Repository Structure

**Struktur:** Monorepo

```
simpleinv/
├── src/
│   ├── main/           # Electron Main Process
│   │   ├── database/   # SQLite Setup & Migrations
│   │   └── ipc/        # IPC Handler für DB-Operationen
│   ├── renderer/       # React Frontend
│   │   ├── components/ # UI-Komponenten
│   │   ├── pages/      # Dashboard, Inventory, Detail
│   │   ├── hooks/      # Custom Hooks (useArticles, etc.)
│   │   ├── services/   # API-Abstraction (IPC Calls)
│   │   └── types/      # TypeScript Interfaces
│   └── shared/         # Gemeinsame Typen/Utils
├── public/
└── package.json
```

*Begründung: Einfachste Struktur für eine Desktop-App. Frontend und Backend (Electron Main) teilen sich ein Repository.*

### 4.2 Service Architecture

**Architektur:** Monolith (Offline-First Desktop-App)

| Schicht | Technologie | Beschreibung |
|---------|-------------|--------------|
| **Desktop Runtime** | Electron | Cross-Platform Desktop Framework |
| **Frontend** | React 18+ | Komponentenbasiertes UI |
| **Styling** | TailwindCSS | Utility-First CSS Framework |
| **State Management** | React Context oder Zustand | Leichtgewichtig, kein Redux-Overhead |
| **Build Tool** | Vite (electron-vite) | Schnelles HMR, modernes Tooling |
| **Sprache** | TypeScript | Typsicherheit über das gesamte Projekt |
| **Lokale Datenbank** | SQLite (better-sqlite3) | Synchron, schnell, im Main Process |
| **IPC** | Electron IPC | Kommunikation Renderer ↔ Main Process |

**Architektur-Diagramm:**

```
┌─────────────────────────────────────────────────────────────┐
│                      SIMPLEINV APP                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │   React UI  │◄──►│   Service   │◄──►│  SQLite (lokal) │  │
│  │  (Renderer) │    │   Layer     │    │   better-sqlite3│  │
│  │  + Tailwind │    │   (IPC)     │    │   %APPDATA%     │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

*Begründung: Offline-First Priorität. Keine Server-Komponente nötig. SQLite im Main Process für direkte, synchrone Datenbankzugriffe.*

### 4.3 Testing Requirements

**Strategie:** Minimales Testing für MVP

| Test-Typ | MVP | Post-MVP |
|----------|-----|----------|
| Unit Tests | ❌ Nein | ✅ Ja |
| Integration Tests | ❌ Nein | ✅ Ja |
| E2E Tests | ❌ Nein | ✅ Ja |
| Manuelles Testing | ✅ Ja | ✅ Ja |

*Begründung: 2-Tage-Timeline erlaubt keine Test-Infrastruktur. Kritische Pfade werden manuell getestet. Architektur sollte testbar sein für spätere Test-Integration.*

### 4.4 Additional Technical Assumptions and Requests

**Datenbank & Persistenz:**
- SQLite-Datei wird in `%APPDATA%/simpleinv/data.db` gespeichert
- Theme-Einstellungen werden in derselben Datenbank oder separater Config-Datei persistiert
- Keine Migrationen im MVP – Schema wird einmalig erstellt
- Backup = manuelles Kopieren der SQLite-Datei

**Electron-Spezifisch:**
- electron-vite als Boilerplate/Build-Tool
- better-sqlite3 für synchrone DB-Operationen im Main Process
- Context Isolation aktiviert (Sicherheit)
- Preload Scripts für sichere IPC-Kommunikation

**Frontend-Spezifisch:**
- TailwindCSS für schnelles Styling inkl. Dark Mode Utilities
- Tabellen-Komponente: TanStack Table (ehemals React Table) für Sortierung
- Color Picker: Native HTML5 Input oder kleine Library (z.B. react-colorful)
- Keine Router-Library nötig (Single-Page mit Modals)

**Performance:**
- App-Start < 3 Sekunden
- UI-Reaktionen < 100ms
- SQLite kann 1000+ Artikel problemlos handeln

**Sicherheit:**
- Keine sensiblen Daten (keine Passwörter, keine Zahlungsdaten)
- Daten bleiben lokal – keine Übertragung an Dritte
- SQLite-Verschlüsselung (SQLCipher) optional für später

---

## 5. Epic List

| Epic | Titel | Ziel |
|------|-------|------|
| **Epic 1** | Foundation & Projekt-Setup | Funktionierende Electron-App mit SQLite-Datenbank, Theme-System und grundlegender UI-Struktur als Basis für alle weiteren Features |
| **Epic 2** | Artikel-Management (CRUD) | Vollständige Verwaltung von Artikeln: Hinzufügen, Anzeigen, Bearbeiten und Löschen mit allen Datenfeldern |
| **Epic 3** | Dashboard & Berechnungen | Automatische Profit/ROI-Berechnungen und Dashboard-Metriken für sofortigen Business-Überblick |

---

## 6. Epic Details

### 6.1 Epic 1: Foundation & Projekt-Setup

**Ziel:** Etabliere eine funktionsfähige Electron-Anwendung mit SQLite-Datenbank, Theme-System und grundlegender UI-Struktur. Am Ende dieses Epics startet die App, zeigt ein leeres Dashboard-Layout und speichert Theme-Einstellungen persistent.

---

#### Story 1.1: Electron-Projekt initialisieren

**Als** Entwickler,
**möchte ich** ein funktionierendes Electron-Projekt mit Vite und React aufsetzen,
**damit** ich eine solide Basis für die weitere Entwicklung habe.

**Akzeptanzkriterien:**

1. Projekt ist mit electron-vite initialisiert und startet ohne Fehler
2. React 18+ ist im Renderer-Prozess konfiguriert
3. TypeScript ist für Main und Renderer konfiguriert mit strikten Einstellungen
4. Hot Module Replacement (HMR) funktioniert für den Renderer
5. Build-Prozess erstellt eine lauffähige Windows-Executable
6. Basis-Ordnerstruktur ist angelegt (src/main, src/renderer, src/shared)

---

#### Story 1.2: SQLite-Datenbank integrieren

**Als** Entwickler,
**möchte ich** eine SQLite-Datenbank im Main Process einrichten,
**damit** Daten lokal persistiert werden können.

**Akzeptanzkriterien:**

1. better-sqlite3 ist installiert und funktioniert im Main Process
2. Datenbank-Datei wird in `%APPDATA%/simpleinv/data.db` erstellt
3. Datenbank-Schema für Artikel ist definiert und wird beim ersten Start erstellt:
   - id (INTEGER PRIMARY KEY)
   - title (TEXT NOT NULL)
   - category_id (INTEGER, FK)
   - status (TEXT: 'in_stock' | 'listed' | 'sold' | 'returned')
   - purchase_platform, purchase_price, purchase_date, shipping_cost_in
   - sale_platform, sale_price, sale_date, fees, shipping_cost_out
   - created_at, updated_at
4. Datenbank-Schema für Kategorien ist definiert:
   - id (INTEGER PRIMARY KEY)
   - name (TEXT NOT NULL UNIQUE)
5. Datenbank-Schema für Settings ist definiert:
   - key (TEXT PRIMARY KEY)
   - value (TEXT)
6. IPC-Handler für Datenbank-Operationen sind vorbereitet (Grundstruktur)

---

#### Story 1.3: IPC-Kommunikation einrichten

**Als** Entwickler,
**möchte ich** eine typsichere IPC-Kommunikation zwischen Renderer und Main Process,
**damit** das Frontend sicher auf die Datenbank zugreifen kann.

**Akzeptanzkriterien:**

1. Preload-Script ist konfiguriert mit Context Isolation
2. IPC-Channels sind typisiert in src/shared/ipc-types.ts
3. Mindestens ein Test-Channel funktioniert (z.B. "ping" → "pong")
4. API ist im Renderer über window.api verfügbar
5. Fehlerbehandlung für IPC-Aufrufe ist implementiert

---

#### Story 1.4: TailwindCSS und Basis-Layout

**Als** Benutzer,
**möchte ich** eine saubere, Notion-inspirierte Benutzeroberfläche sehen,
**damit** die App professionell und aufgeräumt wirkt.

**Akzeptanzkriterien:**

1. TailwindCSS ist konfiguriert und funktioniert
2. Basis-Layout ist implementiert: Header/App-Bar, Main Content Area
3. Platzhalter für Dashboard-Metriken (3 leere Karten) sind sichtbar
4. Platzhalter für Inventar-Tabelle ist sichtbar
5. "Artikel hinzufügen" Button ist sichtbar (noch ohne Funktion)
6. App verwendet System-Fonts und hat cleanes, minimalistisches Design
7. Layout ist für Mindestauflösung 1280x720 optimiert

---

#### Story 1.5: Theme-System implementieren

**Als** Benutzer,
**möchte ich** zwischen Light Mode, Dark Mode und einer eigenen Hintergrundfarbe wählen,
**damit** ich die App an meine Vorlieben anpassen kann.

**Akzeptanzkriterien:**

1. Theme-Toggle ist in der App-Bar sichtbar (Light/Dark/Custom)
2. Light Mode zeigt helle Hintergründe mit dunkler Schrift
3. Dark Mode zeigt dunkle Hintergründe mit heller Schrift
4. Custom Mode zeigt einen Color Picker für die Hintergrundfarbe
5. Textfarben passen sich automatisch an für ausreichenden Kontrast
6. Gewähltes Theme wird in der Datenbank (Settings-Tabelle) persistiert
7. Beim App-Start wird das gespeicherte Theme geladen und angewendet
8. Theme-Wechsel erfolgt ohne App-Neustart (reaktiv)

---

### 6.2 Epic 2: Artikel-Management (CRUD)

**Ziel:** Vollständige Verwaltung von Artikeln und Kategorien: Der Benutzer kann Artikel hinzufügen, in einer sortierbaren Tabelle anzeigen, Details einsehen, bearbeiten und löschen. Kategorien können selbst erstellt und verwaltet werden.

---

#### Story 2.1: Kategorie-Verwaltung

**Als** Benutzer,
**möchte ich** eigene Kategorien erstellen, bearbeiten und löschen,
**damit** ich meine Artikel sinnvoll gruppieren kann.

**Akzeptanzkriterien:**

1. Kategorie-Verwaltung ist über einen Menüpunkt/Button erreichbar
2. Liste aller vorhandenen Kategorien wird angezeigt
3. Neue Kategorie kann über ein Eingabefeld hinzugefügt werden
4. Bestehende Kategorie kann umbenannt werden (Inline-Edit oder Modal)
5. Kategorie kann gelöscht werden mit Bestätigungsdialog
6. Beim Löschen einer Kategorie werden zugehörige Artikel auf "Keine Kategorie" gesetzt (nicht gelöscht)
7. Doppelte Kategorienamen werden verhindert (Validierung)
8. Änderungen werden sofort in der Datenbank persistiert

---

#### Story 2.2: Artikel hinzufügen

**Als** Benutzer,
**möchte ich** einen neuen Artikel mit allen relevanten Daten erfassen,
**damit** ich mein Inventar aufbauen kann.

**Akzeptanzkriterien:**

1. "Artikel hinzufügen" Button öffnet ein Modal-Formular
2. Formular enthält alle Felder in logischen Gruppen:
   - **Basis:** Titel (Pflicht), Kategorie (Dropdown), Status (Dropdown)
   - **Einkauf:** Kaufplattform, Kaufpreis (Pflicht), Kaufdatum, Versandkosten eingehend
   - **Verkauf:** Verkaufsplattform, Verkaufspreis, Verkaufsdatum, Gebühren, Versandkosten ausgehend
3. Status-Dropdown zeigt: "In Stock", "Listed", "Sold", "Returned"
4. Kategorie-Dropdown zeigt alle benutzerdefinierten Kategorien + "Keine Kategorie"
5. Pflichtfelder werden validiert (Titel nicht leer, Kaufpreis > 0)
6. "Speichern" Button erstellt den Artikel in der Datenbank
7. Nach erfolgreichem Speichern schließt das Modal und die Tabelle aktualisiert sich
8. "Abbrechen" Button schließt das Modal ohne zu speichern

---

#### Story 2.3: Inventar-Tabelle mit Sortierung

**Als** Benutzer,
**möchte ich** alle meine Artikel in einer übersichtlichen, sortierbaren Tabelle sehen,
**damit** ich schnell den Überblick behalte.

**Akzeptanzkriterien:**

1. Tabelle zeigt alle Artikel aus der Datenbank
2. Sichtbare Spalten: Titel, Kategorie, Status, Kaufpreis, Verkaufspreis, Profit
3. Profit wird berechnet angezeigt (nicht in DB gespeichert): Verkaufspreis − Kaufpreis − Gebühren − Versandkosten
4. Bei Artikeln ohne Verkaufspreis wird Profit als "–" oder leer angezeigt
5. Jede Spalte ist durch Klick auf den Header sortierbar (aufsteigend/absteigend)
6. Sortierrichtung wird durch Icon im Header angezeigt (▲/▼)
7. Status wird farblich hervorgehoben (In Stock: Blau, Listed: Orange, Sold: Grün, Returned: Rot)
8. Tabelle verwendet TanStack Table für Sortierlogik
9. Bei leerer Tabelle wird eine freundliche "Keine Artikel vorhanden" Nachricht angezeigt

---

#### Story 2.4: Artikel-Detail-Ansicht

**Als** Benutzer,
**möchte ich** alle Details eines Artikels auf einen Blick sehen,
**damit** ich vollständige Informationen erhalte ohne die Tabelle zu überladen.

**Akzeptanzkriterien:**

1. Klick auf eine Tabellenzeile öffnet ein Detail-Modal/Side-Panel
2. Alle Artikelfelder werden übersichtlich gruppiert angezeigt (Basis, Einkauf, Verkauf)
3. Berechnete Werte werden angezeigt: Profit und ROI (in Prozent)
4. ROI-Berechnung: (Profit ÷ Kaufpreis) × 100, gerundet auf 2 Dezimalstellen
5. Bei fehlendem Verkaufspreis werden Profit und ROI als "Noch nicht verkauft" angezeigt
6. "Bearbeiten" Button ist sichtbar und führt zum Bearbeiten-Formular
7. "Löschen" Button ist sichtbar
8. "Schließen" Button oder Klick außerhalb schließt die Detail-Ansicht

---

#### Story 2.5: Artikel bearbeiten

**Als** Benutzer,
**möchte ich** bestehende Artikel-Daten ändern und den Status aktualisieren,
**damit** ich den Artikel-Lebenszyklus abbilden kann.

**Akzeptanzkriterien:**

1. "Bearbeiten" Button (aus Detail-Ansicht) öffnet das Artikel-Formular vorausgefüllt
2. Alle Felder sind editierbar
3. Typischer Flow: Status von "In Stock" → "Listed" → "Sold" mit Verkaufsdaten
4. Validierung wie beim Hinzufügen (Pflichtfelder)
5. "Speichern" aktualisiert den Artikel in der Datenbank
6. updated_at Timestamp wird automatisch aktualisiert
7. Nach Speichern schließt das Modal und Tabelle + Detail-Ansicht aktualisieren sich
8. "Abbrechen" verwirft Änderungen

---

#### Story 2.6: Artikel löschen

**Als** Benutzer,
**möchte ich** Artikel aus meinem Inventar entfernen,
**damit** ich meine Daten sauber halten kann.

**Akzeptanzkriterien:**

1. "Löschen" Button (aus Detail-Ansicht) zeigt einen Bestätigungsdialog
2. Dialog zeigt Artikeltitel und fragt "Artikel wirklich löschen?"
3. "Ja, löschen" entfernt den Artikel permanent aus der Datenbank
4. "Abbrechen" schließt den Dialog ohne Aktion
5. Nach Löschen schließt die Detail-Ansicht und die Tabelle aktualisiert sich
6. Erfolgsmeldung oder visuelle Bestätigung wird kurz angezeigt (optional: Toast)

---

### 6.3 Epic 3: Dashboard & Berechnungen

**Ziel:** Automatische Profit- und ROI-Berechnungen sowie ein Dashboard mit Metriken bieten dem Benutzer sofortigen Überblick über seinen Business-Status. Am Ende dieses Epics sieht der Benutzer auf einen Blick: Gesamtprofit, offener Warenwert und Anzahl nicht verkaufter Artikel.

---

#### Story 3.1: Dashboard-Metriken implementieren

**Als** Benutzer,
**möchte ich** auf dem Dashboard sofort meinen Gesamtprofit, offenen Warenwert und Artikelanzahl sehen,
**damit** ich meinen Business-Status in Sekunden erfassen kann.

**Akzeptanzkriterien:**

1. Dashboard zeigt 3 Metriken-Karten oberhalb der Inventar-Tabelle
2. **Karte 1 - Gesamtprofit:** Summe aller Profits von verkauften Artikeln (Status: "Sold")
   - Profit pro Artikel = Verkaufspreis − Kaufpreis − Gebühren − Versandkosten (ein + aus)
   - Formatierung als Währung (z.B. "€ 234,50")
   - Positive Werte in Grün, negative in Rot
3. **Karte 2 - Offener Warenwert:** Summe aller Kaufpreise von nicht verkauften Artikeln (Status: "In Stock" + "Listed")
   - Formatierung als Währung
4. **Karte 3 - Nicht verkaufte Artikel:** Anzahl der Artikel mit Status "In Stock" oder "Listed"
   - Formatierung als Ganzzahl
5. Metriken aktualisieren sich automatisch bei Änderungen an Artikeln (hinzufügen, bearbeiten, löschen)
6. Bei leerer Datenbank zeigen alle Metriken "€ 0,00" bzw. "0"
7. Karten haben ein ansprechendes Design passend zum gewählten Theme

---

#### Story 3.2: Profit- und ROI-Berechnung finalisieren

**Als** Benutzer,
**möchte ich** dass Profit und ROI korrekt und konsistent berechnet werden,
**damit** ich meine echte Marge kenne.

**Akzeptanzkriterien:**

1. Profit-Berechnung ist einheitlich in der gesamten App:
   - `Profit = Verkaufspreis − Kaufpreis − Gebühren − Versandkosten_ein − Versandkosten_aus`
2. ROI-Berechnung ist einheitlich:
   - `ROI = (Profit ÷ Kaufpreis) × 100`
   - Gerundet auf 2 Dezimalstellen
   - Anzeige mit %-Zeichen (z.B. "45,23%")
3. Berechnungen werden NICHT in der Datenbank gespeichert (immer live berechnet)
4. Bei fehlenden Werten (null/undefined):
   - Fehlende Gebühren/Versandkosten werden als 0 behandelt
   - Fehlender Verkaufspreis: Profit und ROI werden als "–" angezeigt
5. Negative Profits werden korrekt berechnet und rot dargestellt
6. Berechnungslogik ist in einer wiederverwendbaren Utility-Funktion gekapselt
7. Tabelle und Detail-Ansicht verwenden dieselbe Berechnungslogik

---

#### Story 3.3: Einstellungen-Seite

**Als** Benutzer,
**möchte ich** eine dedizierte Einstellungen-Seite haben,
**damit** ich Theme und andere Optionen zentral verwalten kann.

**Akzeptanzkriterien:**

1. Einstellungen sind über ein Zahnrad-Icon in der App-Bar erreichbar
2. Einstellungen öffnen sich als Modal oder eigener Bereich
3. **Theme-Sektion:**
   - Radio-Buttons oder Segmented Control für Light/Dark/Custom
   - Bei Custom: Color Picker für Hintergrundfarbe wird eingeblendet
   - Vorschau der Farbänderung in Echtzeit
4. **Info-Sektion:**
   - App-Version anzeigen
   - Speicherort der Datenbank anzeigen (%APPDATA%/simpleinv/)
5. Änderungen werden automatisch gespeichert (keine "Speichern"-Button nötig)
6. "Schließen" Button kehrt zum Dashboard zurück

---

#### Story 3.4: Feinschliff und UX-Verbesserungen

**Als** Benutzer,
**möchte ich** eine polierte, konsistente Benutzererfahrung,
**damit** die App professionell wirkt und Spaß macht zu benutzen.

**Akzeptanzkriterien:**

1. Ladezeiten: App startet in unter 3 Sekunden, UI reagiert in unter 100ms
2. Leere Zustände: Freundliche Nachrichten wenn keine Artikel/Kategorien vorhanden
3. Erfolgs-Feedback: Toast-Benachrichtigungen bei Aktionen (Artikel gespeichert, gelöscht, etc.)
4. Fehler-Feedback: Verständliche Fehlermeldungen bei Validierungsfehlern
5. Tastatur-Navigation: Tab-Reihenfolge ist logisch, Enter bestätigt Dialoge
6. Konsistente Abstände und Typografie über die gesamte App
7. Hover-Zustände für klickbare Elemente
8. Fokus-Indikatoren für Accessibility-Grundlagen
9. App-Icon ist gesetzt (kann Platzhalter sein)

---

## 7. Checklist Results Report

### Executive Summary

| Metrik | Bewertung |
|--------|-----------|
| **Gesamt-Vollständigkeit PRD** | ~92% |
| **MVP Scope Angemessenheit** | ✅ Genau richtig |
| **Bereitschaft für Architektur-Phase** | ✅ Bereit |
| **Kritischste Lücken** | Keine Blocker – kleinere Verbesserungen möglich |

### Category Analysis Table

| Kategorie | Status | Kritische Probleme |
|-----------|--------|-------------------|
| 1. Problem Definition & Context | ✅ **PASS** | Keine – gut dokumentiert in Brief + PRD |
| 2. MVP Scope Definition | ✅ **PASS** | Keine – klare In/Out-of-Scope Abgrenzung |
| 3. User Experience Requirements | ✅ **PASS** | Keine – Core Screens und Flows definiert |
| 4. Functional Requirements | ✅ **PASS** | Keine – 13 FRs vollständig und testbar |
| 5. Non-Functional Requirements | ✅ **PASS** | Keine – 9 NFRs mit konkreten Werten |
| 6. Epic & Story Structure | ✅ **PASS** | Keine – 3 Epics, 15 Stories, alle mit ACs |
| 7. Technical Guidance | ✅ **PASS** | Keine – Tech-Stack und Architektur klar |
| 8. Cross-Functional Requirements | ⚠️ **PARTIAL** | Daten-Schema vorhanden, aber keine Migrations-Strategie |
| 9. Clarity & Communication | ✅ **PASS** | Keine – konsistente Sprache, gut strukturiert |

### Top Issues by Priority

**BLOCKERS:** Keine

**HIGH:** Keine

**MEDIUM:**
- Migrations-Strategie für Post-MVP Schema-Änderungen nicht dokumentiert
- Backup-Strategie nur manuell (manuelles Kopieren der SQLite-Datei)

**LOW:**
- Stakeholder-Alignment nicht formal dokumentiert (nicht relevant für Solo-Projekt)

### Final Decision

✅ **READY FOR ARCHITECT** – Das PRD ist umfassend, gut strukturiert und bereit für die architektonische Gestaltung.

---

## 8. Next Steps

### 8.1 UX Expert Prompt

> Bitte überprüfe das PRD für SimpleInv (docs/prd.md) und erstelle basierend auf den UI Design Goals (Abschnitt 3) detaillierte Wireframes oder UI-Spezifikationen. Fokussiere auf das Notion-inspirierte Design, das Theme-System (Light/Dark/Custom) und die Zwei-Ebenen-Navigation (Dashboard mit Tabelle → Detail-Modal).

### 8.2 Architect Prompt

> Bitte starte den Architecture Creation Mode für SimpleInv. Verwende das PRD (docs/prd.md) als Input und erstelle eine detaillierte technische Architektur. Fokussiere auf: Electron + React + TypeScript Setup mit electron-vite, SQLite-Integration mit better-sqlite3, IPC-Kommunikation und die Ordnerstruktur gemäß Abschnitt 4.1.

---

*Erstellt mit BMAD-METHOD Framework*
*PM Agent: John*
