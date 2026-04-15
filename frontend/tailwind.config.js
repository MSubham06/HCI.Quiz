/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          gold: {
            400: '#f0c040',
            600: '#d4a017',
            700: '#b8860b',
          },
        },
        fontFamily: {
          display: ['"Syne"', 'sans-serif'],
          body: ['"DM Sans"', 'sans-serif'],
        },
        animation: {
          'timer-shrink': 'shrink 30s linear forwards',
          'shake': 'shake 0.4s ease-in-out',
          'pulse-gold': 'pulseGold 0.5s ease-in-out',
          'slide-up': 'slideUp 0.3s ease-out',
          'fade-in': 'fadeIn 0.25s ease-out',
        },
        keyframes: {
          shrink: { from: { width: '100%' }, to: { width: '0%' } },
          shake: {
            '0%,100%': { transform: 'translateX(0)' },
            '20%,60%': { transform: 'translateX(-6px)' },
            '40%,80%': { transform: 'translateX(6px)' },
          },
          pulseGold: {
            '0%,100%': { boxShadow: '0 0 0 0 rgba(240,192,64,0)' },
            '50%': { boxShadow: '0 0 0 8px rgba(240,192,64,0.3)' },
          },
          slideUp: {
            from: { transform: 'translateY(20px)', opacity: 0 },
            to: { transform: 'translateY(0)', opacity: 1 },
          },
          fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  }