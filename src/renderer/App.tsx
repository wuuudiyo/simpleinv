import { AppLayout } from './components/layout';
import { DashboardPage } from './components/dashboard';
import { useTheme } from './hooks';

function App() {
  // Initialize theme on app start
  useTheme();

  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  );
}

export default App;
