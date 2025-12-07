import { useState, useEffect, useRef } from 'react';
import type { Article, ArticleInput, ArticleStatus } from '../../../shared/types/article';
import { STATUS_OPTIONS } from '../../../shared/types/article';
import { useCategoryStore } from '../../stores';
import { Button } from '../ui';

interface ArticleFormProps {
  readonly article?: Article; // undefined = Create, defined = Edit
  readonly onSubmit: (data: ArticleInput) => Promise<void>;
  readonly onCancel: () => void;
  readonly isSubmitting?: boolean;
}

interface FormData {
  title: string;
  categoryId: number | null;
  status: ArticleStatus;
  purchasePlatform: string;
  purchasePrice: string;
  purchaseDate: string;
  shippingCostIn: string;
  salePlatform: string;
  salePrice: string;
  saleDate: string;
  fees: string;
  shippingCostOut: string;
}

const initialFormData: FormData = {
  title: '',
  categoryId: null,
  status: 'in_stock',
  purchasePlatform: '',
  purchasePrice: '',
  purchaseDate: '',
  shippingCostIn: '',
  salePlatform: '',
  salePrice: '',
  saleDate: '',
  fees: '',
  shippingCostOut: '',
};

export function ArticleForm({ article, onSubmit, onCancel, isSubmitting }: ArticleFormProps) {
  const isEditMode = article !== undefined;

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync formData when article prop changes (Edit mode)
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        categoryId: article.categoryId,
        status: article.status,
        purchasePlatform: article.purchasePlatform ?? '',
        purchasePrice: String(article.purchasePrice),
        purchaseDate: article.purchaseDate ?? '',
        shippingCostIn: String(article.shippingCostIn),
        salePlatform: article.salePlatform ?? '',
        salePrice: article.salePrice === null ? '' : String(article.salePrice),
        saleDate: article.saleDate ?? '',
        fees: String(article.fees),
        shippingCostOut: String(article.shippingCostOut),
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [article]);
  const { categories, loadCategories } = useCategoryStore();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const purchasePriceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Titel ist erforderlich';
    }

    const purchasePrice = Number.parseFloat(formData.purchasePrice);
    if (formData.purchasePrice === '' || Number.isNaN(purchasePrice)) {
      newErrors.purchasePrice = 'Kaufpreis ist erforderlich';
    } else if (purchasePrice < 0) {
      newErrors.purchasePrice = 'Kaufpreis muss positiv sein';
    }

    setErrors(newErrors);

    // Fokus auf erstes fehlerhaftes Feld setzen
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.title) {
        titleInputRef.current?.focus();
      } else if (newErrors.purchasePrice) {
        purchasePriceInputRef.current?.focus();
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const input: ArticleInput = {
      title: formData.title.trim(),
      categoryId: formData.categoryId,
      status: formData.status,
      purchasePlatform: formData.purchasePlatform || undefined,
      purchasePrice: Number.parseFloat(formData.purchasePrice),
      purchaseDate: formData.purchaseDate || undefined,
      shippingCostIn: formData.shippingCostIn ? Number.parseFloat(formData.shippingCostIn) : undefined,
      salePlatform: formData.salePlatform || undefined,
      salePrice: formData.salePrice ? Number.parseFloat(formData.salePrice) : undefined,
      saleDate: formData.saleDate || undefined,
      fees: formData.fees ? Number.parseFloat(formData.fees) : undefined,
      shippingCostOut: formData.shippingCostOut ? Number.parseFloat(formData.shippingCostOut) : undefined,
    };

    await onSubmit(input);
  };

  const handleChange = (field: keyof FormData, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const inputClass = (field: string) =>
    `mt-1 block w-full rounded-md border ${
      errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    } px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`;

  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basis-Sektion */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
          Basis
        </h3>
        <div>
          <label htmlFor="article-title" className={labelClass}>
            Titel <span className="text-red-500">*</span>
          </label>
          <input
            ref={titleInputRef}
            id="article-title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={inputClass('title')}
            placeholder="z.B. Nike Air Max 90"
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="article-category" className={labelClass}>Kategorie</label>
          <select
            id="article-category"
            value={formData.categoryId ?? ''}
            onChange={(e) =>
              handleChange('categoryId', e.target.value ? Number.parseInt(e.target.value) : null)
            }
            className={inputClass('categoryId')}
          >
            <option value="">Keine Kategorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="article-status" className={labelClass}>Status</label>
          <select
            id="article-status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as ArticleStatus)}
            className={inputClass('status')}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Einkauf-Sektion */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
          Einkauf
        </h3>
        <div>
          <label htmlFor="article-purchase-platform" className={labelClass}>Plattform</label>
          <input
            id="article-purchase-platform"
            type="text"
            value={formData.purchasePlatform}
            onChange={(e) => handleChange('purchasePlatform', e.target.value)}
            className={inputClass('purchasePlatform')}
            placeholder="z.B. eBay, Kleinanzeigen"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="article-purchase-price" className={labelClass}>
              Kaufpreis (€) <span className="text-red-500">*</span>
            </label>
            <input
              ref={purchasePriceInputRef}
              id="article-purchase-price"
              type="number"
              step="0.01"
              min="0"
              value={formData.purchasePrice}
              onChange={(e) => handleChange('purchasePrice', e.target.value)}
              className={inputClass('purchasePrice')}
              placeholder="0.00"
            />
            {errors.purchasePrice && (
              <p className="mt-1 text-sm text-red-500">{errors.purchasePrice}</p>
            )}
          </div>
          <div>
            <label htmlFor="article-purchase-date" className={labelClass}>Kaufdatum</label>
            <input
              id="article-purchase-date"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => handleChange('purchaseDate', e.target.value)}
              className={inputClass('purchaseDate')}
            />
          </div>
        </div>

        <div>
          <label htmlFor="article-shipping-cost-in" className={labelClass}>Versandkosten (eingehend, €)</label>
          <input
            id="article-shipping-cost-in"
            type="number"
            step="0.01"
            min="0"
            value={formData.shippingCostIn}
            onChange={(e) => handleChange('shippingCostIn', e.target.value)}
            className={inputClass('shippingCostIn')}
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Verkauf-Sektion */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
          Verkauf
        </h3>
        <div>
          <label htmlFor="article-sale-platform" className={labelClass}>Plattform</label>
          <input
            id="article-sale-platform"
            type="text"
            value={formData.salePlatform}
            onChange={(e) => handleChange('salePlatform', e.target.value)}
            className={inputClass('salePlatform')}
            placeholder="z.B. eBay, Vinted"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="article-sale-price" className={labelClass}>Verkaufspreis (€)</label>
            <input
              id="article-sale-price"
              type="number"
              step="0.01"
              min="0"
              value={formData.salePrice}
              onChange={(e) => handleChange('salePrice', e.target.value)}
              className={inputClass('salePrice')}
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="article-sale-date" className={labelClass}>Verkaufsdatum</label>
            <input
              id="article-sale-date"
              type="date"
              value={formData.saleDate}
              onChange={(e) => handleChange('saleDate', e.target.value)}
              className={inputClass('saleDate')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="article-fees" className={labelClass}>Gebühren (€)</label>
            <input
              id="article-fees"
              type="number"
              step="0.01"
              min="0"
              value={formData.fees}
              onChange={(e) => handleChange('fees', e.target.value)}
              className={inputClass('fees')}
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="article-shipping-cost-out" className={labelClass}>Versandkosten (ausgehend, €)</label>
            <input
              id="article-shipping-cost-out"
              type="number"
              step="0.01"
              min="0"
              value={formData.shippingCostOut}
              onChange={(e) => handleChange('shippingCostOut', e.target.value)}
              className={inputClass('shippingCostOut')}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Abbrechen
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Speichern...' : (isEditMode ? 'Speichern' : 'Erstellen')}
        </Button>
      </div>
    </form>
  );
}
