# 18. Accessibility (Barrierefreiheit)

## 18.1 Accessibility-Strategie

**MVP-Scope:** Basis-Accessibility ohne formale WCAG-Compliance (PRD 3.4: Einzelnutzer-App).

**Ziel:** Grundlegende Bedienbarkeit per Tastatur und sinnvolle Strukturierung für spätere Erweiterung.

## 18.2 Semantisches HTML

Alle UI-Komponenten müssen semantisch korrekte HTML-Elemente verwenden:

| UI-Element | Korrektes HTML | Nicht verwenden |
|------------|----------------|-----------------|
| Buttons | `<button>` | `<div onClick>`, `<span onClick>` |
| Links/Navigation | `<a href>` | `<div onClick>` |
| Eingabefelder | `<input>`, `<select>`, `<textarea>` | Custom Divs |
| Listen | `<ul>`, `<ol>`, `<li>` | Verschachtelte Divs |
| Tabellen | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` | Grid aus Divs |
| Überschriften | `<h1>`-`<h6>` in korrekter Hierarchie | Styled Paragraphs |
| Modale Dialoge | `<dialog>` oder `role="dialog"` | Plain Div |

```typescript
// src/renderer/components/ui/Button.tsx

// ✅ RICHTIG: Semantisches HTML
<button
  type={type}
  onClick={onClick}
  disabled={disabled || loading}
  className={buttonStyles}
>
  {children}
</button>

// ❌ FALSCH: Div als Button
<div onClick={onClick} className="button-style">
  {children}
</div>
```

## 18.3 ARIA-Richtlinien

### Wann ARIA verwenden

ARIA nur einsetzen, wenn natives HTML nicht ausreicht:

```typescript
// Modal mit ARIA
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Artikel bearbeiten</h2>
  <p id="modal-description">Ändern Sie die Artikeldetails.</p>
  {/* Modal Content */}
</div>

// Loading State
<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? 'Speichern...' : 'Speichern'}
</button>

// Status-Badge mit Label
<span
  className={statusColors[status]}
  role="status"
  aria-label={`Status: ${statusLabels[status]}`}
>
  {statusLabels[status]}
</span>
```

### ARIA-Attribute für häufige Patterns

| Pattern | ARIA-Attribute |
|---------|----------------|
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Toast/Alert | `role="alert"`, `aria-live="polite"` |
| Loading | `aria-busy="true"`, `aria-live="polite"` |
| Sortierbare Tabelle | `aria-sort="ascending|descending|none"` |
| Expandable | `aria-expanded="true|false"` |
| Required Field | `aria-required="true"` |
| Error State | `aria-invalid="true"`, `aria-describedby` |

## 18.4 Keyboard-Navigation

### Anforderungen

| Aktion | Tastenkombination |
|--------|-------------------|
| Durch Formularfelder navigieren | `Tab` / `Shift+Tab` |
| Button/Link aktivieren | `Enter` oder `Space` |
| Modal schließen | `Escape` |
| Dropdown öffnen | `Enter`, `Space`, `ArrowDown` |
| Dropdown-Option wählen | `ArrowUp`, `ArrowDown`, `Enter` |
| Tabellenzeile auswählen | `Enter` auf fokussierter Zeile |

### Focus Management

```typescript
// src/renderer/hooks/useFocusTrap.ts

import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element on open
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return containerRef;
}
```

```typescript
// src/renderer/components/ui/Modal.tsx

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const containerRef = useFocusTrap(isOpen);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">{title}</h2>
      {children}
    </div>
  );
}
```

### Focus-Indikatoren (Styling)

```css
/* src/renderer/index.css */

/* Sichtbare Focus-Indikatoren für Keyboard-Navigation */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Focus-Ring für Buttons */
button:focus-visible,
[role="button"]:focus-visible {
  ring: 2px;
  ring-color: var(--color-primary);
  ring-offset: 2px;
}

/* TailwindCSS Utility */
.focus-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2;
}
```

## 18.5 Accessibility-Linting

### ESLint Plugin

```json
// package.json (devDependencies)
{
  "devDependencies": {
    "eslint-plugin-jsx-a11y": "^6.8.0"
  }
}
```

```javascript
// eslint.config.js
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // Kritische Regeln
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',

      // Empfohlene Regeln
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/no-autofocus': 'warn',
    },
  },
];
```

## 18.6 Accessibility-Checkliste für Komponenten

Bei jeder neuen Komponente prüfen:

- [ ] Semantisch korrektes HTML-Element verwendet?
- [ ] Per Tastatur erreichbar und bedienbar?
- [ ] Focus-Indikator sichtbar?
- [ ] ARIA-Labels für nicht-textuelle Elemente?
- [ ] Farbkontrast ausreichend (mind. 4.5:1)?
- [ ] Keine Informationen nur durch Farbe vermittelt?
- [ ] ESLint jsx-a11y zeigt keine Fehler?

---
