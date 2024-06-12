import React from 'react';
import Confetti from 'react-canvas-confetti';

const ConfettiComponent = ({ numberOfPieces = 200 }) => {
  const fireConfetti = () => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    (function frame() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return;
      }

      const particleCount = numberOfPieces * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        particleCount,
        ...defaults,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        particleCount,
        ...defaults,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });

      setTimeout(frame, 1000 / 60);
    })();
  };

  return (
    <div style={{ position: 'fixed', width: '100%', height: '100%', zIndex: '9999' }}>
      <Confetti
        ref={(node) => {
          if (node) fireConfetti();
        }}
      />
    </div>
  );
};

export default ConfettiComponent;