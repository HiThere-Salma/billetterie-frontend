import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Email et mot de passe sont obligatoires.");
      return;
    }

    try {
      setLoading(true);

      // ✅ TEMP: mock login (à remplacer par ton endpoint user-service)
      localStorage.setItem("client_email", email.trim());
      localStorage.setItem("is_logged_in", "true");

      nav("/"); // ou nav("/my-tickets")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 8 }}>Connexion</h2>
      <p style={{ marginTop: 0, color: "#6b7280" }}>
        Connecte-toi pour accéder à tes billets.
      </p>

      <form onSubmit={onSubmit} style={card}>
        <div style={field}>
          <label style={label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            placeholder="ex: client@email.com"
          />
        </div>

        <div style={field}>
          <label style={label}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" style={primaryBtn} disabled={loading}>
          {loading ? "..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
};

const field: React.CSSProperties = { marginBottom: 12 };
const label: React.CSSProperties = { display: "block", fontSize: 13, color: "#374151", marginBottom: 6 };

const input: React.CSSProperties = {
  width: "100%",
  height: 40,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  padding: "0 12px",
  outline: "none",
};

const primaryBtn: React.CSSProperties = {
  width: "100%",
  height: 40,
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "#2563eb",
  color: "white",
  fontWeight: 700,
};
