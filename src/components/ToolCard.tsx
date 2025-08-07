import React from 'react';
import { Link } from 'react-router-dom';

type ToolCardProps = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, link }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <div
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 0 10px rgba(0, 255, 153, 0.2)',
          transition: 'transform 0.2s',
        }}
      >
        <h2 style={{ marginBottom: '0.5rem', color: '#00ff99' }}>
          {icon} {title}
        </h2>
        <p style={{ color: '#ccc' }}>{description}</p>
      </div>
    </Link>
  );
};

export default ToolCard;
