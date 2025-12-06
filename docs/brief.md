# Project Brief: SimpleInv

**Version:** 1.0
**Datum:** 06.12.2024
**Status:** Abgeschlossen

---

## Executive Summary

**SimpleInv** ist eine Windows-Desktop-Anwendung für Reseller, die ihr physisches Inventar, Einkäufe und Verkäufe an einem Ort verwalten möchten.

**Primäres Problem:** Reseller verlieren den Überblick über ihre Artikel – ungeöffnete Pakete werden vergessen, Einkaufspreise gehen verloren, und Profit-Kalkulationen werden zur Schätzarbeit.

**Zielmarkt:** Einzelpersonen, die auf Plattformen wie eBay, Vinted oder Kleinanzeigen Artikel weiterverkaufen – vom Gelegenheitsverkäufer bis zum ambitionierten Nebenerwerb.

**Kernwertversprechen:** Sofortiger Überblick über Inventar und Profite durch automatische Berechnungen, lokale Datenspeicherung (Offline-First) und ein cleanes, Notion-inspiriertes UI.

---

## Problem Statement

### Aktueller Zustand & Schmerzpunkte

Reseller stehen vor einem systematischen Überblicksproblem:

| Problem | Auswirkung |
|---------|------------|
| **Ungeöffnete Pakete sammeln sich an** | Vergessen, was bestellt wurde; Artikel liegen monatelang ungenutzt |
| **Kein zentrales Inventar** | Mentale Liste führt zu verpassten Verkaufschancen |
| **Einkaufspreise vergessen** | Profit-Kalkulation wird zur Schätzung; echte Marge unklar |
| **Zeit beim Suchen verloren** | Ineffizienz und Frustration beim Wiederfinden von Artikeln |

### Auswirkung des Problems

- **Finanziell:** Artikel werden unter Wert verkauft, weil der Einkaufspreis unbekannt ist
- **Zeitlich:** Mehrere Minuten bis Stunden pro Woche für Suchen und Nachdenken verschwendet
- **Emotional:** Frustration und das Gefühl, das eigene "Geschäft" nicht im Griff zu haben

### Warum bestehende Lösungen versagen

| Lösung | Schwäche |
|--------|----------|
| **Excel/Google Sheets** | Manuell, keine automatischen Berechnungen, kein schönes UI |
| **Notion** | Flexibel aber aufwändig einzurichten, keine spezialisierten Reseller-Features |
| **Professionelle Inventory-Software** | Überdimensioniert, teuer, für Unternehmen konzipiert |
| **Mental/Papier** | Skaliert nicht, fehleranfällig |

### Dringlichkeit

Das Problem verschärft sich mit jedem neuen Artikel. Je größer das Inventar, desto größer der Kontrollverlust. Ein funktionierendes System jetzt aufzubauen verhindert zukünftiges Chaos.

---

## Proposed Solution

### Kernkonzept

**SimpleInv** ist eine schlanke Desktop-Anwendung, die den gesamten Artikel-Lebenszyklus eines Resellers abbildet:

```
[EINKAUF] → [LAGERUNG] → [LISTING] → [VERKAUF] → [VERSAND]
```

Jeder Artikel wird mit allen relevanten Daten erfasst, automatisch berechnet und lokal gespeichert.

### Lösungsansatz

| Komponente | Beschreibung |
|------------|--------------|
| **Zentrale Inventar-Tabelle** | Alle Artikel auf einen Blick mit Status, Kaufpreis, Profit |
| **Zwei-Ebenen-Ansicht** | Übersicht (Liste) → Detail (Klick) für tiefere Informationen |
| **Auto-Berechnungen** | Profit & ROI werden automatisch kalkuliert |
| **Dashboard-Metriken** | Gesamtprofit, offener Warenwert, Anzahl Artikel |
| **Offline-First** | Daten lokal in SQLite, keine Internetverbindung nötig |

### Differenzierung

