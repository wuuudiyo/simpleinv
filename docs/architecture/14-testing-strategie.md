# 14. Testing-Strategie

## 14.1 Test-Pyramide

```
        ┌─────────────┐
        │   E2E (5%)  │  ← Playwright: kritische User Flows
        ├─────────────┤
        │Integration  │  ← Vitest: IPC + DB zusammen
        │   (15%)     │
        ├─────────────┤
        │    Unit     │  ← Vitest: Isolierte Logik
        │   (80%)     │
        └─────────────┘
```

## 14.2 Test-Tooling

| Tool | Zweck | Konfiguration |
|------|-------|---------------|
| **Vitest** | Unit & Integration Tests | `vitest.config.ts` |
| **Testing Library** | React Component Tests | `@testing-library/react` |
| **Playwright** | E2E Tests | `playwright.config.ts` |
| **MSW** | API Mocking (falls nötig) | Optional |

## 14.3 Unit Tests

### Was testen?

| Bereich | Beispiele | Abdeckungsziel |
|---------|-----------|----------------|
| `shared/utils/` | `calculateProfit()`, `calculateRoi()` | 100% |
| `renderer/stores/` | Zustand Store Actions | 90% |
| `main/repositories/` | CRUD-Operationen | 90% |
| Zod Schemas | Validation Edge Cases | 80% |

### Beispiel: Utility Test

```typescript
// src/shared/utils/calculations.test.ts

import { describe, it, expect } from 'vitest';
import { calculateProfit, calculateRoi } from './calculations';

describe('calculateProfit', () => {
  it('returns null when salePrice is null', () => {
    const article = createMockArticle({ salePrice: null });
    expect(calculateProfit(article)).toBeNull();
  });

  it('calculates profit correctly', () => {
    const article = createMockArticle({
      salePrice: 100,
      purchasePrice: 50,
      fees: 10,
      shippingCostIn: 5,
      shippingCostOut: 5,
    });
    expect(calculateProfit(article)).toBe(30); // 100-50-10-5-5
  });

  it('handles negative profit', () => {
    const article = createMockArticle({
      salePrice: 40,
      purchasePrice: 50,
    });
    expect(calculateProfit(article)).toBe(-10);
  });
});
```

### Beispiel: Store Test

```typescript
// src/renderer/stores/articleStore.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useArticleStore } from './articleStore';

// Mock window.api
vi.stubGlobal('window', {
  api: {
    articles: {
      getAll: vi.fn(),
      create: vi.fn(),
    },
  },
});

describe('articleStore', () => {
  beforeEach(() => {
    useArticleStore.setState({ articles: [], isLoading: false, error: null });
    vi.clearAllMocks();
  });

  it('loads articles successfully', async () => {
    const mockArticles = [{ id: 1, title: 'Test' }];
    window.api.articles.getAll.mockResolvedValue(mockArticles);

    await useArticleStore.getState().loadArticles();

    expect(useArticleStore.getState().articles).toEqual(mockArticles);
    expect(useArticleStore.getState().isLoading).toBe(false);
  });

  it('handles load error', async () => {
    window.api.articles.getAll.mockRejectedValue(new Error('DB Error'));

    await useArticleStore.getState().loadArticles();

    expect(useArticleStore.getState().error).toContain('DB Error');
  });
});
```

## 14.4 Integration Tests

### Repository + Database

```typescript
// src/main/database/repositories/articleRepository.test.ts

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import { ArticleRepository } from './articleRepository';
import { initializeSchema } from '../schema';

describe('ArticleRepository', () => {
  let db: Database.Database;
  let repo: ArticleRepository;

  beforeEach(() => {
    db = new Database(':memory:'); // In-Memory für Tests
    initializeSchema(db);
    repo = new ArticleRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  it('creates and retrieves article', () => {
    const created = repo.create({
      title: 'Test Item',
      purchasePrice: 25,
      status: 'in_stock',
    });

    const retrieved = repo.getById(created.id);

    expect(retrieved).toMatchObject({
      title: 'Test Item',
      purchasePrice: 25,
    });
  });

  it('updates article', () => {
    const article = repo.create({ title: 'Old', purchasePrice: 10, status: 'in_stock' });

    repo.update(article.id, { title: 'New', status: 'sold' });

    expect(repo.getById(article.id)?.title).toBe('New');
  });
});
```

## 14.5 Component Tests

```typescript
// src/renderer/components/ui/Button.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText('Click'));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## 14.6 E2E Tests

```typescript
// e2e/article-crud.spec.ts

import { test, expect, _electron as electron } from '@playwright/test';

test.describe('Article CRUD', () => {
  test('creates new article', async () => {
    const app = await electron.launch({ args: ['.'] });
    const page = await app.firstWindow();

    // Artikel hinzufügen
    await page.click('button:has-text("Artikel hinzufügen")');
    await page.fill('input[name="title"]', 'Test Sneaker');
    await page.fill('input[name="purchasePrice"]', '50');
    await page.click('button:has-text("Speichern")');

    // Verifizieren
    await expect(page.locator('text=Test Sneaker')).toBeVisible();

    await app.close();
  });
});
```

## 14.7 Test-Konfiguration

```typescript
// vitest.config.ts

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['**/*.d.ts', '**/index.ts', 'src/test/**'],
    },
  },
});
```

```typescript
// src/test/setup.ts

import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Global Mocks
vi.stubGlobal('window', {
  api: {
    articles: { getAll: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
    categories: { getAll: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
    settings: { get: vi.fn(), set: vi.fn() },
    metrics: { getDashboard: vi.fn() },
  },
});
```

## 14.8 npm Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

---
