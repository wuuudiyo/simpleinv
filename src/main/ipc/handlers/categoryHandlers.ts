import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../../shared/ipc/channels';
import type { CategoryInput } from '../../../shared/types/category';
import { CategoryRepository } from '../../database/repositories/categoryRepository';
import { databaseService } from '../../database';

let categoryRepository: CategoryRepository | null = null;

function getRepository(): CategoryRepository {
  categoryRepository ??= new CategoryRepository(databaseService.getDb());
  return categoryRepository;
}

export function registerCategoryHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.CATEGORIES.GET_ALL, () => {
    return getRepository().getAll();
  });

  ipcMain.handle(IPC_CHANNELS.CATEGORIES.CREATE, (_, input: CategoryInput) => {
    const repo = getRepository();
    if (repo.existsByName(input.name)) {
      throw new Error(`Kategorie "${input.name}" existiert bereits`);
    }
    return repo.create(input);
  });

  ipcMain.handle(IPC_CHANNELS.CATEGORIES.UPDATE, (_, id: number, input: CategoryInput) => {
    const repo = getRepository();
    if (repo.existsByName(input.name, id)) {
      throw new Error(`Kategorie "${input.name}" existiert bereits`);
    }
    return repo.update(id, input);
  });

  ipcMain.handle(IPC_CHANNELS.CATEGORIES.DELETE, (_, id: number) => {
    getRepository().delete(id);
  });
}
