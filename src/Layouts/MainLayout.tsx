import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>SiteForge Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
