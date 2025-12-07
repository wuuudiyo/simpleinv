import type { ElectronApi } from './types';

declare global {
  interface Window {
    api: ElectronApi;
  }

  // eslint-disable-next-line no-var
  var api: ElectronApi;
}

export {};
