import React from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header style={{ background: '#eee', padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
