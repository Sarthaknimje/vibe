import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { icon: '1️⃣', title: 'Write Your Truth', desc: 'Use our serene editor to write what matters — a promise, a dream, a secret, a message to your future self or someone you love.' },
  { icon: '2️⃣', title: 'Lock It in Time', desc: 'Choose when the scroll should unlock — hours, days, or years later. Until then, it remains sealed and unreadable, protected by the Starknet blockchain.' },
  { icon: '3️⃣', title: 'Choose Privacy or Public', desc: "Write for your eyes only or release it to the Scroll Wall — a living collection of revealed scrolls that reflect humanity's emotional truth." },
  { icon: '4️⃣', title: 'Wait, Watch, Reflect', desc: "As time passes, your scroll stays dormant. When the moment comes, it's unveiled — on-chain, immutable, and eternal." },
];

const HowItWorks: React.FC = () => (
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
        ✍️ How It Works
      </motion.h2>
      <div className="grid md:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="relative glass-card card-animated-border p-10 flex flex-col items-center text-center shadow-2xl rounded-3xl border-2 border-violet-400/30 hover:border-pink-400/80 transition-all duration-300 group bg-gradient-to-br from-pink-400/30 via-violet-400/20 to-blue-400/20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 40px 0 rgba(139,92,246,0.25)' }}
          >
            <div className="text-5xl mb-6 animate-bounce-slow group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-violet-300 to-blue-300">
              {step.title}
            </h3>
            <p className="text-base text-blue-100/90 font-medium">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks; 