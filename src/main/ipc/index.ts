import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../shared/ipc/channels';
import { registerSettingsHandlers } from './handlers/settingsHandlers';
import { registerCategoryHandlers } from './handlers/categoryHandlers';
import { registerArticleHandlers } from './handlers/articleHandlers';

export function registerIpcHandlers(): void {
  // Test Handler
  ipcMain.handle(IPC_CHANNELS.TEST.PING, () => 'pong');

  // Settings Handler
  registerSettingsHandlers();

  // Category Handler
  registerCategoryHandlers();

  // Article Handler
  registerArticleHandlers();

  // Metrics Handler werden in Story 3.x implementiert
}
