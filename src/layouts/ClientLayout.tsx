import { Outlet, NavLink } from "react-router-dom";

export default function ClientLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
      <header style={header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={logo}>🎟️</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Billetterie</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Espace Client</div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <NavLink to="/" style={navLink}>Événements</NavLink>
          <NavLink to="/my-tickets" style={navLink}>Mes billets</NavLink>
          <NavLink to="/login" style={navLink}>Connexion</NavLink>
        </nav>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 18 }}>
        <Outlet />
      </main>

      <footer style={footer}>
        © {new Date().getFullYear()} Billetterie - Client
      </footer>
    </div>
  );
}

const header: React.CSSProperties = {
  height: 64,
  background: "#0b1220",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 18px",
};

const footer: React.CSSProperties = {
  padding: 14,
  textAlign: "center",
  color: "#6b7280",
};

const logo: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 12,
  background: "rgba(255,255,255,0.12)",
  display: "grid",
  placeItems: "center",
  fontSize: 18,
};

const navLink: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontWeight: 600,
  opacity: 0.9,
};
