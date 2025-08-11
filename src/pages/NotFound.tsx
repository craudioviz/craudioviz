import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '2rem', textAlign: 'center' }}
    >
      <h1 style={{ fontSize: '3rem', color: '#ff0066' }}>404</h1>
      <p style={{ marginBottom: '1rem' }}>Oops! That page doesn’t exist.</p>
      <Link to="/" style={{ color: '#00ff99' }}>Go back home</Link>
    </motion.div>
  );
};

export default NotFound;