| SimpleInv | Konkurrenz |
|-----------|------------|
| **Speziell für Reseller** | Generische Inventory-Tools |
| **Cleanes, Notion-inspiriertes UI** | Überladene Enterprise-Interfaces |
| **Automatische Profit-Kalkulation** | Manuelle Formeln in Spreadsheets |
| **Sofort nutzbar** | Aufwändige Einrichtung bei flexiblen Tools |
| **Offline-First** | Cloud-Abhängigkeit bei SaaS-Lösungen |

### Warum diese Lösung erfolgreich sein wird

1. **Fokus:** Löst genau ein Problem sehr gut, statt viele mittelmäßig
2. **Einfachheit:** Minimaler Lernaufwand durch intuitive Oberfläche
3. **Sofortiger Mehrwert:** Erster Artikel kann in unter 1 Minute hinzugefügt werden
4. **Erweiterbar:** Architektur ermöglicht spätere Features ohne Neuaufbau

### High-Level Vision

Eine App, die sich anfühlt wie ein persönlicher Assistent für das Reselling-Business – immer wissen, was man hat, was es wert ist, und wie viel man verdient hat.

---

## Target Users

### Primäres Nutzersegment: Der Hobby-Reseller

| Merkmal | Beschreibung |
|---------|--------------|
| **Profil** | Einzelperson, 18-40 Jahre, technikaffin, Windows-Nutzer |
| **Inventar-Größe** | 5-50 Artikel gleichzeitig |
| **Motivation** | Nebeneinkommen, Spaß am Handeln, Schnäppchenjagd |
| **Verkaufsplattformen** | eBay, Vinted, Kleinanzeigen |
| **Einkaufsquellen** | Amazon Deals, Hersteller-Sales, Restposten, mydealz-Finds |

**Aktuelle Verhaltensweisen & Workflows:**
- Kauft impulsiv bei guten Deals, auch ohne sofortigen Verkaufsplan
- Lagert Artikel zu Hause (Schrank, Regal, Keller)
- Listet manuell auf verschiedenen Plattformen
- Trackt Verkäufe mental oder gar nicht
- Berechnet Profit im Kopf oder per Taschenrechner

**Spezifische Bedürfnisse & Schmerzpunkte:**
- Braucht schnellen Überblick: "Was habe ich eigentlich alles?"
- Will wissen: "Lohnt sich das überhaupt?" (Profit-Klarheit)
- Hasst manuelle Dateneingabe – je weniger Klicks, desto besser
- Möchte sich organisiert fühlen, ohne viel Aufwand

**Ziele:**
- Reselling profitabel und organisiert betreiben
- Zeit sparen beim Verwalten
- Überblick behalten, auch wenn das Inventar wächst
- Irgendwann vielleicht skalieren

### Sekundäres Nutzersegment: Der ambitionierte Side-Hustler

| Merkmal | Beschreibung |
|---------|--------------|
| **Profil** | Einzelperson mit Wachstumsambitionen |
| **Inventar-Größe** | 50-200+ Artikel |
| **Motivation** | Ernsthafter Nebenerwerb, möglicherweise Vollzeit-Ziel |
| **Besonderheiten** | Höhere Anforderungen an Effizienz und Skalierbarkeit |

**Zusätzliche Bedürfnisse:**
- Bulk-Import für viele Artikel
- Steuer-relevante Exports
- Multi-Device-Zugriff (unterwegs Inventar checken)
- Eventuell API-Integrationen

*Hinweis: Dieses Segment ist für Post-MVP relevant – die Architektur sollte Skalierung ermöglichen.*

---

## Goals & Success Metrics

### Business Objectives

- **MVP bis Montag funktionsfähig:** Vollständige CRUD-Funktionalität für Artikel mit Dashboard
- **Selbstnutzung als Validierung:** App wird vom Entwickler selbst aktiv für Reselling genutzt
- **Erweiterbare Codebasis:** Architektur ermöglicht einfaches Hinzufügen von Features ohne Refactoring
- **Lerneffekt maximieren:** Praktische Erfahrung mit Electron, React und SQLite sammeln

