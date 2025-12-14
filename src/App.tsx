import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UsersPage from './pages/UsersPage';
import EventsPage from './pages/EventsPage';

function DashboardPage() {
  return <h2>Dashboard global</h2>;
}

function TicketsPage() {
  return <h2>Gestion des billets</h2>;
}

function SalesPage() {
  return <h2>Ventes & paiements</h2>;
}

function ModerationPage() {
  return <h2>Modération</h2>;
}

function ReportsPage() {
  return <h2>Rapports</h2>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/users" replace />} />

      {/* ✅ Layout */}
      <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="events" element={<EventsPage />} />
      <Route path="tickets" element={<TicketsPage />} />
      <Route path="sales" element={<SalesPage />} />
      <Route path="moderation" element={<ModerationPage />} />
      <Route path="reports" element={<ReportsPage />} />
    </Route>

    </Routes>
  );
}

export default App;
