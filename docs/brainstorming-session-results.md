# Brainstorming Session Results

**Session Date:** 06.12.2024
**Facilitator:** Business Analyst Mary
**Participant:** User

---

## Executive Summary

**Topic:** Reselling-Inventar- & Profit-Tracking-Software (Desktop-App für Windows)

**Session Goals:** Kernfeatures definieren für ein voll funktionsfähiges Inventar-System, dann mögliche Erweiterungen erkunden

**Techniken verwendet:** First Principles Thinking, Mind Mapping, SCAMPER, Six Thinking Hats

**Zeitrahmen:** MVP bis Montag (2 Tage)

### Key Themes Identified:
- Überblick über physisches Inventar ist Hauptproblem
- Einfachheit & cleanes UI haben hohe Priorität
- Cloud-Sync ist wichtig für späteren Multi-Device-Zugriff
- Automatisierungen sind Nice-to-have, nicht MVP

---

## Technique Sessions

### 1. First Principles Thinking

**Kernprobleme identifiziert:**

| Problem | Auswirkung |
|---------|------------|
| Pakete bleiben ungeöffnet | Vergisst, was drin ist |
| Vergisst, was man besitzt | Verpasste Verkaufschancen |
| Einkaufspreis vergessen | Profit-Kalkulation unmöglich |
| Zeit beim Suchen verloren | Ineffizienz, Frustration |

**Artikel-Lebenszyklus:**
```
[EINKAUF]              [LAGERUNG]           [VERKAUF]            [VERSAND]
     │                      │                    │                    │
     ▼                      ▼                    ▼                    ▼
Gruppen/Deals ──► Paket kommt an ──► Listing erstellen ──► Verkauft! ──► DHL Versand
(Amazon, Hersteller)   (liegt rum)    (eBay, Vinted,       (Geld kommt)   (Artikel raus)
                                       Kleinanzeigen)
```

---

### 2. Mind Mapping

**Artikel-Datenmodell:**

