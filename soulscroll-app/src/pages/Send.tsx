import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Send: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [text, setText] = useState('');
  const [unlockTime, setUnlockTime] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-violet-500 to-blue-400 rounded-full blur-3xl opacity-40 animate-pulse z-0" />
      <motion.div
        className="glass-card card-animated-border p-10 w-full max-w-2xl flex flex-col items-center text-center shadow-2xl rounded-3xl border-2 border-blue-400/30 bg-gradient-to-br from-pink-400/30 via-violet-400/20 to-blue-400/20 relative z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-5xl mb-6 animate-bounce-slow">💌</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-violet-300 to-blue-300">Send a Time-Locked Message</h2>
        <input
          className="w-full rounded-xl p-4 bg-black/30 text-blue-100 text-lg mb-4 border border-pink-400/20 focus:border-pink-400/60 outline-none backdrop-blur-md"
          placeholder="Recipient wallet or ENS..."
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
        />
        <textarea
          className="w-full min-h-[100px] rounded-xl p-4 bg-black/30 text-blue-100 text-lg mb-4 border border-pink-400/20 focus:border-pink-400/60 outline-none resize-none backdrop-blur-md"
          placeholder="Write your message..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
          <input
            type="datetime-local"
            className="flex-1 rounded-lg p-3 bg-black/30 text-blue-100 border border-violet-400/30 focus:border-pink-400/60 outline-none backdrop-blur-md"
            value={unlockTime}
            onChange={e => setUnlockTime(e.target.value)}
          />
          <label className="flex items-center gap-2 cursor-pointer text-blue-200">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={e => setIsAnonymous(e.target.checked)}
              className="accent-pink-500 w-5 h-5"
            />
            Anonymous
          </label>
        </div>
        <motion.button
          className="mt-2 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:shadow-pink-400/40 transition-all text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {/* TODO: handle send */}}
        >
          🪄 Send
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Send; 