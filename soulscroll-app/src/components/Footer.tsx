import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

const socials = [
  { icon: <FaGithub />, href: '#' },
  { icon: <FaTwitter />, href: '#' },
  { icon: <FaDiscord />, href: '#' },
];

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="py-12 border-t border-purple-500/20 mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center px-8 flex flex-col items-center">
        <div className="text-2xl mb-4 font-serif text-purple-200">
          SoulScrolls
        </div>
        <p className="text-purple-200/80 mb-6 max-w-md">
          Built with 💜 for the Cursor/Starknet Vibathon. Let time unlock your truth.
        </p>
        <div className="flex gap-6 mb-6">
          {socials.map((social, index) => (
            <motion.a 
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-purple-300/70 hover:text-white transition-all duration-300"
              whileHover={{ 
                scale: 1.3, 
                y: -5,
                textShadow: '0 0 8px #fff',
                color: '#c084fc'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-sm text-purple-300/50">
          © {new Date().getFullYear()} SoulScrolls. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer; 