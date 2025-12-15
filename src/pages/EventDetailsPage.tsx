import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import http  from "../services/http";

type EventDto = {
  id: number;
  name: string;
  location: string;
  description: string;
  date: string;
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await http.get<EventDto>(`/api/events/${id}`);
        setEvent(res.data);
      } catch (e) {
        console.error(e);
        setError("Impossible de charger les détails de l'événement.");
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Événement introuvable.</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 8 }}>{event.name}</h2>

      <p style={{ margin: "6px 0", color: "#374151" }}>
        <b>Lieu:</b> {event.location || "-"}
      </p>
      <p style={{ margin: "6px 0", color: "#374151" }}>
        <b>Date:</b> {event.date || "-"}
      </p>

      <div style={{ marginTop: 12, padding: 14, border: "1px solid #e5e7eb", borderRadius: 10 }}>
        <h3 style={{ marginTop: 0 }}>Description</h3>
        <p style={{ margin: 0, color: "#111827" }}>{event.description || "-"}</p>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <Link to="/" style={linkBtn}>← Retour</Link>
        <Link to={`/checkout/${event.id}`} style={primaryBtn}>Acheter un billet</Link>
      </div>
    </div>
  );
}

const linkBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 38,
  padding: "0 14px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  textDecoration: "none",
  color: "#111827",
  fontWeight: 600,
};

const primaryBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 38,
  padding: "0 14px",
  borderRadius: 10,
  border: "none",
  textDecoration: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: 700,
};