### User Success Metrics

| Metrik | Ziel |
|--------|------|
| **Time-to-First-Article** | < 2 Minuten vom App-Start bis erster Artikel gespeichert |
| **Artikel-Erfassungszeit** | < 30 Sekunden pro Artikel (Standardfall) |
| **Überblick-Geschwindigkeit** | Inventar-Status in < 5 Sekunden erfassbar |
| **Fehlerfreie Profit-Berechnung** | 100% korrekte automatische Kalkulationen |

### Key Performance Indicators (KPIs)

| KPI | Definition & Ziel |
|-----|-------------------|
| **Artikel erfasst** | Anzahl der Artikel im System – Ziel: Alle aktuellen Artikel (~5-10) innerhalb der ersten Woche erfasst |
| **Tägliche Nutzung** | App wird mindestens 1x täglich geöffnet innerhalb der ersten 2 Wochen |
| **Profit-Klarheit** | Nutzer kann jederzeit den Gesamtprofit auf < 5€ genau benennen |
| **Keine Workarounds** | Nutzer greift nicht auf Excel/Notion zurück für Tracking |
| **Bug-Freiheit** | Keine kritischen Bugs, die die Kernfunktionalität blockieren |

---

## MVP Scope

### Core Features (Must Have)

| Feature | Beschreibung & Begründung |
|---------|---------------------------|
| **Inventar-Übersicht** | Tabelle mit allen Artikeln – zeigt Titel, Status, Kaufpreis, Profit auf einen Blick. *Löst das Kernproblem: Überblick.* |
| **Artikel hinzufügen** | Formular mit allen Feldern (Titel, Kategorie, Status, Kaufdaten, Verkaufsdaten). *Grundfunktion für Dateneingabe.* |
| **Artikel bearbeiten** | Bestehende Artikel-Daten ändern, Status updaten (z.B. "In Stock" → "Sold"). *Artikel-Lebenszyklus abbilden.* |
| **Artikel löschen** | Artikel aus dem Inventar entfernen. *Notwendig für Datenhygiene.* |
| **Detail-Ansicht** | Klick auf Artikel zeigt alle Informationen. *Zwei-Ebenen-Ansicht für cleane Übersicht.* |
| **Dashboard-Metriken** | Gesamtprofit, offener Warenwert, Anzahl nicht verkaufter Artikel. *Sofortiger Business-Überblick.* |
| **Auto-Berechnung** | Profit = Verkaufspreis − Kaufpreis − Gebühren − Versand; ROI = Profit ÷ Kaufpreis. *Eliminiert manuelle Kalkulation.* |
| **Lokale Datenspeicherung** | Daten in SQLite gespeichert. *Offline-First, keine Internetabhängigkeit.* |

### Artikel-Datenmodell (MVP)

```
ARTIKEL
├── Titel (string, required)
├── Kategorie (string, optional)
├── Status (enum: In Stock | Listed | Sold | Returned)
├── Kaufplattform (string)
├── Kaufpreis (number, required)
├── Kaufdatum (date)
├── Versandkosten eingehend (number)
├── Verkaufsplattform (string)
├── Verkaufspreis (number)
├── Verkaufsdatum (date)
├── Gebühren (number)
├── Versandkosten ausgehend (number)
└── [Auto] Profit, ROI
```

### Out of Scope für MVP

| Feature | Warum nicht im MVP |
|---------|-------------------|
| Bilder hochladen | Nice-to-have, erhöht Komplexität |
| Watchlist (Pre-Purchase) | Zusätzlicher Status-Flow, nicht kritisch |
| Auto-Daten via Link/Barcode | API-Integration zu komplex für 2 Tage |
| Shipment Tracking | DHL/GLS-Integration zu aufwändig |
| Bulk Import | Einzeleingabe reicht für 5-10 Artikel |
| Auto-Rechnungen | PDF-Generation ist separates Feature |
| Mobile App | Desktop-First, Mobile kommt später |
| Multi-User/Auth | Nur für eigenen Gebrauch |
| Cloud-Sync | Offline-First Priorität, Cloud später |

