import { create } from 'zustand';
import type { Article, ArticleInput } from '../../shared/types/article';

interface ArticleState {
  articles: Article[];
  selectedArticleId: number | null;
  isLoading: boolean;
  error: string | null;
  loadArticles: () => Promise<void>;
  createArticle: (input: ArticleInput) => Promise<Article>;
  updateArticle: (id: number, input: Partial<ArticleInput>) => Promise<Article>;
  deleteArticle: (id: number) => Promise<void>;
  setSelectedArticleId: (id: number | null) => void;
  clearError: () => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
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

  createArticle: async (input: ArticleInput) => {
    try {
      const article = await window.api.articles.create(input);
      // Artikel zur Liste hinzufügen (am Anfang, da neueste zuerst)
      set((state) => ({
        articles: [article, ...state.articles],
        error: null,
      }));
      return article;
    } catch (error) {
      set({ error: String(error) });
      throw error;
    }
  },

  updateArticle: async (id: number, input: Partial<ArticleInput>) => {
    try {
      const updatedArticle = await window.api.articles.update(id, input);
      // Artikel in der Liste ersetzen
      set((state) => ({
        articles: state.articles.map((a) => (a.id === id ? updatedArticle : a)),
        error: null,
      }));
      return updatedArticle;
    } catch (error) {
      set({ error: String(error) });
      throw error;
    }
  },

  deleteArticle: async (id: number) => {
    try {
      await window.api.articles.delete(id);
      // Artikel aus lokaler Liste entfernen
      set((state) => ({
        articles: state.articles.filter((a) => a.id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: String(error) });
      throw error;
    }
  },

  setSelectedArticleId: (id) => set({ selectedArticleId: id }),
  clearError: () => set({ error: null }),
}));
