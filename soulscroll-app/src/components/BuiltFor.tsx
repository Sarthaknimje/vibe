import React from 'react';
import { motion } from 'framer-motion';

const audiences = [
  { icon: '✨', title: 'Manifestors', desc: 'A magical, secure way to store intentions.' },
  { icon: '😢', title: 'Heartbroken', desc: 'Closure through time-locked goodbyes.' },
  { icon: '🧘', title: 'Mindful Users', desc: 'Reflection, journaling, and emotional growth.' },
  { icon: '💌', title: 'Lovers & Friends', desc: 'Surprise letters and long-distance notes.' },
  { icon: '🔐', title: 'Privacy Seekers', desc: 'Full control over their voice, timing, and identity.' },
];

const BuiltFor: React.FC = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Animated pink-violet-blue gradient background blob */}
    <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-violet-500 to-blue-400 rounded-full blur-3xl opacity-40 animate-pulse z-0" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.h2
        className="text-5xl md:text-6xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        🔮 Built For...
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-10">
        {audiences.map((a, i) => (
          <motion.div
            key={a.title}
            className="relative glass-card card-animated-border p-10 flex flex-col items-center text-center shadow-2xl rounded-3xl border-2 border-pink-400/30 hover:border-pink-400/80 transition-all duration-300 group bg-gradient-to-br from-pink-400/30 via-violet-400/20 to-blue-400/20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 40px 0 rgba(236,72,153,0.25)' }}
          >
            <div className="text-6xl mb-6 animate-bounce-slow group-hover:scale-110 transition-transform duration-300">
              {a.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-violet-300 to-blue-300">
              {a.title}
            </h3>
            <p className="text-lg text-blue-100/90 font-medium">
              {a.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BuiltFor; 