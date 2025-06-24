import React from 'react';
import { motion } from 'framer-motion';

// ... (SVG components would be defined here or imported)
const TimeLockIcon = () => <svg>...</svg>; // Placeholder for actual SVG components
const EncryptedIcon = () => <svg>...</svg>;
// etc.

const features = [
  { icon: '📅', title: 'Time-Locked Sealing', desc: 'Your scroll is cryptographically sealed on-chain until a specific date. No one — not even us — can open it early.' },
  { icon: '🔒', title: 'On-Chain Encryption', desc: 'Encrypt your message so only you (or someone you share the key with) can read it later.' },
  { icon: '🎭', title: 'True Anonymity', desc: "Choose to post anonymously. Your wallet won't be linked to the scroll. Pure expression, no identity." },
  { icon: '👤', title: 'Soulbound NFT Memories', desc: 'Each scroll is minted as a non-transferable NFT — uniquely yours, forever.' },
  { icon: '🌐', title: 'Public Scroll Wall (Optional)', desc: 'Share select scrolls with the world. Watch others unlock theirs. Build a timeline of shared human emotion.' },
  { icon: '📈', title: 'AI-Powered Reflection', desc: "Our smart AI tracks recurring themes in your scrolls: 'You wrote about \'freedom\' 12 times.' It helps you grow." },
  { icon: '💌', title: 'Letters to Others', desc: 'Write time-locked messages to another wallet or ENS name. Perfect for gifts, surprise notes, or delayed closure.' },
  { icon: '🧭', title: 'Reminders & Reflections', desc: 'Once your scroll unlocks, we ask: \"Did it come true?\", \"Do you feel the same?\" — a journey of growth.' },
];

const Features: React.FC = () => (
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
        🧠 A Universe of Features
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-10">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="relative glass-card card-animated-border p-10 flex flex-col items-center text-center shadow-2xl rounded-3xl border-2 border-blue-400/30 hover:border-pink-400/80 transition-all duration-300 group bg-gradient-to-br from-pink-400/30 via-violet-400/20 to-blue-400/20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 40px 0 rgba(139,92,246,0.25)' }}
          >
            <div className="text-6xl mb-6 animate-bounce-slow group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-violet-300 to-blue-300">
              {f.title}
            </h3>
            <p className="text-lg text-blue-100/90 font-medium">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features; 