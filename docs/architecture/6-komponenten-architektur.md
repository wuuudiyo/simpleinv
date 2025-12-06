# 6. Komponenten-Architektur

## 6.1 Frontend-Komponenten Übersicht

| Komponente | Verantwortung |
|------------|---------------|
| Dashboard Page | Hauptansicht mit Metriken und Tabelle |
| Metrics Cards | 3 Dashboard-Metriken |
| Article Table | Sortierbare Artikel-Tabelle |
| Article Modal | Detail-Ansicht und Bearbeiten |
| Article Form | Formular für CRUD |
| Category Manager | Kategorien verwalten |
| Settings Modal | Theme-Einstellungen |

## 6.2 UI Base Components (components/ui/)

Wiederverwendbare, generische UI-Komponenten:

### Button

```typescript
// src/renderer/components/ui/Button.tsx

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

// Verwendung: <Button variant="primary" onClick={handleSave}>Speichern</Button>
```

### Modal

```typescript
// src/renderer/components/ui/Modal.tsx

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

// Verwendung: <Modal isOpen={isOpen} onClose={close} title="Artikel Details">...</Modal>
```

### Input / Select / Form Controls

```typescript
// src/renderer/components/ui/Input.tsx

interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date';
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// src/renderer/components/ui/Select.tsx

interface SelectProps<T> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}
```

### Card

```typescript
// src/renderer/components/ui/Card.tsx

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// Verwendung für Metriken: <Card title="Gesamtprofit"><MetricValue value={profit} /></Card>
```

### Toast / Notification

```typescript
// src/renderer/components/ui/Toast.tsx

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms, default 3000
  onClose: () => void;
}

// Globaler Toast-State im UI-Store
```

### StatusBadge

```typescript
// src/renderer/components/ui/StatusBadge.tsx

interface StatusBadgeProps {
  status: ArticleStatus;
}

// Farben: in_stock=blue, listed=orange, sold=green, returned=red
```

## 6.3 Feature-Komponenten Spezifikation

### Dashboard Page

```typescript
// src/renderer/components/dashboard/DashboardPage.tsx

// Props: keine (verwendet Stores direkt)
// State: lädt Daten beim Mount via useEffect

// Struktur:
// ├── Header (App-Titel, Settings-Button)
// ├── MetricsRow
// │   ├── MetricCard (Gesamtprofit)
// │   ├── MetricCard (Offener Warenwert)
// │   └── MetricCard (Nicht verkaufte Artikel)
// ├── ActionBar (+ Artikel hinzufügen, Kategorien verwalten)
// └── ArticleTable
```

### ArticleTable

```typescript
// src/renderer/components/articles/ArticleTable.tsx

interface ArticleTableProps {
  articles: ArticleWithCalculations[];
  onRowClick: (article: Article) => void;
  isLoading?: boolean;
}

// Spalten: Titel, Kategorie, Status, Kaufpreis, Verkaufspreis, Profit
// Features: Sortierung (TanStack Table), Status-Badge, Profit-Formatierung
// Empty State: "Keine Artikel vorhanden. Fügen Sie Ihren ersten Artikel hinzu."
```

### ArticleModal (Detail-Ansicht)

```typescript
// src/renderer/components/articles/ArticleModal.tsx

interface ArticleModalProps {
  article: ArticleWithCalculations | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

// Zeigt alle Artikel-Details gruppiert:
// - Basis-Info (Titel, Kategorie, Status)
// - Einkauf (Plattform, Preis, Datum, Versand)
// - Verkauf (Plattform, Preis, Datum, Gebühren, Versand)
// - Berechnungen (Profit, ROI)
```

### ArticleForm

```typescript
// src/renderer/components/articles/ArticleForm.tsx

interface ArticleFormProps {
  article?: Article; // undefined = Create, defined = Edit
  onSubmit: (data: ArticleInput) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Validierung:
// - Titel: required, min 1 char
// - Kaufpreis: required, >= 0
// - Alle anderen Felder: optional

// Gruppen: Basis | Einkauf | Verkauf (visuell getrennt)
```

### CategoryManager

