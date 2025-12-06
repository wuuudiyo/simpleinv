# 5. API/IPC-Spezifikation

## 5.1 IPC Channel Definitionen

```typescript
// src/shared/ipc/channels.ts

export const IPC_CHANNELS = {
  ARTICLES: {
    GET_ALL: 'articles:getAll',
    GET_BY_ID: 'articles:getById',
    CREATE: 'articles:create',
    UPDATE: 'articles:update',
    DELETE: 'articles:delete',
  },
  CATEGORIES: {
    GET_ALL: 'categories:getAll',
    CREATE: 'categories:create',
    UPDATE: 'categories:update',
    DELETE: 'categories:delete',
  },
  SETTINGS: {
    GET: 'settings:get',
    SET: 'settings:set',
  },
  METRICS: {
    GET_DASHBOARD: 'metrics:getDashboard',
  },
} as const;
```

## 5.2 API Type Definitionen

```typescript
// src/shared/ipc/types.ts

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

export interface ElectronApi {
  articles: ArticleApi;
  categories: CategoryApi;
  settings: SettingsApi;
  metrics: MetricsApi;
}
```

## 5.3 Preload Script

```typescript
// src/preload/index.ts

import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../shared/ipc/channels';
import type { ElectronApi } from '../shared/ipc/types';

const api: ElectronApi = {
  articles: {
    getAll: () => ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.GET_ALL),
    getById: (id) => ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.GET_BY_ID, id),
    create: (input) => ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.CREATE, input),
    update: (id, input) => ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.UPDATE, id, input),
    delete: (id) => ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.DELETE, id),
  },
  categories: {
    getAll: () => ipcRenderer.invoke(IPC_CHANNELS.CATEGORIES.GET_ALL),
    create: (input) => ipcRenderer.invoke(IPC_CHANNELS.CATEGORIES.CREATE, input),
    update: (id, input) => ipcRenderer.invoke(IPC_CHANNELS.CATEGORIES.UPDATE, id, input),
    delete: (id) => ipcRenderer.invoke(IPC_CHANNELS.CATEGORIES.DELETE, id),
  },
  settings: {
    get: (key) => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS.GET, key),
    set: (key, value) => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS.SET, key, value),
  },
  metrics: {
    getDashboard: () => ipcRenderer.invoke(IPC_CHANNELS.METRICS.GET_DASHBOARD),
  },
};

contextBridge.exposeInMainWorld('api', api);
```

---
