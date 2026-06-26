/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        zinc: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
      },
      keyframes: {
        gradient: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shine: {
          '0%':   { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        'ping-slow': {
          '0%':        { transform: 'scale(1)', opacity: '0.55' },
          '75%, 100%': { transform: 'scale(1.18)', opacity: '0' },
        },
        'ping-slower': {
          '0%':        { transform: 'scale(1)', opacity: '0.35' },
          '75%, 100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        'page-in': {
          '0%':   { opacity: '0', transform: 'translateY(9px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'counter-up': {
          '0%':   { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',   opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.2)' },
          '50%':      { boxShadow: '0 0 35px rgba(99,102,241,0.45)' },
        },
      },
      animation: {
        gradient:     'gradient 8s linear infinite',
        shine:        'shine 5s linear infinite',
        'fade-up':    'fade-up 0.6s ease-out',
        'fade-in':    'fade-in 0.4s ease-out',
        float:        'float 3s ease-in-out infinite',
        pulse:        'pulse 2s ease-in-out infinite',
        'ping-slow':  'ping-slow 2.8s cubic-bezier(0,0,0.2,1) infinite',
        'ping-slower':'ping-slower 3.8s cubic-bezier(0,0,0.2,1) infinite 0.6s',
        'page-in':    'page-in 0.38s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
