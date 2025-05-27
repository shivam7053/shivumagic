

'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [statusUpdates, setStatusUpdates] = useState({});
  const [noteUpdates, setNoteUpdates] = useState({});

  const fetchEntries = async () => {
    setError('');
    setData(null);
    try {
      const res = await fetch('/api/admin/entries', {
        headers: {
          'x-admin-password': password,
        },
      });
      if (res.status === 401) {
        setError('Unauthorized: Wrong password');
        return;
      }
      if (!res.ok) {
        setError('Failed to fetch data');
        return;
      }
      const json = await res.json();
      setData(json);
    } catch {
      setError('Network error');
    }
  };

  const handleStatusChange = (id, value) => {
    setStatusUpdates({ ...statusUpdates, [id]: value });
  };

  const handleNoteChange = (id, value) => {
    setNoteUpdates({ ...noteUpdates, [id]: value });
  };

  const handleSave = async (id) => {
  const status = statusUpdates[id];
  const adminNote = noteUpdates[id];

  try {
    const res = await fetch(`/api/admin/entries`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ id, status, adminNote }),  // <-- include ID here
    });
    if (!res.ok) {
      alert('Failed to update order');
      return;
    }
    fetchEntries(); // refresh data
  } catch {
    alert('Error updating order');
  }
};


  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/reqback.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          borderRadius: 16,
          padding: 30,
          width: '100%',
          maxWidth: 900,
          color: '#fff',
          boxShadow: '0 0 15px rgba(0,0,0,0.6)',
          overflowY: 'auto',
          maxHeight: '90vh',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Admin Dashboard</h1>

        {!data ? (
          <>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '12px 15px',
                width: '100%',
                fontSize: 16,
                borderRadius: 8,
                border: 'none',
                marginBottom: 12,
              }}
            />
            <button
              onClick={fetchEntries}
              style={{
                padding: '12px 15px',
                width: '100%',
                fontSize: 16,
                borderRadius: 8,
                border: 'none',
                backgroundColor: '#4B0082',
                color: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6a1b9a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4B0082')}
            >
              Login
            </button>
            {error && <p style={{ color: 'tomato', marginTop: 12, textAlign: 'center' }}>{error}</p>}
          </>
        ) : (
          <>
            <section style={{ marginBottom: 30 }}>
              <h2 style={{ borderBottom: '2px solid #6a1b9a', paddingBottom: 8 }}>Contact Entries</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {data.contacts.length === 0 && <li>No contacts found</li>}
                {data.contacts.map((c) => (
                  <li
                    key={c._id}
                    style={{
                      backgroundColor: '#311b92',
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 12,
                      boxShadow: 'inset 0 0 5px rgba(255,255,255,0.1)',
                    }}
                  >
                    <strong>{c.name}</strong> ({c.email}): <br />
                    <em>{c.message}</em>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 style={{ borderBottom: '2px solid #6a1b9a', paddingBottom: 8 }}>Order Entries</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {data.orders.length === 0 && <li>No orders found</li>}
                {data.orders.map((o) => (
                  <li
                    key={o._id}
                    style={{
                      backgroundColor: '#311b92',
                      padding: 15,
                      borderRadius: 10,
                      marginBottom: 12,
                      boxShadow: 'inset 0 0 5px rgba(255,255,255,0.1)',
                    }}
                  >
                    <strong>{o.orderId}</strong> <br />
                    <strong>{o.name}</strong> ({o.email}) <br />
                    Service: <strong>{o.service}</strong>, Plan: <strong>{o.plan}</strong> <br />
                    Description: <em>{o.description}</em><br />
                    Status: 
                    <select
                      value={statusUpdates[o._id] || o.status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      style={{ marginLeft: 10, padding: 4, borderRadius: 4 }}
                    >
                      {['Initiate', 'Working', 'Prototype', 'Complete'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <br />
                    Admin Note:
                    <textarea
                      placeholder="Optional notes..."
                      value={noteUpdates[o._id] || o.adminNote}
                      onChange={(e) => handleNoteChange(o._id, e.target.value)}
                      style={{
                        display: 'block',
                        width: '100%',
                        marginTop: 5,
                        marginBottom: 8,
                        padding: 8,
                        borderRadius: 4,
                      }}
                    />
                    <button
                      onClick={() => handleSave(o._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#00c853',
                        color: 'white',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                      }}
                    >
                      Save Changes
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <button
              onClick={() => setData(null)}
              style={{
                marginTop: 24,
                padding: '12px 15px',
                width: '100%',
                fontSize: 16,
                borderRadius: 8,
                border: 'none',
                backgroundColor: '#b71c1c',
                color: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#b71c1c')}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