```typescript
// src/renderer/components/categories/CategoryManager.tsx

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

// State: categories, newCategoryName, editingId
// Features:
// - Liste aller Kategorien
// - Inline-Add (Input + Button)
// - Inline-Edit (Doppelklick oder Edit-Icon)
// - Delete mit Confirmation Dialog
```

### SettingsModal

```typescript
// src/renderer/components/settings/SettingsModal.tsx

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sektionen:
// - Theme (Light/Dark/Custom Radio + ColorPicker)
// - Info (Version, DB-Pfad)
// Auto-Save bei Änderungen
```

## 6.4 Component Reusability Patterns

### Composition Pattern

```typescript
// Komplexe Komponenten aus einfachen zusammensetzen
<Modal isOpen={isOpen} onClose={onClose} title="Artikel bearbeiten">
  <ArticleForm article={article} onSubmit={handleSubmit} onCancel={onClose} />
</Modal>
```

### Render Props für Flexibilität

```typescript
// Table mit custom Cell Rendering
<ArticleTable
  articles={articles}
  renderStatus={(status) => <StatusBadge status={status} />}
  renderProfit={(profit) => <ProfitDisplay value={profit} />}
/>
```

### Custom Hooks für Logic Reuse

```typescript
// src/renderer/hooks/useArticles.ts
export function useArticles() {
  const { articles, loadArticles, isLoading } = useArticleStore();

  useEffect(() => {
    loadArticles();
  }, []);

  return { articles: articles.map(withCalculations), isLoading };
}

// src/renderer/hooks/useConfirmDialog.ts
export function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmConfig | null>(null);

  const confirm = (config: ConfirmConfig) => Promise<boolean>;

  return { isOpen, config, confirm, Dialog: ConfirmDialog };
}
```

## 6.5 Performance Optimierung

### React.memo für teure Komponenten

```typescript
// Komponenten die nur bei Prop-Änderung re-rendern sollen
export const ArticleTableRow = React.memo(function ArticleTableRow({
  article,
  onClick
}: ArticleTableRowProps) {
  return (/* ... */);
});

// Anwendung: Tabellenzeilen, Metrikkarten
```

### useMemo für teure Berechnungen

```typescript
// src/renderer/components/dashboard/DashboardPage.tsx

const articlesWithCalculations = useMemo(
  () => articles.map(withCalculations),
  [articles]
);

const sortedArticles = useMemo(
  () => sortArticles(articlesWithCalculations, sortConfig),
  [articlesWithCalculations, sortConfig]
);
```

### useCallback für stabile Referenzen

```typescript
// Verhindert unnötige Re-Renders von Child-Komponenten
const handleRowClick = useCallback((article: Article) => {
  setSelectedArticleId(article.id);
}, []);

const handleDelete = useCallback(async (id: number) => {
  await deleteArticle(id);
  setSelectedArticleId(null);
}, [deleteArticle]);
```

### Lazy Loading für Modals

```typescript
// src/renderer/App.tsx

const SettingsModal = React.lazy(() => import('./components/settings/SettingsModal'));
const CategoryManager = React.lazy(() => import('./components/categories/CategoryManager'));

// Verwendung mit Suspense
<Suspense fallback={<LoadingSpinner />}>
  {showSettings && <SettingsModal isOpen onClose={closeSettings} />}
</Suspense>
```

## 6.6 Performance Monitoring (Development)

```typescript
// src/renderer/utils/performanceMonitor.ts

export function measureRender(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      if (duration > 16) { // > 1 Frame (60fps)
        console.warn(`[Perf] ${componentName} render: ${duration.toFixed(2)}ms`);
      }
    };
  }
  return () => {};
}

// Verwendung in Komponenten
useEffect(() => {
  const end = measureRender('ArticleTable');
  return end;
});
```

**Ziel-Metriken (Development Console):**
- Component Render: < 16ms (60fps)
- IPC Round-trip: < 50ms
- Full Page Load: < 500ms

## 6.7 Backend-Komponenten

| Komponente | Verantwortung |
|------------|---------------|
| Database Service | SQLite-Verbindung (Singleton) |
| Article Repository | CRUD für Artikel |
| Category Repository | CRUD für Kategorien |
| Settings Repository | Key-Value Store |
| Metrics Service | Dashboard-Berechnungen |

---
