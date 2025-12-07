import { useState, useEffect, useMemo } from 'react';
import { MetricsRow } from './MetricsRow';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { CategoryManager } from '../categories';
import { ArticleFormModal, ArticleTable, ArticleModal } from '../articles';
import { useArticleStore, useCategoryStore, useMetricsStore } from '../../stores';
import { withCalculations } from '../../../shared/utils/calculations';
import type { ArticleWithCalculations, ArticleInput } from '../../../shared/types/article';

export function DashboardPage() {
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isAddArticleModalOpen, setIsAddArticleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleWithCalculations | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { articles, loadArticles, updateArticle, deleteArticle, isLoading: articlesLoading } = useArticleStore();
  const { categories, loadCategories } = useCategoryStore();
  const { metrics, loadMetrics } = useMetricsStore();

  // Initial load
  useEffect(() => {
    loadArticles();
    loadCategories();
    loadMetrics();
  }, [loadArticles, loadCategories, loadMetrics]);

  // Refresh metrics when articles change
  useEffect(() => {
    loadMetrics();
  }, [articles, loadMetrics]);

  // Transform articles with calculations
  const articlesWithCalcs = useMemo(
    () => articles.map(withCalculations),
    [articles]
  );

  // Create category lookup map
  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  const handleRowClick = (article: ArticleWithCalculations) => {
    setSelectedArticle(article);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedArticle(null);
  };

  const handleEdit = () => {
    setIsDetailModalOpen(false); // Detail-Modal schließen
    setIsEditModalOpen(true); // Edit-Modal öffnen
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    // selectedArticle bleibt erhalten für evtl. erneutes Öffnen der Detail-Ansicht
  };

  const handleEditSubmit = async (formData: ArticleInput) => {
    if (!selectedArticle) return;

    const updatedArticle = await updateArticle(selectedArticle.id, formData);

    // selectedArticle mit neuen Daten aktualisieren (für Detail-Ansicht)
    setSelectedArticle(withCalculations(updatedArticle));
    setIsEditModalOpen(false);

    // Optional: Detail-Modal wieder öffnen
    // setIsDetailModalOpen(true);
  };

  const handleDelete = () => {
    // Detail-Modal bleibt offen, Delete-Dialog öffnet sich darüber
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedArticle) return;

    try {
      await deleteArticle(selectedArticle.id);

      // Dialoge schließen
      setIsDeleteDialogOpen(false);
      setIsDetailModalOpen(false);
      setSelectedArticle(null);

      // Optional: Toast anzeigen
      // showToast({ message: 'Artikel wurde gelöscht', type: 'success' });
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      // Optional: Error-Toast anzeigen
    }
  };

  // Kategorie-Name für ausgewählten Artikel
  const selectedCategoryName = selectedArticle?.categoryId
    ? categoryMap.get(selectedArticle.categoryId) ?? null
    : null;

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <MetricsRow metrics={metrics} />

      {/* Action Bar */}
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={() => setIsAddArticleModalOpen(true)}>
          + Artikel hinzufügen
        </Button>
        <Button variant="secondary" onClick={() => setIsCategoryManagerOpen(true)}>
          Kategorien
        </Button>
      </div>

      {/* Article Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <ArticleTable
          articles={articlesWithCalcs}
          categories={categoryMap}
          onRowClick={handleRowClick}
          isLoading={articlesLoading}
        />
      </div>

      {/* Category Manager Modal */}
      <CategoryManager
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
      />

      {/* Article Form Modal (Create) */}
      <ArticleFormModal
        isOpen={isAddArticleModalOpen}
        onClose={() => setIsAddArticleModalOpen(false)}
      />

      {/* Article Detail Modal */}
      <ArticleModal
        article={selectedArticle}
        categoryName={selectedCategoryName}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Article Form Modal (Edit) */}
      {selectedArticle && (
        <ArticleFormModal
          article={selectedArticle}
          isOpen={isEditModalOpen}
          onClose={handleEditClose}
          onSubmit={handleEditSubmit}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {selectedArticle && (
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          title="Artikel löschen"
          message={`Möchten Sie "${selectedArticle.title}" wirklich löschen?`}
          confirmLabel="Ja, löschen"
          cancelLabel="Abbrechen"
          variant="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}