### MVP Success Criteria

Das MVP ist erfolgreich, wenn:

1. **Alle 8 Core Features funktionieren** ohne kritische Bugs
2. **Mindestens 5 echte Artikel** erfasst und korrekt berechnet werden
3. **Dashboard zeigt korrekte Metriken** basierend auf den erfassten Daten
4. **Daten persistieren** lokal und überleben App-Neustart
5. **UI ist benutzbar** – keine UX-Blocker, die die Nutzung verhindern

---

## Post-MVP Vision

### Phase 2 Features (Nach MVP-Validierung)

| Feature | Beschreibung | Mehrwert |
|---------|--------------|----------|
| **Bilder hochladen** | Fotos der Artikel hinterlegen | Pakete visuell wiedererkennen, bessere Listings |
| **Watchlist** | Artikel vormerken vor Kauf mit Kauflink | Release-Day Deals nicht verpassen |
| **Suche & Filter** | Artikel nach Kategorie, Status, Datum filtern | Schneller finden bei wachsendem Inventar |
| **Bulk Import** | CSV/Excel Import für mehrere Artikel | Effizienz bei größeren Einkäufen |
| **Kategorien verwalten** | Eigene Kategorien erstellen/bearbeiten | Flexibilität für verschiedene Produktarten |

### Long-term Vision (6-12 Monate)

**SimpleInv wird zum zentralen Hub für das gesamte Reselling-Business:**

- **Multi-Device Sync:** Desktop, Mobile, Web – überall Zugriff auf das Inventar
- **Automatisierungen:**
  - Auto-Daten via Link, Bestellnummer oder Barcode
  - Status-Erkennung via Plattform-APIs
  - Shipment Tracking (DHL, GLS, Hermes)
- **Intelligente Insights:**
  - Beste Verkaufsplattform pro Kategorie
  - Durchschnittliche Haltezeit bis Verkauf
  - Saisonale Trends
- **Steuer-Export:**
  - Einnahmen/Ausgaben-Report für das Finanzamt
  - PDF-Rechnungsgenerierung

### Expansion Opportunities

| Richtung | Beschreibung |
|----------|--------------|
| **Mobile App** | Native iOS/Android App für unterwegs – Inventar checken, schnell Artikel hinzufügen |
| **Multi-Plattform Dashboard** | eBay, Vinted, Kleinanzeigen Listings zentral verwalten |
| **Deal-Alerts** | Discord/mydealz Integration – Benachrichtigung bei guten Margen |
| **Community/Marketplace** | Reseller vernetzen, Tipps austauschen (langfristig) |
| **SaaS-Modell** | App für andere Reseller öffnen – Freemium mit Premium-Features |

### Evolutionspfad

```
MVP (Jetzt)          Phase 2              Phase 3              Langfristig
     │                   │                    │                     │
     ▼                   ▼                    ▼                     ▼
Desktop-App ──► + Bilder ──► + Automatisierung ──► Multi-Platform
SQLite lokal    + Watchlist    + Mobile App          SaaS-Potenzial
CRUD            + Filter       + API-Integration     Community
Dashboard       + Bulk Import  + Steuer-Export
```

---

## Technical Considerations

### Platform Requirements

| Anforderung | Spezifikation |
|-------------|---------------|
| **Target Platform** | Windows 11 (Desktop-App) |
| **Browser/OS Support** | Windows 10+ (Electron-basiert) |
| **Performance Requirements** | App-Start < 3 Sekunden, UI-Reaktion < 100ms |
| **Offline-Fähigkeit** | ✅ Vollständig offline nutzbar – Cloud-Sync optional (später) |

### Technology Preferences

