import React from 'react';
import { motion } from 'framer-motion';

const fakeScrolls = [
  { id: 1, author: '0x123...abc', content: 'A truth I held for so long... freedom at last.', unlocked: '2 hours ago', anonymous: true },
  { id: 2, author: 'Seraphina', content: 'To my future self: I hope you found happiness. I hope you remembered to water the plants. And I hope you finally bought that ridiculous hat.', unlocked: '5 hours ago', anonymous: false },
  { id: 3, author: 'Anonymous', content: 'I wish I had said "I love you" one last time.', unlocked: '1 day ago', anonymous: true },
  { id: 4, author: 'Anonymous', content: 'The world feels a little lighter today.', unlocked: '2 days ago', anonymous: true },
  { id: 5, author: 'Kai', content: 'A promise to the stars, now unveiled.', unlocked: '3 days ago', anonymous: false },
  { id: 6, author: 'Anonymous', content: 'I know who broke the coffee machine.', unlocked: '4 days ago', anonymous: true },
];

const reactions = ['💖', '😢', '🤯', '😂', '🙏'];

const ScrollWall: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center px-8">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          🖼️ Scroll Wall – A Public Memory Chain
        </motion.h2>
        <motion.p 
          className="text-lg text-purple-200/80 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A timeline of unveiled truths, from strangers and souls. Scrolls open in real time. Each carries emotion, nostalgia, hope, regret, and beauty — shared forever.
        </motion.p>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {/* Example scrolls from new content */}
          <motion.div
            className="glass-card card-animated-border p-6 break-inside-avoid-column group relative overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0 }}
            whileHover={{ y: -5, boxShadow: "0px 20px 30px rgba(56, 189, 248, 0.18)" }}
          >
            <motion.p 
              className="text-lg text-gray-200 mb-6 italic"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
            >
              “To my future self: I hope you find peace in uncertainty.”
            </motion.p>
            <div className="text-sm text-purple-300/70 flex justify-between items-center font-mono mb-4">
              <span>🔓 2 days ago | 🎭 Anonymous</span>
            </div>
          </motion.div>
          <motion.div
            className="glass-card card-animated-border p-6 break-inside-avoid-column group relative overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            whileHover={{ y: -5, boxShadow: "0px 20px 30px rgba(56, 189, 248, 0.18)" }}
          >
            <motion.p 
              className="text-lg text-gray-200 mb-6 italic"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.1 }}
            >
              “This is the last time I cry over you. I promise.”
            </motion.p>
            <div className="text-sm text-purple-300/70 flex justify-between items-center font-mono mb-4">
              <span>🔓 4 hours ago | ✍️ Luna</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollWall; 