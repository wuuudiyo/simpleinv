import { create } from 'zustand';
import type { Category, CategoryInput } from '../../shared/types/category';
import { toast } from './uiStore';

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  loadCategories: () => Promise<void>;
  createCategory: (input: CategoryInput) => Promise<Category>;
  updateCategory: (id: number, input: CategoryInput) => Promise<Category>;
  deleteCategory: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  loadCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categories = await window.api.categories.getAll();
      set({ categories, isLoading: false });
    } catch (error) {
      set({ error: String(error), isLoading: false });
      toast.error('Fehler beim Laden der Kategorien');
    }
  },

  createCategory: async (input: CategoryInput) => {
    try {
      const category = await window.api.categories.create(input);
      set((state) => ({
        categories: [...state.categories, category].sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
        error: null,
      }));
      toast.success('Kategorie erstellt');
      return category;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      set({ error: errorMessage });
      toast.error(errorMessage.includes('UNIQUE') ? 'Kategorie existiert bereits' : 'Fehler beim Erstellen der Kategorie');
      throw error;
    }
  },

  updateCategory: async (id: number, input: CategoryInput) => {
    try {
      const category = await window.api.categories.update(id, input);
      set((state) => ({
        categories: state.categories
          .map((c) => (c.id === id ? category : c))
          .sort((a, b) => a.name.localeCompare(b.name)),
        error: null,
      }));
      toast.success('Kategorie aktualisiert');
      return category;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      set({ error: errorMessage });
      toast.error(errorMessage.includes('UNIQUE') ? 'Kategorie existiert bereits' : 'Fehler beim Aktualisieren der Kategorie');
      throw error;
    }
  },

  deleteCategory: async (id: number) => {
    try {
      await window.api.categories.delete(id);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
        error: null,
      }));
      toast.success('Kategorie gelöscht');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      set({ error: errorMessage });
      toast.error('Fehler beim Löschen der Kategorie');
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
