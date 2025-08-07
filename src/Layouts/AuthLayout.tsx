import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        {children}
      </div>
    </div>
  );
}
