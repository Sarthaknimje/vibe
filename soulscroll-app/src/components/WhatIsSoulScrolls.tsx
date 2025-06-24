import React from 'react';
import { motion } from 'framer-motion';

const WhatIsSoulScrolls: React.FC = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      {/* Illustration */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        {/* Magical diary SVG/memoji */}
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="40" rx="24" width="140" height="100" fill="#181e36" stroke="#60a5fa" strokeWidth="5" />
          <ellipse cx="90" cy="40" rx="24" ry="8" fill="#23294a" opacity="0.7" />
          <ellipse cx="90" cy="140" rx="24" ry="8" fill="#23294a" opacity="0.7" />
          <line x1="40" y1="70" x2="140" y2="70" stroke="#60a5fa" strokeWidth="3" />
          <line x1="40" y1="100" x2="140" y2="100" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="150" cy="60" r="8" fill="#f9fafb" opacity="0.8" />
        </svg>
      </motion.div>
      {/* Text */}
      <motion.div
        className="flex-1 glass-card p-8"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          🌱 What is SoulScrolls?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-blue-200/90 mb-8 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <b>SoulScrolls is a time-locked manifestation diary</b> that lives on-chain.<br/>
          Write your most personal truths, seal them with time, and let the future reveal your soul.<br/><br/>
          It's your <b>private journal</b>, your <b>public expression</b>, your <b>memory vault</b>, and your <b>spiritual NFT collection</b> — all in one.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default WhatIsSoulScrolls; 