| Komponente | Technologie | Begründung |
|------------|-------------|------------|
| **Desktop Runtime** | Electron | Cross-Platform-Fähigkeit für später, etabliertes Ökosystem |
| **Frontend** | React | Komponentenbasiert, große Community, gute Docs |
| **Styling** | TailwindCSS oder CSS Modules | Schnelles Styling, clean look |
| **State Management** | React Context oder Zustand | Simpel für MVP, kein Redux-Overhead |
| **Lokale Datenbank** | SQLite (via better-sqlite3) | Schnell, zuverlässig, keine Installation nötig |
| **Cloud-Sync (später)** | Supabase (PostgreSQL) | Für Multi-Device, wenn gewünscht |

### Offline-First Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                      SIMPLEINV APP                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │   React UI  │◄──►│   Service   │◄──►│  SQLite (lokal) │  │
│  │  (Renderer) │    │   Layer     │    │   better-sqlite3│  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
│                            │                                 │
│                            ▼ (später, optional)              │
│                     ┌─────────────┐                          │
│                     │ Cloud Sync  │                          │
│                     │  Supabase   │                          │
│                     └─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

**Vorteile Offline-First:**
- App funktioniert immer – keine Internetabhängigkeit
- Schnellere Performance – keine Netzwerk-Latenz
- Daten bleiben lokal – volle Kontrolle
- Cloud-Sync kann später hinzugefügt werden

### Architecture Considerations

**Repository Structure:**
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

**Service Architecture:**
- **Offline-First** – SQLite als primäre Datenquelle
- **Electron IPC** – Renderer kommuniziert mit Main Process für DB-Zugriff
- **Kein Server nötig** – alles lokal auf dem Rechner

**Data Storage:**
- **SQLite-Datei** im User-Data-Verzeichnis (`%APPDATA%/simpleinv/`)
- **Automatische Backups** möglich (Datei kopieren)
- **Einfache Migration** zu Cloud später möglich

**Security/Compliance:**
- **Daten lokal** – keine Übertragung an Dritte
- **Keine sensiblen Daten** im MVP (keine Passwörter, keine Zahlungsdaten)
- **SQLite-Datei verschlüsselbar** falls später gewünscht (SQLCipher)

### Technische Entscheidungen

| Entscheidung | Optionen | Empfehlung |
|--------------|----------|------------|
| **Lokale DB** | SQLite, IndexedDB, LowDB | SQLite – robust, SQL-Kenntnisse übertragbar |
| **SQLite Library** | better-sqlite3, sql.js | better-sqlite3 – synchron, schneller |
| **TypeScript vs JavaScript** | TypeScript für Typsicherheit | TypeScript – verhindert Bugs |
| **Build Tool** | Vite, Webpack, electron-builder | Vite – schneller, moderner |
| **Cloud-Sync Strategie** | Später hinzufügen wenn nötig | Supabase – einfache REST API |

---

## Constraints & Assumptions

### Constraints (Einschränkungen)

| Bereich | Einschränkung | Auswirkung |
|---------|---------------|------------|
| **Budget** | 0 € – Nur kostenlose Tools & Services | Keine kostenpflichtigen APIs, Libraries oder Hosting |
| **Timeline** | MVP bis Montag (2 Tage) | Strikte Feature-Priorisierung, keine Perfektionierung |
| **Ressourcen** | 1 Entwickler mit Basis-Kenntnissen | Einfache Architektur, AI-Unterstützung nutzen |
| **Technisch** | Windows 11 einzige Zielplattform | Kein Mac/Linux-Testing, kein Mobile |
| **Erfahrung** | JavaScript/React Grundlagen vorhanden | Lernkurve für Electron, SQLite, TypeScript einplanen |

### Detaillierte Constraints

**Zeit-Constraints:**
- Samstag + Sonntag = ca. 16-20 Stunden effektive Entwicklungszeit
- Davon: Setup (~2h), Lernen (~4h), Entwicklung (~10-14h)
- Kein Puffer für größere Probleme

**Technische Constraints:**
- Electron bringt ~100MB App-Größe mit
- better-sqlite3 erfordert Node-native-Module (Build-Komplexität)
- Keine Hot-Reload für Main Process (nur Renderer)

