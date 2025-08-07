import React from 'react';

const SongCraft: React.FC = () => {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#222' }}>🎵 SongCraft AI</h1>
        <p style={{ color: '#555' }}>
          Generate lyrics, melodies, and musical ideas with AI. Start crafting your next hit.
        </p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Lyric Generator</h2>
        <textarea
          placeholder="Describe your song theme, mood, or story..."
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
          Generate Lyrics
        </button>
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Coming Soon</h2>
        <ul style={{ color: '#777' }}>
          <li>🎼 Melody Generator</li>
          <li>🎤 Vocal Style Selector</li>
          <li>📁 Save & Export Projects</li>
        </ul>
      </section>
    </div>
  );
};

export default SongCraft;
