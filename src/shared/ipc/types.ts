import type { Article, ArticleInput } from '../types/article';
import type { Category, CategoryInput } from '../types/category';
import type { AppSettings } from '../types/settings';

export interface ArticleApi {
  getAll(): Promise<Article[]>;
  getById(id: number): Promise<Article | null>;
  create(input: ArticleInput): Promise<Article>;
  update(id: number, input: Partial<ArticleInput>): Promise<Article>;
  delete(id: number): Promise<void>;
}

export interface CategoryApi {
  getAll(): Promise<Category[]>;
  create(input: CategoryInput): Promise<Category>;
  update(id: number, input: CategoryInput): Promise<Category>;
  delete(id: number): Promise<void>;
}

export interface SettingsApi {
  get<K extends keyof AppSettings>(key: K): Promise<AppSettings[K] | null>;
  set<K extends keyof AppSettings>(key: K, value: AppSettings[K]): Promise<void>;
}

export interface DashboardMetrics {
  totalProfit: number;
  openInventoryValue: number;
  unsoldCount: number;
}

export interface MetricsApi {
  getDashboard(): Promise<DashboardMetrics>;
}

export interface TestApi {
  ping(): Promise<string>;
}

export interface ElectronApi {
  articles: ArticleApi;
  categories: CategoryApi;
  settings: SettingsApi;
  metrics: MetricsApi;
  test: TestApi;
}
