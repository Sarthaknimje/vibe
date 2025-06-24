import React from 'react';
import { motion } from 'framer-motion';

const MyScrolls: React.FC = () => (
  <section className="min-h-screen py-24 relative overflow-hidden">
    <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-violet-500 to-blue-400 rounded-full blur-3xl opacity-40 animate-pulse z-0" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.h2
        className="text-5xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        📜 My Scrolls
      </motion.h2>
      {/* TODO: List user's scrolls here */}
      <div className="glass-card card-animated-border p-10 text-blue-200 text-center rounded-3xl shadow-xl bg-gradient-to-br from-pink-400/20 via-violet-400/10 to-blue-400/10">
        <p className="text-lg">Your private and public scrolls will appear here, with unlock countdowns and status.</p>
      </div>
    </div>
  </section>
);

export default MyScrolls; 