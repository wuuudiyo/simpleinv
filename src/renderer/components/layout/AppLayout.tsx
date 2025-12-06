import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen min-w-[1280px]">
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        {children}
      </main>
    </div>
  );
}
