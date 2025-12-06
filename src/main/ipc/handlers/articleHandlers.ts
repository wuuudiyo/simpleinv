import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../../../shared/ipc/channels';
import type { ArticleInput } from '../../../shared/types/article';
import { ArticleRepository } from '../../database/repositories/articleRepository';
import { databaseService } from '../../database';

let articleRepository: ArticleRepository | null = null;

function getRepository(): ArticleRepository {
  if (!articleRepository) {
    articleRepository = new ArticleRepository(databaseService.getDb());
  }
  return articleRepository;
}

export function registerArticleHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.ARTICLES.GET_ALL, () => {
    try {
      return getRepository().getAll();
    } catch (error) {
      console.error('[ArticleHandlers] getAll error:', error);
      throw error;
    }
  });

  ipcMain.handle(IPC_CHANNELS.ARTICLES.GET_BY_ID, (_, id: number) => {
    try {
      return getRepository().getById(id);
    } catch (error) {
      console.error('[ArticleHandlers] getById error:', error);
      throw error;
    }
  });

  ipcMain.handle(IPC_CHANNELS.ARTICLES.CREATE, (_, input: ArticleInput) => {
    try {
      // Validierung
      if (!input.title || input.title.trim() === '') {
        throw new Error('Titel ist erforderlich');
      }
      if (input.purchasePrice === undefined || input.purchasePrice < 0) {
        throw new Error('Kaufpreis muss >= 0 sein');
      }
      return getRepository().create(input);
    } catch (error) {
      console.error('[ArticleHandlers] create error:', error);
      throw error;
    }
  });

  ipcMain.handle(IPC_CHANNELS.ARTICLES.UPDATE, (_, id: number, input: Partial<ArticleInput>) => {
    try {
      // Prüfen ob Artikel existiert
      const existing = getRepository().getById(id);
      if (!existing) {
        throw new Error(`Artikel mit ID ${id} nicht gefunden`);
      }

      // Validierung der Pflichtfelder wenn sie geändert werden
      if (input.title !== undefined && !input.title.trim()) {
        throw new Error('Titel darf nicht leer sein');
      }
      if (input.purchasePrice !== undefined && input.purchasePrice < 0) {
        throw new Error('Kaufpreis muss >= 0 sein');
      }

      return getRepository().update(id, input);
    } catch (error) {
      console.error('[ArticleHandlers] update error:', error);
      throw error;
    }
  });

  ipcMain.handle(IPC_CHANNELS.ARTICLES.DELETE, (_, id: number) => {
    try {
      // Prüfen ob Artikel existiert
      const existing = getRepository().getById(id);
      if (!existing) {
        throw new Error(`Artikel mit ID ${id} nicht gefunden`);
      }

      getRepository().delete(id);
      // Kein Rückgabewert (void)
    } catch (error) {
      console.error('[ArticleHandlers] delete error:', error);
      throw error;
    }
  });
}
