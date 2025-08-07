import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';


export default function DebugOverlay() {
  const { user, session, loading } = useAuth();
  const location = useLocation();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        padding: '1rem',
        fontSize: '0.75rem',
        maxWidth: '400px',
        zIndex: 9999,
        borderTopLeftRadius: '8px',
        fontFamily: 'monospace',
      }}
    >
      <div><strong>🔍 Debug Overlay</strong></div>
      <div>📍 Route: <code>{location.pathname}</code></div>
      <div>⏳ Loading: <code>{String(loading)}</code></div>
      <div>👤 User: <code>{user?.email ?? 'null'}</code></div>
      <div>🆔 Session: <code>{session?.access_token?.slice(0, 12) ?? 'null'}...</code></div>
    </div>
  );
}
