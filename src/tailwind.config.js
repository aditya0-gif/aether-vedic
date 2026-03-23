/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['DM Sans', 'sans-serif'],
      },
      colors: {
        void: '#03010a',
        cosmos: '#0a0415',
        nebula: '#12082a',
        amethyst: {
          300: '#c4a7f5',
          400: '#a97af5',
          500: '#8b4ef5',
          600: '#6d2de8',
          700: '#5220c0',
        },
        gold: {
          300: '#f5e0a7',
          400: '#f0cc6e',
          500: '#e8b834',
        },
        stardust: '#e8e0f5',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #03010a 0%, #0a0415 40%, #160830 100%)',
        'amethyst-glow': 'radial-gradient(ellipse at center, rgba(139,78,245,0.15) 0%, transparent 70%)',
        'gold-glow': 'radial-gradient(ellipse at center, rgba(232,184,52,0.12) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'star-twinkle': 'starTwinkle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,78,245,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(139,78,245,0.6), 0 0 80px rgba(139,78,245,0.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(139,78,245,0.25)',
        'glow-md': '0 0 30px rgba(139,78,245,0.35)',
        'glow-lg': '0 0 60px rgba(139,78,245,0.4)',
        'gold-glow': '0 0 20px rgba(232,184,52,0.3)',
      },
    },
  },
  plugins: [],
};
