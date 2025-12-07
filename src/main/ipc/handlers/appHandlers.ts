import { ipcMain, app } from 'electron';
import { IPC_CHANNELS } from '../../../shared/ipc/channels';
import { databaseService } from '../../database';
import type { AppInfo } from '../../../shared/types/settings';

export function registerAppHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.APP.GET_INFO, (): AppInfo => {
    return {
      version: app.getVersion(),
      dbPath: databaseService.getDbPath(),
    };
  });
}