**Scope Constraints:**
- Keine Tests im MVP (Zeit sparen)
- Keine ausführliche Fehlerbehandlung
- UI "gut genug", nicht pixel-perfect

### Key Assumptions (Schlüsselannahmen)

| # | Annahme | Risiko wenn falsch |
|---|---------|-------------------|
| 1 | **Electron + React Setup funktioniert reibungslos** | Könnte Stunden kosten bei Problemen |
| 2 | **SQLite mit Electron ist einfach zu integrieren** | Alternative: localStorage/IndexedDB |
| 3 | **8 Features in 2 Tagen machbar mit AI-Hilfe** | MVP-Scope reduzieren |
| 4 | **Nutzer (du) wirst die App tatsächlich nutzen** | Motivation für Weiterentwicklung fehlt |
| 5 | **Ein Gerät reicht für den Anfang** | Cloud-Sync wäre doch MVP-kritisch |
| 6 | **5-10 Artikel sind repräsentativ** | Performance-Probleme bei mehr Artikeln |
| 7 | **Basis-UI reicht aus** | UX-Frustration verhindert Nutzung |
| 8 | **Keine Auth nötig (nur du nutzt den PC)** | Daten ungeschützt bei geteiltem PC |

### Abhängigkeiten

| Abhängigkeit | Beschreibung |
|--------------|--------------|
| **Node.js / npm** | Muss installiert sein |
| **Entwicklungsumgebung** | VS Code empfohlen |
| **Electron Boilerplate** | electron-vite oder ähnliches für schnellen Start |
| **AI-Unterstützung** | Claude/ChatGPT für Coding-Hilfe |

---

## Risks & Open Questions

### Key Risks (Hauptrisiken)

| Risiko | Wahrscheinlichkeit | Impact | Beschreibung & Mitigation |
|--------|-------------------|--------|---------------------------|
| **Technische Überforderung** | Mittel | Hoch | Electron/SQLite-Setup komplexer als erwartet. *Mitigation:* AI-Hilfe nutzen, Boilerplate verwenden, bei Blockade vereinfachen. |
| **Zeitdruck** | Hoch | Hoch | 2 Tage sind knapp für 8 Features. *Mitigation:* Strikt priorisieren, Features streichen wenn nötig, "gut genug" akzeptieren. |
| **Bugs im MVP** | Hoch | Mittel | Ohne Tests werden Bugs durchrutschen. *Mitigation:* Kritische Pfade manuell testen, offensichtliche Fehler beheben, Rest akzeptieren. |
| **Datenverlust** | Niedrig | Hoch | SQLite-Datei könnte korrupt werden oder gelöscht werden. *Mitigation:* Regelmäßige manuelle Backups, Speicherort dokumentieren. |
| **Motivation sinkt** | Mittel | Mittel | Frustration bei technischen Problemen. *Mitigation:* Kleine Erfolge feiern, Pausen machen, MVP-Scope reduzieren. |
| **App wird nicht genutzt** | Niedrig | Hoch | Nach Fertigstellung doch Excel weiternutzen. *Mitigation:* Sofort echte Artikel eintragen, App täglich öffnen. |

### Open Questions (Offene Fragen)

| # | Frage | Kontext |
|---|-------|---------|
| 1 | **Welches Electron-Boilerplate nutzen?** | electron-vite, electron-forge, oder manuelles Setup? |
| 2 | **Wie SQLite in Electron integrieren?** | better-sqlite3 im Main Process, IPC zum Renderer |
| 3 | **Welche Kategorien vordefinieren?** | Elektronik, Kleidung, Spielzeug, Sneaker, Sonstiges? |
| 4 | **Wie soll das UI aussehen?** | Notion-inspiriert – aber konkrete Design-Entscheidungen? |
| 5 | **Wo wird die SQLite-Datei gespeichert?** | %APPDATA%/simpleinv/ oder im Projekt-Ordner? |
| 6 | **Brauchen wir Migrations für die DB?** | Für MVP vielleicht nicht, aber für spätere Schema-Änderungen |
| 7 | **Wie Profit bei Teil-Verkäufen berechnen?** | z.B. Bundle gekauft, einzeln verkauft – anteiliger Kaufpreis? |

