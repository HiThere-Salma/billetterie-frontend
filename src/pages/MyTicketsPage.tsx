import { useEffect, useState } from 'react';
import { fetchTickets, deleteTicket } from '../services/ticketsApi';
import type { Ticket } from '../types/Ticket';

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchTickets();
      setTickets(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onDelete(id: number) {
    if (!confirm('Supprimer ce ticket ?')) return;
    await deleteTicket(id);
    setTickets((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <h2>Mes tickets</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : tickets.length === 0 ? (
        <p>Aucun ticket.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th align="left">ID</th>
              <th align="left">EventId</th>
              <th align="left">Qty</th>
              <th align="left">UserId</th>
              <th align="left">Status</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.eventId}</td>
                <td>{t.seatNumber ?? '-'}</td>
                <td>{t.userId ?? '-'}</td>
                <td>{t.status ?? '-'}</td>
                <td>
                  <button onClick={() => onDelete(t.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
