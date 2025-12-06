# 7. Frontend-Architektur

## 7.1 Komponenten-Organisation

```
src/renderer/
├── components/
│   ├── ui/                    # Basis UI-Komponenten
│   ├── articles/              # Artikel-Feature
│   ├── categories/            # Kategorien-Feature
│   ├── dashboard/             # Dashboard-Feature
│   ├── settings/              # Einstellungen-Feature
│   └── layout/                # Layout-Komponenten
├── stores/                    # Zustand Stores
├── hooks/                     # Custom Hooks
├── utils/                     # Utilities
├── App.tsx
├── main.tsx
└── index.css
```

## 7.2 State Management mit Zustand

```typescript
// src/renderer/stores/articleStore.ts

import { create } from 'zustand';

interface ArticleState {
  articles: Article[];
  selectedArticleId: number | null;
  isLoading: boolean;
  error: string | null;
  loadArticles: () => Promise<void>;
  createArticle: (input: ArticleInput) => Promise<Article>;
  updateArticle: (id: number, input: Partial<ArticleInput>) => Promise<void>;
  deleteArticle: (id: number) => Promise<void>;
  setSelectedArticleId: (id: number | null) => void;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
  articles: [],
  selectedArticleId: null,
  isLoading: false,
  error: null,

  loadArticles: async () => {
    set({ isLoading: true, error: null });
    try {
      const articles = await window.api.articles.getAll();
      set({ articles, isLoading: false });
    } catch (error) {
      set({ error: String(error), isLoading: false });
    }
  },

  // ... weitere Actions
}));
```

---
