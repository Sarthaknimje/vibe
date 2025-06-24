import React from 'react';
import Particles from '@tsparticles/react';
import { loadEmojiShape } from '@tsparticles/shape-emoji';
import { loadStarsPreset } from '@tsparticles/preset-stars';

const emojiList = [
  '📜', '✨', '🪄', '🧙', '🧡', '🌟', '🔮', '🕯️', '💎', '🎭', '🔐', '⏳', '😍', '😢', '🤯', '😂', '🙏'
];

const ParticlesBackground: React.FC = () => {
  const particlesInit = async (engine: any) => {
    await loadEmojiShape(engine);
    await loadStarsPreset(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'stars',
        background: {
          color: '#12021f',
        },
        particles: {
          number: { value: 32, density: { enable: true, area: 800 } },
          shape: {
            type: ['emoji'],
            options: {
              emoji: {
                value: emojiList,
              },
            },
          },
          size: { value: 32, random: { enable: true, minimumValue: 18 } },
          move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
          opacity: { value: 0.7, random: { enable: true, minimumValue: 0.4 } },
        },
        detectRetina: true,
        fullScreen: { enable: true, zIndex: -1 },
      }}
    />
  );
};

export default ParticlesBackground; 