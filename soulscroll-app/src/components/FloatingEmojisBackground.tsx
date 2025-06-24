import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EMOJIS = ['✨', '🪄', '📜', '🌟', '🔮', '🧙', '💎', '🕯️'];
const EMOJI_COUNT = 18;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const FloatingEmojisBackground: React.FC = () => {
  const [emojis, setEmojis] = useState<{id: number, emoji: string, x: number, y: number, size: number, duration: number, delay: number}[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: EMOJI_COUNT }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: getRandom(0, 90),
      y: getRandom(0, 90),
      size: getRandom(24, 48),
      duration: getRandom(8, 18),
      delay: getRandom(0, 8),
    }));
    setEmojis(arr);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {emojis.map(({ id, emoji, x, y, size, duration, delay }) => (
        <motion.div
          key={id}
          style={{ left: `${x}%`, top: `${y}%`, fontSize: size, position: 'absolute', opacity: 0.7 }}
          initial={{ y: 0, opacity: 0.5 }}
          animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingEmojisBackground; 