### Areas Needing Further Research

| Thema | Warum relevant |
|-------|----------------|
| **Electron + SQLite Best Practices** | Viele Wege zum Ziel – welcher ist der einfachste? |
| **electron-vite Setup** | Schnellster Weg zu einem funktionierenden Projekt |
| **React Table Libraries** | TanStack Table, AG Grid, oder selbst bauen? |
| **Electron Auto-Updater** | Nicht MVP, aber für später interessant |
| **TypeScript mit Electron IPC** | Typsichere Kommunikation zwischen Prozessen |

### Risiko-Matrix

```
                    IMPACT
                Low     Medium    High
           ┌─────────┬─────────┬─────────┐
     High  │         │  Bugs   │Zeitdruck│
LIKELIHOOD │         │         │         │
    Medium │         │Motivat. │Tech.    │
           │         │         │Überford.│
     Low   │         │         │Datenverl│
           │         │         │Nicht    │
           │         │         │genutzt  │
           └─────────┴─────────┴─────────┘
```

**Fokus:** Zeitdruck und technische Überforderung sind die kritischsten Risiken – beide erfordern Flexibilität beim MVP-Scope.

---

## Appendices

### A. Research Summary

**Durchgeführte Analysen:**

| Analyse | Datum | Ergebnisse |
|---------|-------|------------|
| **Brainstorming Session** | 06.12.2024 | Kernproblem identifiziert, MVP-Features definiert, Tech-Stack gewählt |

**Angewandte Techniken:**
- First Principles Thinking → Echte Probleme identifiziert
- Mind Mapping → Datenmodell & Features strukturiert
- SCAMPER → Kreative Erweiterungsideen generiert
- Six Thinking Hats → Priorisierung unter Zeitdruck

**Wichtigste Erkenntnisse:**
1. Überblicksverlust ist das Kernproblem – nicht fehlende Features
2. Einfachheit schlägt Funktionsumfang
3. Offline-First ist wichtiger als Cloud-Sync
4. 2 Tage sind machbar mit striktem Fokus

### B. Referenzen

| Ressource | Link/Beschreibung |
|-----------|-------------------|
| **Brainstorming-Ergebnisse** | `docs/brainstorming-session-results.md` |
| **Electron Docs** | https://www.electronjs.org/docs |
| **electron-vite** | https://electron-vite.org/ |
| **better-sqlite3** | https://github.com/WiseLibs/better-sqlite3 |
| **React Docs** | https://react.dev/ |
| **TailwindCSS** | https://tailwindcss.com/ |

---

## Next Steps

### Immediate Actions

| # | Aktion |
|---|--------|
| 1 | Projekt-Setup: `npm create electron-vite` ausführen |
| 2 | SQLite-Integration: better-sqlite3 installieren und testen |
| 3 | Datenbank-Schema definieren und erstellen |
| 4 | Basis-UI aufsetzen: Dashboard + Inventar-Tabelle |
| 5 | CRUD-Funktionen implementieren |
| 6 | Auto-Berechnungen (Profit, ROI) einbauen |
| 7 | Styling mit TailwindCSS |
| 8 | Erste echte Artikel eintragen und testen |

### PM Handoff

Dieser Project Brief liefert den vollständigen Kontext für **SimpleInv**.

**Nächster Schritt:** Bitte starte im **'PRD Generation Mode'**, um basierend auf diesem Brief ein detailliertes Product Requirements Document zu erstellen. Der PRD sollte:
- Technische Anforderungen spezifizieren
- User Stories definieren
- Akzeptanzkriterien festlegen
- Architektur-Entscheidungen dokumentieren

Bei Fragen oder Unklarheiten bitte Rücksprache halten.

---

*Erstellt mit BMAD-METHOD Framework*
*Facilitator: Business Analyst Mary*
