import { useEffect, useMemo, useState } from 'react';
import type { Event } from '../types/Event';
import { fetchEvents, createEvent, deleteEvent } from '../services/eventsApi';

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    date: '',
  });

  async function loadEvents() {
    try {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
    } catch (e) {
      setError("Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return events.filter(e =>
      `${e.name} ${e.location}`.toLowerCase().includes(q)
    );
  }, [events, query]);

    async function submitAdd(e: React.FormEvent) {
  e.preventDefault();
  await createEvent(form);     // crée
  await loadEvents();          // recharge la liste depuis GET
  setIsAddOpen(false);
  setForm({ name: '', location: '', description: '', date: '' });
    }


  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteEvent(deleteTarget.id);
    setEvents(prev => prev.filter(e => e.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div>
      <h2>Gestion des événements</h2>

      <input
        placeholder="Recherche..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <button onClick={() => setIsAddOpen(true)}>+ Ajouter</button>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Lieu</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(ev => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.name}</td>
              <td>{ev.location}</td>
              <td>{ev.date}</td>
              <td>
                <button onClick={() => setDeleteTarget(ev)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD MODAL */}
      {isAddOpen && (
        <form onSubmit={submitAdd}>
          <input placeholder="Nom" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Lieu" value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })} />
          <input type="date" value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })} />
          <textarea placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />
          <button type="submit">Créer</button>
          <button type="button" onClick={() => setIsAddOpen(false)}>Annuler</button>
        </form>
      )}

      {/* DELETE */}
      {deleteTarget && (
        <div>
          Supprimer {deleteTarget.name} ?
          <button onClick={confirmDelete}>Oui</button>
          <button onClick={() => setDeleteTarget(null)}>Non</button>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
