import { create } from 'zustand';
import type { Category, CategoryInput } from '../../shared/types/category';

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
      return category;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      set({ error: errorMessage });
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
      return category;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      set({ error: errorMessage });
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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      set({ error: errorMessage });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
