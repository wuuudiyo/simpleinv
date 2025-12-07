import { contextBridge, ipcRenderer } from 'electron';

// IPC Channel constants (inline to avoid import issues with Vite)
const IPC_CHANNELS = {
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
  APP: {
    GET_INFO: 'app:getInfo',
  },
  TEST: {
    PING: 'test:ping',
  },
} as const;

const api = {
  articles: {
    getAll: () => ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.GET_ALL),
    getById: (id: number) =>
      ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.GET_BY_ID, id),
    create: (input: unknown) =>
      ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.CREATE, input),
    update: (id: number, input: unknown) =>
      ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.UPDATE, id, input),
    delete: (id: number) =>
      ipcRenderer.invoke(IPC_CHANNELS.ARTICLES.DELETE, id),
  },
  categories: {
    getAll: () => ipcRenderer.invoke(IPC_CHANNELS.CATEGORIES.GET_ALL),
    create: (input: unknown) =>
      ipcRenderer.invoke(IPC_CHANNELS.CATEGORIES.CREATE, input),
    update: (id: number, input: unknown) =>
      ipcRenderer.invoke(IPC_CHANNELS.CATEGORIES.UPDATE, id, input),
    delete: (id: number) =>
      ipcRenderer.invoke(IPC_CHANNELS.CATEGORIES.DELETE, id),
  },
  settings: {
    get: (key: string) => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS.GET, key),
    set: (key: string, value: unknown) =>
      ipcRenderer.invoke(IPC_CHANNELS.SETTINGS.SET, key, value),
  },
  metrics: {
    getDashboard: () => ipcRenderer.invoke(IPC_CHANNELS.METRICS.GET_DASHBOARD),
  },
  app: {
    getInfo: () => ipcRenderer.invoke(IPC_CHANNELS.APP.GET_INFO),
  },
  test: {
    ping: () => ipcRenderer.invoke(IPC_CHANNELS.TEST.PING),
  },
};

contextBridge.exposeInMainWorld('api', api);
