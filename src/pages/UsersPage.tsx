import { useEffect, useMemo, useState } from 'react';
import type { User, UserRole } from '../types/User';
import { createUser, deleteUser, fetchUsers } from '../services/usersApi';

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // search
  const [query, setQuery] = useState('');

  // modal delete
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // modal add user
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: '',
    role: 'CLIENT' as UserRole,
  });

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
      setError("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      `${u.nom} ${u.email} ${u.role}`.toLowerCase().includes(q)
    );
  }, [users, query]);

  function roleBadgeStyle(role: UserRole) {
    switch (role) {
      case 'ADMIN':
        return { background: '#fee2e2', color: '#b91c1c' };
      case 'ORGANIZER':
        return { background: '#e0e7ff', color: '#3730a3' };
      default:
        return { background: '#dcfce7', color: '#166534' };
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await deleteUser(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e) {
      console.error(e);
      alert("Suppression impossible.");
    } finally {
      setDeleteLoading(false);
    }
  }

    async function submitAdd(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nom.trim() || !form.email.trim() || !form.password.trim()) {
      alert('Nom, email et mot de passe sont obligatoires.');
      return;
    }

    try {
      setAddLoading(true);
      const created = await createUser({
        nom: form.nom.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });

      setUsers((prev) => [created, ...prev]);
      setIsAddOpen(false);
      setForm({ nom: '', email: '', password: '', role: 'CLIENT' });
    } catch (e: any) {
      console.error(e);

      const status = e?.response?.status;
      const backendMsg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        JSON.stringify(e?.response?.data);

      alert(`Création impossible.\nStatus: ${status}\nMessage: ${backendMsg}`);
    } finally {
      setAddLoading(false);
    }
  }


  return (
    <div style={{ width: '100%' }}>
      <div style={headerRow}>
        <div>
          <h2 style={{ margin: 0 }}>Gestion des utilisateurs</h2>
          <p style={{ margin: '6px 0 0', color: '#6b7280' }}>
            {users.length} utilisateur(s)
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom, email, rôle..."
            style={searchInput}
          />
          <button onClick={() => setIsAddOpen(true)} style={primaryBtn}>
            + Ajouter
          </button>
        </div>
      </div>

      <div style={card}>
        {loading && <p style={{ padding: 16 }}>Chargement...</p>}
        {error && <p style={{ padding: 16, color: '#b91c1c' }}>{error}</p>}

        {!loading && !error && (
          <div style={{ overflowX: 'auto' }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>ID</th>
                  <th style={th}>Nom</th>
                  <th style={th}>Email</th>
                  <th style={th}>Rôle</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: 16 }}>
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id}>
                      <td style={td}>{u.id}</td>
                      <td style={td}>{u.nom}</td>
                      <td style={td}>{u.email}</td>
                      <td style={td}>
                        <span style={{ ...badge, ...roleBadgeStyle(u.role) }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={td}>
                        <button
                          style={dangerBtn}
                          onClick={() => setDeleteTarget(u)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Delete */}
      {deleteTarget && (
        <div style={overlay}>
          <div style={modal}>
            <h3 style={{ marginTop: 0 }}>Confirmer la suppression</h3>
            <p style={{ color: '#374151' }}>
              Supprimer <b>{deleteTarget.nom}</b> ({deleteTarget.email}) ?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button style={secondaryBtn} onClick={() => setDeleteTarget(null)}>
                Annuler
              </button>
              <button
                style={dangerBtn}
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? '...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add */}
      {isAddOpen && (
        <div style={overlay}>
          <div style={modal}>
            <h3 style={{ marginTop: 0 }}>Ajouter un utilisateur</h3>

            <form onSubmit={submitAdd}>
              <div style={field}>
                <label style={label}>Nom</label>
                <input
                  style={input}
                  value={form.nom}
                  onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
                />
              </div>

              <div style={field}>
                <label style={label}>Email</label>
                <input
                  style={input}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                />
              </div>

              <div style={field}>
                <label style={label}>Mot de passe</label>
                <input
                  style={input}
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                />
              </div>

              <div style={field}>
                <label style={label}>Rôle</label>
                <select
                  style={input}
                  value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as UserRole }))}
                >
                  <option value="CLIENT">CLIENT</option>
                  <option value="ORGANIZER">ORGANIZER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  style={secondaryBtn}
                  onClick={() => setIsAddOpen(false)}
                >
                  Annuler
                </button>
                <button type="submit" style={primaryBtn} disabled={addLoading}>
                  {addLoading ? '...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* styles */
const headerRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  marginBottom: 12,
};

const card: React.CSSProperties = {
  width: '100%',
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  overflow: 'hidden',
};

const table: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '14px 16px',
  fontSize: 13,
  color: '#374151',
  background: '#f3f4f6',
  borderBottom: '1px solid #e5e7eb',
};

const td: React.CSSProperties = {
  padding: '14px 16px',
  borderBottom: '1px solid #eef2f7',
  fontSize: 14,
  color: '#111827',
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  padding: '4px 10px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

const searchInput: React.CSSProperties = {
  height: 38,
  width: 320,
  maxWidth: '55vw',
  borderRadius: 10,
  border: '1px solid #e5e7eb',
  padding: '0 12px',
  outline: 'none',
};

const primaryBtn: React.CSSProperties = {
  height: 38,
  padding: '0 14px',
  borderRadius: 10,
  border: 'none',
  cursor: 'pointer',
  background: '#2563eb',
  color: 'white',
  fontWeight: 600,
};

const secondaryBtn: React.CSSProperties = {
  height: 38,
  padding: '0 14px',
  borderRadius: 10,
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
  background: '#fff',
  color: '#111827',
  fontWeight: 600,
};

const dangerBtn: React.CSSProperties = {
  height: 34,
  padding: '0 12px',
  borderRadius: 10,
  border: 'none',
  cursor: 'pointer',
  background: '#ef4444',
  color: 'white',
  fontWeight: 600,
};

const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.35)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  zIndex: 9999,
};

const modal: React.CSSProperties = {
  width: 520,
  maxWidth: '95vw',
  background: '#fff',
  borderRadius: 14,
  padding: 18,
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
};

const field: React.CSSProperties = { marginBottom: 12 };
const label: React.CSSProperties = { display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 };
const input: React.CSSProperties = {
  width: '100%',
  height: 40,
  borderRadius: 10,
  border: '1px solid #e5e7eb',
  padding: '0 12px',
  outline: 'none',
};

export default UsersPage;
