import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ padding: '2rem' }}
    >
      <h1>ℹ️ About CR AudioViz AI</h1>
      <p>
        CR AudioViz AI is a creative technology platform that empowers artists, educators, and innovators
        through modular tools that combine audio, visual, and artificial intelligence.
      </p>
      <p>
        Our mission is to make powerful, intuitive tools that spark originality and streamline creative workflows.
      </p>
    </motion.div>
  );
};

export default About;
