/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        tada: {
          '0%': { transform: 'scale(1)' },
          '10%, 20%': { transform: 'scale(0.9) rotate(-3deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale(1.1) rotate(3deg)' },
          '40%, 60%, 80%': { transform: 'scale(1.1) rotate(-3deg)' },
          '100%': { transform: 'scale(1) rotate(0)' },
        },
        confeti: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateX(25%) translateY(-400px) rotate(270deg)' },
          '50%': { transform: 'translateY(-800px) rotate(180deg)' },
          '75%': { transform: 'translateX(-25%) translateY(-1200px) rotate(90deg)' },
        },
      },
      animation: {
        tada: 'tada 1s cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        confeti: 'confeti 3s ease-in-out infinite',
      },
    },
    safelist: ['animate-tada', 'animate-confeti'],
  },
  plugins: [],
};
