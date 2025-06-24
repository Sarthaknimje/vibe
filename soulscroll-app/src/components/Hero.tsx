import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const headline = "✨ SoulScrolls – Let Time Unlock Your Truth ✨";
const subheading = "🪄 A blockchain diary of emotions, memories, and intentions – sealed in time, owned forever.";
const ctas = [
  { label: '📜 Write Your Truth', primary: true },
  { label: '🌌 Explore the Scroll Wall', primary: false },
];

const Hero: React.FC = () => {
  // Typewriter effect for headline
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(headline.slice(0, i + 1));
      i++;
      if (i === headline.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Example sparkles */}
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute left-12 top-16 text-3xl opacity-70">✨</motion.div>
        <motion.div animate={{ y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute right-24 top-32 text-2xl opacity-60">🪄</motion.div>
        <motion.div animate={{ x: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.8 }} className="absolute left-1/2 bottom-20 text-4xl opacity-60">📜</motion.div>
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} className="absolute right-1/3 bottom-10 text-2xl opacity-50">🌟</motion.div>
      </div>
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left: Animated headline + CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight min-h-[4.5rem]">
            {displayed}
            <span className="text-blue-400 animate-pulse">|</span>
          </h1>
          <motion.p 
            className="text-lg md:text-xl text-blue-200/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            {subheading}
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4">
            {ctas.map((cta, i) => (
              <motion.button
                key={cta.label}
                className={
                  cta.primary
                    ? 'bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 text-lg flex items-center gap-2'
                    : 'bg-black/40 hover:bg-black/60 text-blue-200 font-bold py-3 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500/80 transform hover:-translate-y-1 text-lg flex items-center gap-2'
                }
                whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
                transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 1.5 + i * 0.1 }}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
              >
                {cta.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right: Magical Diary SVG Illustration */}
        <motion.div 
          className="hidden md:flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
        >
          <motion.svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_60px_rgba(56,189,248,0.7)]"
            initial={{ rotate: -8 }}
            animate={{ rotate: [ -8, 8, -8 ] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          >
            {/* Diary body */}
            <rect x="60" y="80" rx="32" width="200" height="160" fill="#181e36" stroke="#60a5fa" strokeWidth="6" />
            {/* Diary lines */}
            <motion.line x1="90" y1="120" x2="230" y2="120" stroke="#60a5fa" strokeWidth="4" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }} />
            <motion.line x1="90" y1="160" x2="230" y2="160" stroke="#60a5fa" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 1 }} />
            <motion.line x1="90" y1="200" x2="230" y2="200" stroke="#60a5fa" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }} />
            {/* Bookmark */}
            <rect x="200" y="80" width="20" height="60" rx="6" fill="#60a5fa" opacity="0.7" />
            {/* Sparkle */}
            <motion.circle cx="250" cy="100" r="16" fill="#f9fafb" opacity="0.8" initial={{ scale: 0.7 }} animate={{ scale: [0.7, 1.2, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.7 }} />
            {/* Glow */}
            <motion.ellipse cx="160" cy="160" rx="100" ry="70" fill="#60a5fa" opacity="0.10" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }} />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 