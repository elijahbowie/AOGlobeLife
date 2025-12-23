import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="min-h-screen bg-apex-900">
      <Sidebar />
      <main className="pl-72 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
