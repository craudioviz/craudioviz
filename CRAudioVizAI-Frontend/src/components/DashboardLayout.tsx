import React from 'react';

export default function DashboardLayout() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontFamily: 'sans-serif',
      }}
    >
      <aside
        style={{
          width: '240px',
          backgroundColor: '#111',
          color: '#fff',
          padding: '1rem',
        }}
      >
        <h2>SiteForge</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Dashboard</li>
            <li>My Apps</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header
          style={{
            backgroundColor: '#eee',
            padding: '1rem',
            borderBottom: '1px solid #ccc',
          }}
        >
          <h1>Welcome, Creator</h1>
        </header>

        <main
          style={{
            padding: '2rem',
          }}
        >
          <h2>Your Tools</h2>
          <p>Start building your branded apps here.</p>
        </main>
      </div>
    </div>
  );
}
