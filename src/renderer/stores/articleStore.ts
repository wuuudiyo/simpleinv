import { create } from 'zustand';
import type { Article, ArticleInput } from '../../shared/types/article';
import { toast } from './uiStore';

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
      const articles = await globalThis.api.articles.getAll();
      set({ articles, isLoading: false });
    } catch (error) {
      set({ error: String(error), isLoading: false });
      toast.error('Fehler beim Laden der Artikel');
    }
  },

  createArticle: async (input: ArticleInput) => {
    try {
      const article = await globalThis.api.articles.create(input);
      // Artikel zur Liste hinzufügen (am Anfang, da neueste zuerst)
      set((state) => ({
        articles: [article, ...state.articles],
        error: null,
      }));
      toast.success('Artikel erstellt');
      return article;
    } catch (error) {
      set({ error: String(error) });
      toast.error('Fehler beim Erstellen des Artikels');
      throw error;
    }
  },

  updateArticle: async (id: number, input: Partial<ArticleInput>) => {
    try {
      const updatedArticle = await globalThis.api.articles.update(id, input);
      // Artikel in der Liste ersetzen
      set((state) => ({
        articles: state.articles.map((a) => (a.id === id ? updatedArticle : a)),
        error: null,
      }));
      toast.success('Artikel aktualisiert');
      return updatedArticle;
    } catch (error) {
      set({ error: String(error) });
      toast.error('Fehler beim Aktualisieren des Artikels');
      throw error;
    }
  },

  deleteArticle: async (id: number) => {
    try {
      await globalThis.api.articles.delete(id);
      // Artikel aus lokaler Liste entfernen
      set((state) => ({
        articles: state.articles.filter((a) => a.id !== id),
        error: null,
      }));
      toast.success('Artikel gelöscht');
    } catch (error) {
      set({ error: String(error) });
      toast.error('Fehler beim Löschen des Artikels');
      throw error;
    }
  },

  setSelectedArticleId: (id) => set({ selectedArticleId: id }),
  clearError: () => set({ error: null }),
}));
