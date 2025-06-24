import React from 'react';
import { motion } from 'framer-motion';

const WhySoulScrolls: React.FC = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        💭 Why SoulScrolls?
      </motion.h2>
      <motion.ul
        className="text-lg md:text-xl text-blue-200/90 mb-8 max-w-2xl mx-auto text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <li>A <b>diary that doesn't lie</b>.</li>
        <li>A <b>time capsule for your soul</b>.</li>
        <li>A <b>manifestation vault</b> that reflects your deepest truths.</li>
        <li>A <b>new medium for memory, promise, healing, and growth.</b></li>
      </motion.ul>
    </div>
  </section>
);

export default WhySoulScrolls; 