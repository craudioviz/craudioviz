import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav>
      <Link to="/">🏠 Home</Link>
      <Link to="/about">ℹ️ About</Link>
      <Link to="/songcraft">🎵 SongCraft</Link>
      <Link to="/voiceforge">🗣️ VoiceForge</Link>
      <Link to="/logocraft">🎨 LogoCraft</Link>
    </nav>
  );
};

export default Nav;
