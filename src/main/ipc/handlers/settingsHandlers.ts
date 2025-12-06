import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../../shared/ipc/channels';
import { SettingsRepository } from '../../database/repositories/settingsRepository';
import { databaseService } from '../../database';

let settingsRepository: SettingsRepository | null = null;

function getRepository(): SettingsRepository {
  if (!settingsRepository) {
    settingsRepository = new SettingsRepository(databaseService.getDb());
  }
  return settingsRepository;
}

export function registerSettingsHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.SETTINGS.GET, (_, key: string) => {
    return getRepository().getJson(key);
  });

  ipcMain.handle(IPC_CHANNELS.SETTINGS.SET, (_, key: string, value: unknown) => {
    getRepository().setJson(key, value);
  });
}
