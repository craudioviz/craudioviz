import React from 'react';

const LogoCraft: React.FC = () => {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#222' }}>🎨 LogoCraft AI</h1>
        <p style={{ color: '#555' }}>
          Design unique logos and brand visuals powered by AI. Describe your concept and let the creativity flow.
        </p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Logo Prompt</h2>
        <textarea
          placeholder="Describe your brand, style, and visual ideas..."
          style={{
            width: '100%',
            height: '120px',
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '1rem'
          }}
        />
        <button style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#00cc66',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Generate Logo
        </button>
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Coming Soon</h2>
        <ul style={{ color: '#777' }}>
          <li>🖼️ Logo Preview & Variations</li>
          <li>🎯 Style & Color Customization</li>
          <li>📁 Export in Multiple Formats</li>
        </ul>
      </section>
    </div>
  );
};

export default LogoCraft;
