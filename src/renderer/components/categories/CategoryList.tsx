import { useState } from 'react';
import type { Category } from '../../../shared/types/category';

interface CategoryListProps {
  categories: Category[];
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (category: Category) => void;
}

export function CategoryList({ categories, onUpdate, onDelete }: CategoryListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const saveEdit = async () => {
    if (!editingId || !editName.trim() || isSaving) return;

    setIsSaving(true);
    try {
      await onUpdate(editingId, editName.trim());
      setEditingId(null);
      setEditName('');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  if (categories.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
        Keine Kategorien vorhanden
      </p>
    );
  }

  return (
    <ul className="space-y-1">
      {categories.map((category) => (
        <li
          key={category.id}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group"
        >
          {editingId === category.id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={cancelEdit}
                autoFocus
                className="flex-1 px-2 py-1 text-sm border border-blue-500 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={saveEdit}
                disabled={isSaving || !editName.trim()}
                className="p-1 text-green-600 hover:text-green-700 dark:text-green-400"
                title="Speichern"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={cancelEdit}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Abbrechen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-200">
                {category.name}
              </span>
              <button
                onClick={() => startEdit(category)}
                className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Bearbeiten"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(category)}
                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Löschen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
