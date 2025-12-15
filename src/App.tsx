import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";

import UsersPage from "./pages/UsersPage";
import EventsPage from "./pages/EventsPage";
import ClientHomePage from "./pages/ClientHomePage";

// ✅ Client pages (vraies pages)
import EventDetailsPage from "./pages/EventDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import LoginPage from "./pages/LoginPage";

// ✅ Admin placeholders (tu peux garder comme ça pour l’instant)
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

export default function App() {
  return (
    <Routes>
      {/* CLIENT */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<ClientHomePage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        <Route path="checkout/:eventId" element={<CheckoutPage />} />
        <Route path="my-tickets" element={<MyTicketsPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="moderation" element={<ModerationPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
