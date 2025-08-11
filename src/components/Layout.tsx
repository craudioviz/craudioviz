import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ padding: '1rem', background: '#222', color: '#fff' }}>
        <h1>CR AudioViz AI</h1>
        <nav style={{ marginTop: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem', color: '#0ff' }}>Home</Link>
          <Link to="/dashboard" style={{ marginRight: '1rem', color: '#0ff' }}>Dashboard</Link>
          <Link to="/songcraft" style={{ marginRight: '1rem', color: '#0ff' }}>SongCraft</Link>
          <Link to="/voiceforge" style={{ marginRight: '1rem', color: '#0ff' }}>VoiceForge</Link>
          <Link to="/logocraft" style={{ marginRight: '1rem', color: '#0ff' }}>LogoCraft</Link>
          <Link to="/login" style={{ color: '#0ff' }}>Login</Link>
        </nav>
      </header>

      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>

      <footer style={{ padding: '1rem', background: '#eee', textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} CR AudioViz AI
      </footer>
    </div>
  );
};

export default Layout;
