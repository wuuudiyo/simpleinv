import { Article, ArticleWithCalculations } from '../types/article';

export function calculateProfit(article: Article): number | null {
  if (article.salePrice === null) return null;
  return (
    article.salePrice -
    article.purchasePrice -
    article.fees -
    article.shippingCostIn -
    article.shippingCostOut
  );
}

export function calculateRoi(article: Article): number | null {
  const profit = calculateProfit(article);
  if (profit === null || article.purchasePrice === 0) return null;
  return Math.round((profit / article.purchasePrice) * 10000) / 100;
}

export function withCalculations(article: Article): ArticleWithCalculations {
  return {
    ...article,
    profit: calculateProfit(article),
    roi: calculateRoi(article),
  };
}
