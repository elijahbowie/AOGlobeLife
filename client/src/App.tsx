import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Onboarding } from './components/Onboarding';
import { useUserStore } from './stores';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Coach } from './pages/Coach';
import { Products } from './pages/Products';
import { Objections } from './pages/Objections';
import { Scripts } from './pages/Scripts';
import { Recruiting } from './pages/Recruiting';
import { Leaderboard } from './pages/Leaderboard';
import { Settings } from './pages/Settings';

function App() {
  const { user } = useUserStore();

  // Show onboarding if not completed
  if (!user.completedOnboarding) {
    return <Onboarding />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/coach/:scenarioId" element={<Coach />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Products />} />
          <Route path="/objections" element={<Objections />} />
          <Route path="/objections/:objectionId" element={<Objections />} />
          <Route path="/scripts" element={<Scripts />} />
          <Route path="/scripts/:scriptId" element={<Scripts />} />
          <Route path="/recruiting" element={<Recruiting />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
