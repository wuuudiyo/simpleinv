import { useState } from 'react';
import { Modal } from '../ui';
import { ArticleForm } from './ArticleForm';
import { useArticleStore } from '../../stores';
import type { Article, ArticleInput } from '../../../shared/types/article';

interface ArticleFormModalProps {
  article?: Article; // undefined = Create, defined = Edit
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ArticleInput) => Promise<void>; // Optional für Edit
}

export function ArticleFormModal({ article, isOpen, onClose, onSubmit }: ArticleFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createArticle, updateArticle } = useArticleStore();

  const isEditMode = article !== undefined;

  const handleSubmit = async (data: ArticleInput) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        // Custom onSubmit Handler (z.B. von Dashboard)
        await onSubmit(data);
      } else if (isEditMode && article) {
        await updateArticle(article.id, data);
      } else {
        await createArticle(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save article:', error);
      // Error wird im Store gesetzt, könnte hier Toast anzeigen
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Artikel bearbeiten' : 'Artikel hinzufügen'}
      size="lg"
    >
      <ArticleForm
        article={article}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
