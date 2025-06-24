import React from 'react';
import { motion } from 'framer-motion';
import ScrollWall from '../components/ScrollWall';

const Explore: React.FC = () => (
  <section className="min-h-screen py-24 relative overflow-hidden">
    <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-violet-500 to-blue-400 rounded-full blur-3xl opacity-40 animate-pulse z-0" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.h2
        className="text-5xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🌌 Explore the Scroll Wall
      </motion.h2>
      {/* TODO: Add filters/search here */}
      <ScrollWall />
    </div>
  </section>
);

export default Explore; 