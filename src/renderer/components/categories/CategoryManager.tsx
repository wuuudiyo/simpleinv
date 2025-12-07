import { useEffect, useState } from 'react';
import { Modal, ConfirmDialog } from '../ui';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';
import { useCategoryStore } from '../../stores';
import type { Category } from '../../../shared/types/category';

interface CategoryManagerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function CategoryManager({ isOpen, onClose }: CategoryManagerProps) {
  const {
    categories,
    isLoading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError,
  } = useCategoryStore();

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen, loadCategories]);

  useEffect(() => {
    if (!isOpen) {
      clearError();
    }
  }, [isOpen, clearError]);

  const handleCreate = async (name: string) => {
    await createCategory({ name });
  };

  const handleUpdate = async (id: number, name: string) => {
    await updateCategory(id, { name });
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      await deleteCategory(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Kategorien verwalten">
        <CategoryForm onSubmit={handleCreate} error={error} />

        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
          </div>
        ) : (
          <CategoryList
            categories={categories}
            onUpdate={handleUpdate}
            onDelete={setDeleteTarget}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Kategorie löschen"
        message={`Kategorie "${deleteTarget?.name}" wirklich löschen? Artikel behalten ihre Daten, werden aber keiner Kategorie zugeordnet.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
