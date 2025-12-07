import { useState } from 'react';
import { Header } from './Header';
import { SettingsModal } from '../settings';
import { ToastContainer } from '../ui';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen min-w-[1280px]">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      <main className="custom-theme-bg flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        {children}
      </main>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <ToastContainer />
    </div>
  );
}
