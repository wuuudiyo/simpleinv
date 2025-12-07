import { useEffect, useState } from 'react';
import type { AppInfo } from '../../../shared/types/settings';

export function InfoSection() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    window.api.app.getInfo().then(setAppInfo);
  }, []);

  if (!appInfo) {
    return (
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Info</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">Lade...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900 dark:text-gray-100">Info</h3>
      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Version</span>
          <span className="text-gray-900 dark:text-gray-100">{appInfo.version}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">Datenbank</span>
          <span
            className="text-gray-900 dark:text-gray-100 text-xs truncate"
            title={appInfo.dbPath}
          >
            {appInfo.dbPath}
          </span>
        </div>
      </div>
    </div>
  );
}
