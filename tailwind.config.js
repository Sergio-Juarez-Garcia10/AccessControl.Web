/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B2A4A',
          light: '#3E4C6D',
          soft: '#5C6B8A',
        },
        paper: {
          DEFAULT: '#F5F2EA',
          dark: '#EBE5D6',
          line: '#D9D2BF',
        },
        stamp: {
          active: '#2F6F4F',
          activeSoft: '#E4EEE7',
          rust: '#9C4221',
          rustSoft: '#F1E4DB',
          alert: '#B23A48',
          alertSoft: '#F6E3E4',
        },
        seal: '#C79A3B',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'paper-texture':
          "repeating-linear-gradient(0deg, rgba(27,42,74,0.035) 0px, rgba(27,42,74,0.035) 1px, transparent 1px, transparent 32px)",
      },
    },
  },
  plugins: [],
}
