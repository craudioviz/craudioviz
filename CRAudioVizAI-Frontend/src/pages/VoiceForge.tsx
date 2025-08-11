import React from 'react';

const VoiceForge: React.FC = () => {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#222' }}>🗣️ VoiceForge AI</h1>
        <p style={{ color: '#555' }}>
          Create voiceovers and synthetic speech with advanced controls. Perfect for narration, characters, and branding.
        </p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Text-to-Speech</h2>
        <textarea
          placeholder="Enter your script or dialogue..."
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
          Generate Voice
        </button>
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Coming Soon</h2>
        <ul style={{ color: '#777' }}>
          <li>🎙️ Voice Style Selector</li>
          <li>😄 Emotion & Tone Controls</li>
          <li>📥 Download Audio Files</li>
        </ul>
      </section>
    </div>
  );
};

export default VoiceForge;
