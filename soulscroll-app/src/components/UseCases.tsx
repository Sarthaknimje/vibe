import React from 'react';
import { motion } from 'framer-motion';

const useCases = [
  {
    icon: '🔮',
    title: 'Manifestation Diary',
    description: 'Privately write and time-lock affirmations, dreams, or goals. Reflect later: Did you grow? Did it come true?'
  },
  {
    icon: '📜',
    title: 'Letters to Your Future Self',
    description: 'A blockchain bottle to your future: "Where will I be in 5 years?" — revealed when the time comes.'
  },
  {
    icon: '💌',
    title: 'Time-Locked Messages to Others',
    description: "Write to a friend, loved one, or even an ex. They'll receive the letter when the chain unlocks — optionally anonymous."
  },
  {
    icon: '🎓',
    title: 'Graduation Notes / Life Milestones',
    description: 'Capture the exact feeling of "now" before a big life shift. Look back to remember your raw truth.'
  },
  {
    icon: '🪄',
    title: 'Legacy Scrolls',
    description: 'Create messages meant to last forever — like a will, a farewell, or an eternal promise.'
  },
];

const UseCases: React.FC = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Animated pink-violet-blue gradient background blob */}
    <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-violet-500 to-blue-400 rounded-full blur-3xl opacity-40 animate-pulse z-0" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.h2
        className="text-5xl md:text-6xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        🌌 Use Cases
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-10">
        {useCases.map((uc, i) => (
          <motion.div
            key={uc.title}
            className="relative glass-card card-animated-border p-10 flex flex-col items-center text-center shadow-2xl rounded-3xl border-2 border-blue-400/30 hover:border-pink-400/80 transition-all duration-300 group bg-gradient-to-br from-pink-400/30 via-violet-400/20 to-blue-400/20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 40px 0 rgba(139,92,246,0.25)' }}
          >
            <div className="text-6xl mb-6 animate-bounce-slow group-hover:scale-110 transition-transform duration-300">
              {uc.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-violet-300 to-blue-300">
              {uc.title}
            </h3>
            <p className="text-lg text-blue-100/90 font-medium">
              {uc.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCases; 