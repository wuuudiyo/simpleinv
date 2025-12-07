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
  APP: {
    GET_INFO: 'app:getInfo',
  },
  TEST: {
    PING: 'test:ping',
  },
} as const;