```
┌─────────────────────────────────────────────────────────────────┐
│                         ARTIKEL                                 │
├─────────────────────────────────────────────────────────────────┤
│  BASIS                                                          │
│  ├── Titel                                                      │
│  ├── Kategorie                                                  │
│  ├── Status [In Stock | Listed | Sold | Returned]               │
│  └── Bild (optional)                                            │
├─────────────────────────────────────────────────────────────────┤
│  EINKAUF                                                        │
│  ├── Kaufplattform (Amazon, Hersteller, etc.)                   │
│  ├── Kaufpreis                                                  │
│  ├── Kaufdatum                                                  │
│  └── Versandkosten (eingehend)                                  │
├─────────────────────────────────────────────────────────────────┤
│  VERKAUF                                                        │
│  ├── Verkaufsplattform (eBay, Vinted, Kleinanzeigen)            │
│  ├── Verkaufspreis                                              │
│  ├── Verkaufsdatum                                              │
│  ├── Gebühren (Plattform-Gebühren)                              │
│  └── Versandkosten (ausgehend, falls selbst getragen)           │
├─────────────────────────────────────────────────────────────────┤
│  AUTO-BERECHNUNG                                                │
│  ├── Profit = Verkaufspreis − Kaufpreis − Gebühren − Versand    │
│  └── ROI = Profit ÷ Kaufpreis                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Dashboard-Metriken:**

| Metrik | Formel/Beschreibung |
|--------|---------------------|
| Gesamtprofit | Σ Profit (alle verkauften Artikel) |
| Offener Warenwert | Σ Kaufpreis (Status: In Stock + Listed) |
| Summe Kaufpreis | Σ aller Kaufpreise |
| Noch nicht verkauft | Anzahl (Status: In Stock + Listed) |

**Kernfunktionen:**
- Artikel hinzufügen
- Artikel bearbeiten
- Artikel suchen/filtern
- Artikel löschen
- Dashboard ansehen

---

### 3. SCAMPER Methode

**S – Substitute (Ersetzen):**
| Manuell → Automatisch | Beschreibung |
|----------------------|--------------|
| Auto-Daten holen | Produktinfos via Link, Bestellnummer, Barcode |
| Shipment Tracking | DHL/GLS Tracking direkt in der App |
| Bulk Import | Mehrere Artikel auf einmal anlegen |
| Auto-Rechnungen | Rechnungen automatisch generieren |

**C – Combine (Kombinieren) – Nice-to-have:**
- Artikel + Tracking verknüpft
- Verkaufsdaten + Kalender-Analyse
- Multi-Plattform Dashboard

**A – Adapt (Anpassen):**
- Notion-Style UI (clean, einfach)
- Watchlist für Release-Day Deals (neuer Status vor "In Stock")

**M – Modify (Verändern):**
- Zwei-Ebenen-Ansicht: Übersicht (Liste) → Detail (Klick)
- Übersicht zeigt nur: Titel, Status, Kaufpreis, Profit
- Detail zeigt alle Informationen

**P – Put to other use (Andere Nutzung):**
- Mobile App (später, nach Desktop)
- Steuer-Export für Finanzamt

**E – Eliminate (Weglassen):**
- ~~Sammler-Features~~ → Fokus bleibt auf Reselling

**R – Reverse (Umkehren):**
- Rückwärts-Modus: Verkauf erkannt → Daten nachtragen
- Deal-Alerts: Discord/mydealz Integration
- Auto-Status-Erkennung via Tracking/API

---

### 4. Six Thinking Hats

**🎩⚪ Weiß – Fakten:**
| Faktor | Status |
|--------|--------|
| Programmierkenntnisse | Basics vorhanden |
| Inventar-Größe | 5-10 Items (Start-Phase) |
| Hauptplattform | eBay |
| Zeitrahmen | 2 Tage bis Montag |
| Betriebssystem | Windows 11 |
| App-Typ | Desktop-App |

**🎩🔴 Rot – Gefühle:**
- Must-have: Dashboard + Inventar + Items hinzufügen
- Kann warten: Alle Automatisierungen
- Motivation: Funktionierendes Produkt gibt Antrieb

**🎩⚫ Schwarz – Risiken:**
| Risiko | Mitigation |
|--------|------------|
| Technisch überfordert | Einfache Erklärungen, Fragen erlaubt |
| Unerwartete Bugs | Simpel halten = weniger Fehlerquellen |
| Zeitdruck | Fokus auf MVP |

**🎩🟡 Gelb – Vorteile:**
- Sofortiger Überblick über Inventar
- Profit-Klarheit
- Lerneffekt
- Erweiterbare Basis

**🎩🟢 Grün – Kreativität:**
| Komponente | Lösung |
|------------|--------|
| Desktop-App | Electron + React |
| Datenbank | Cloud-basiert (Supabase/Firebase) |
| Cloud-Sync | Daten überall verfügbar |

**🎩🔵 Blau – Prozess:**
→ Siehe Priorisierung unten

---

## Idea Categorization

### Immediate Opportunities (MVP für Montag)

1. **Inventar-Übersicht**
   - Tabelle mit allen Artikeln
   - Wichtigste Daten auf einen Blick

2. **Artikel hinzufügen**
   - Einfaches Formular
   - Alle relevanten Felder

3. **Artikel bearbeiten**
   - Daten ändern
   - Status updaten

4. **Artikel löschen**
   - Entfernen aus Inventar

5. **Detail-Ansicht**
   - Klick auf Artikel → alle Infos sehen

6. **Dashboard-Metriken**
   - Gesamtprofit
   - Offener Warenwert
   - Anzahl nicht verkaufter Artikel

7. **Auto-Berechnung**
   - Profit automatisch berechnen
   - ROI automatisch berechnen

8. **Cloud-Sync**
   - Daten in der Cloud gespeichert
   - Vorbereitung für Multi-Device

### Future Innovations (Nach MVP)

1. **Bilder hochladen**
   - Fotos der Artikel hinterlegen
   - Pakete wiedererkennen

2. **Watchlist**
   - Artikel vormerken vor Kauf
   - Kauflink für Release-Day

3. **Auto-Daten holen**
   - Via Link, Bestellnummer, Barcode
   - Produktinfos automatisch laden

4. **Shipment Tracking**
   - DHL/GLS Integration
   - Versandstatus in der App

5. **Bulk Import**
   - Mehrere Artikel gleichzeitig anlegen
   - CSV/Excel Import

6. **Auto-Rechnungen**
   - Rechnungen automatisch generieren
   - PDF Export

### Moonshots (Langfristig)

1. **Deal-Alerts**
   - Discord/mydealz Integration
   - Benachrichtigung bei guten Margen

2. **Auto-Status-Erkennung**
   - Status automatisch via API/Tracking
   - Rückwärts-Modus bei Verkauf

3. **Mobile App**
   - Native iOS/Android App
   - Unterwegs Inventar checken

4. **Multi-Plattform Dashboard**
   - Alle Listings im Überblick
   - eBay, Vinted, Kleinanzeigen verknüpft

5. **Steuer-Export**
   - Übersicht für Finanzamt
   - Einnahmen/Ausgaben Report

---

## Action Planning

### Top 3 Priority Ideas

**#1 Priority: Funktionsfähiges Dashboard mit Inventar-Übersicht**
- Rationale: Löst das Kernproblem (Überblick verloren)
- Next steps: UI Design, Datenbank-Schema, CRUD-Funktionen
- Resources needed: Electron, React, Supabase/Firebase
- Timeline: Bis Montag

**#2 Priority: Cloud-Sync**
- Rationale: Ermöglicht späteren Multi-Device-Zugriff
- Next steps: Cloud-Datenbank aufsetzen, Sync implementieren
- Resources needed: Supabase oder Firebase Account
- Timeline: Bis Montag

**#3 Priority: Auto-Berechnungen (Profit & ROI)**
- Rationale: Spart manuelle Arbeit, zeigt echten Mehrwert
- Next steps: Formeln implementieren, Dashboard-Metriken anzeigen
- Resources needed: Logik in Frontend
- Timeline: Bis Montag

---

## Reflection & Follow-up

### What Worked Well
- First Principles half, das echte Problem zu identifizieren
- SCAMPER brachte viele kreative Erweiterungsideen
- Six Thinking Hats half bei der Priorisierung unter Zeitdruck

### Areas for Further Exploration
- eBay API Integration für Auto-Status
- Discord/mydealz Anbindung für Deal-Alerts
- Mobile App Architektur

### Recommended Follow-up Techniques
- User Testing nach MVP Launch
- Iterative Verbesserung basierend auf echtem Nutzung

### Questions That Emerged
- Welche Cloud-Lösung (Supabase vs Firebase)?
- Wie Auth später handhaben (nur für dich vs Multi-User)?
- Welche Kategorien für Artikel vordefinieren?

### Next Session Planning
- **Suggested topics:** Tech-Stack finalisieren, UI/UX Design
- **Preparation needed:** Entwicklungsumgebung aufsetzen

---

## Technische Zusammenfassung

**Geplanter Tech-Stack:**

| Komponente | Technologie |
|------------|-------------|
| Desktop-App | Electron |
| Frontend | React |
| Datenbank | Supabase oder Firebase (Cloud) |
| Styling | TBD (simpel & clean) |

**MVP Feature-Liste:**

- [x] Inventar-Übersicht (Tabelle)
- [x] Artikel hinzufügen (Formular)
- [x] Artikel bearbeiten
- [x] Artikel löschen
- [x] Detail-Ansicht
- [x] Dashboard-Metriken
- [x] Auto-Berechnung (Profit, ROI)
- [x] Cloud-Sync

---

*Session facilitated using the BMAD-METHOD brainstorming framework*
