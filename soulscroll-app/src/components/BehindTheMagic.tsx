import React from 'react';
import { motion } from 'framer-motion';

// ... (SVG components would be here)

const techStack = [
  { 
    title: 'Cairo Smart Contracts', 
    description: 'The unbreakable logic layer, written in Cairo, ensures your scrolls are sealed until the precise moment of revelation.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" fill="none" stroke="#a78bfa" strokeWidth="1.5"/></svg>
    )
  },
  { 
    title: 'Starknet ZK-Rollup', 
    description: 'Built on Starknet, SoulScrolls leverages the immense scale and low fees of a leading ZK-Rollup for every transaction.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v-4h2v4h-2zm0-6V7h2v2h-2z" fill="#a78bfa"/></svg>
    )
  },
  { 
    title: 'IPFS Decentralized Storage', 
    description: 'For larger scrolls, content is stored on the InterPlanetary File System, ensuring it remains decentralized and secure.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" stroke="#a78bfa" strokeWidth="1.5"/><rect x="2" y="4" width="20" height="16" rx="2" stroke="none" fill="#a78bfa" opacity="0.2"/></svg>
    )
  },
  { 
    title: 'Soulbound NFT Identity', 
    description: 'Each scroll is a unique, non-transferable Soulbound NFT, creating a permanent, on-chain record of your expression.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#a78bfa"/></svg>
    )
  },
];

const codeSnippet = `#[starknet::contract]
module SoulScrolls {
    #[storage]
    struct Storage {
        scrolls: LegacyMap<u256, Scroll>,
    }
    
    struct Scroll {
        content: Felt252,
        unlock_time: u64,
        author: ContractAddress,
    }
}`;

const techs = [
  { icon: '⚒️', title: 'Cairo Smart Contracts', desc: "Time-lock logic — scrolls can't be unlocked before time." },
  { icon: '🌐', title: 'Starknet ZK-Rollup', desc: 'Scalable, low-fee Layer 2 for fast, cheap transactions.' },
  { icon: '🗃️', title: 'IPFS Storage', desc: 'Decentralized, persistent content storage.' },
  { icon: '🧬', title: 'Soulbound NFTs', desc: 'Uniquely tied to your wallet, forever. Immutable emotional proof.' },
];

const BehindTheMagic: React.FC = () => (
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
        ⚙️ Behind the Magic
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {techs.map((t, i) => (
          <motion.div
            key={t.title}
            className="relative glass-card card-animated-border p-10 flex flex-col items-center text-center shadow-2xl rounded-3xl border-2 border-violet-400/30 hover:border-pink-400/80 transition-all duration-300 group bg-gradient-to-br from-pink-400/30 via-violet-400/20 to-blue-400/20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 40px 0 rgba(139,92,246,0.25)' }}
          >
            <div className="text-6xl mb-6 animate-bounce-slow group-hover:scale-110 transition-transform duration-300">
              {t.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-violet-300 to-blue-300">
              {t.title}
            </h3>
            <p className="text-lg text-blue-100/90 font-medium">
              {t.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BehindTheMagic; 