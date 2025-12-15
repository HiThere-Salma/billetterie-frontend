import { useEffect, useMemo, useState } from "react";
import type { Event } from "../types/Event";
import { fetchEvents } from "../services/eventsApi";
import { Link } from "react-router-dom";

export default function ClientHomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEvents();
      setEvents(data);
    } catch (e) {
      console.error(e);
      setError("Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter((ev) =>
      `${ev.name} ${ev.location ?? ""} ${ev.date ?? ""}`.toLowerCase().includes(q)
    );
  }, [events, query]);

  return (
    <div>
      <div style={topRow}>
        <div>
          <h1 style={{ margin: 0 }}>Événements</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
            Découvrez et réservez vos billets.
          </p>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un événement..."
          style={search}
        />
      </div>

      <div style={grid}>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p>Aucun événement trouvé.</p>
        )}

        {!loading && !error && filtered.map((ev) => (
          <div key={ev.id} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{ev.name}</div>
                <div style={{ color: "#6b7280", marginTop: 6 }}>
                  📍 {ev.location || "—"} <br />
                  🗓️ {ev.date || "—"}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link to={`/events/${ev.id}`} style={btnPrimary}>
                  Voir détails
                </Link>
                <Link to={`/checkout/${ev.id}`} style={btnSecondary}>
                  Réserver
                </Link>
              </div>
            </div>

            {ev.description && (
              <p style={{ marginTop: 12, color: "#374151" }}>
                {ev.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const topRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  marginBottom: 14,
};

const search: React.CSSProperties = {
  height: 40,
  width: 320,
  maxWidth: "60vw",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  padding: "0 12px",
  outline: "none",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 14,
};

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  padding: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};

const btnPrimary: React.CSSProperties = {
  display: "inline-block",
  textAlign: "center",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 12,
  background: "#2563eb",
  color: "white",
  fontWeight: 700,
};

const btnSecondary: React.CSSProperties = {
  display: "inline-block",
  textAlign: "center",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 12,
  background: "#111827",
  color: "white",
  fontWeight: 700,
};
