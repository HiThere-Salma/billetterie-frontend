import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css';


function AdminLayout() {
  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-logo">🎟️ Billeterie Admin</div>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className="admin-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className="admin-link">
            Utilisateurs
          </NavLink>
          <NavLink to="/admin/events" className="admin-link">
            Événements
          </NavLink>
          <NavLink to="/admin/tickets" className="admin-link">
            Billets & Catégories
          </NavLink>
          <NavLink to="/admin/sales" className="admin-link">
            Ventes & Paiements
          </NavLink>
          <NavLink to="/admin/moderation" className="admin-link">
            Modération
          </NavLink>
          <NavLink to="/admin/reports" className="admin-link">
            Rapports
          </NavLink>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Panel Administrateur</h1>
        </header>

        <main className="admin-content">
          {/* 🔥 C’EST ICI QUE LES PAGES S’AFFICHENT */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
