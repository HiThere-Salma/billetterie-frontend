import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTicket } from '../services/ticketsApi';
import type { Ticket } from '../types/Ticket';

export default function CheckoutPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [userId, setUserId] = useState<number | ''>(''); // tant qu'on n'a pas login

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!eventId) return alert('EventId manquant.');

    try {
      setLoading(true);

      const payload: Omit<Ticket, 'id'> = {
        eventId: Number(eventId),
        quantity: qty,
        ...(userId !== '' ? { userId: Number(userId) } : {}),
        status: 'PENDING',
      };

      await createTicket(payload);

      // après création → page mes tickets
      navigate('/my-tickets');
    } catch (err) {
      console.error(err);
      alert("Impossible de réserver ce ticket.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Réserver un ticket</h2>
      <p>Événement ID: <b>{eventId}</b></p>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        <label>
          Quantité
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            style={{ width: '100%', height: 40 }}
          />
        </label>

        <label>
          User ID (temporaire, si pas encore login)
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value ? Number(e.target.value) : '')}
            style={{ width: '100%', height: 40 }}
            placeholder="ex: 1"
          />
        </label>

        <button disabled={loading} style={{ height: 42 }}>
          {loading ? '...' : 'Confirmer la réservation'}
        </button>
      </form>
    </div>
  );
}
