export type ArticleStatus = 'in_stock' | 'listed' | 'sold' | 'returned';

export interface Article {
  id: number;
  title: string;
  categoryId: number | null;
  status: ArticleStatus;
  purchasePlatform: string | null;
  purchasePrice: number;
  purchaseDate: string | null;
  shippingCostIn: number;
  salePlatform: string | null;
  salePrice: number | null;
  saleDate: string | null;
  fees: number;
  shippingCostOut: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleInput {
  title: string;
  categoryId: number | null;
  status: ArticleStatus;
  purchasePlatform?: string;
  purchasePrice: number;
  purchaseDate?: string;
  shippingCostIn?: number;
  salePlatform?: string;
  salePrice?: number;
  saleDate?: string;
  fees?: number;
  shippingCostOut?: number;
}

export interface ArticleWithCalculations extends Article {
  profit: number | null;
  roi: number | null;
}

export const STATUS_OPTIONS: { value: ArticleStatus; label: string }[] = [
  { value: 'in_stock', label: 'In Stock' },
  { value: 'listed', label: 'Listed' },
  { value: 'sold', label: 'Sold' },
  { value: 'returned', label: 'Returned' },
];

export const STATUS_CONFIG: Record<ArticleStatus, { label: string; className: string }> = {
  in_stock: {
    label: 'In Stock',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  listed: {
    label: 'Listed',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  },
  sold: {
    label: 'Sold',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  returned: {
    label: 'Returned',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
};
