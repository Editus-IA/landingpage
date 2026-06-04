/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Indigo — superfícies escuras / base brand
        indigo: {
          950: '#130B33',
          900: '#1E1654',
          800: '#2A1F6E',
          700: '#382A8C',
        },
        // Violet — ação primária
        violet: {
          700: '#4A2FCC',
          600: '#5A3CE0',
          500: '#6E54F0',
          400: '#8E7BF5',
          300: '#B6A8FB',
          100: '#ECE8FE',
        },
        // Neutral — texto, bordas, fundos claros
        neutral: {
          900: '#1A1830',
          700: '#3A3A4D',
          600: '#54546B',
          500: '#6E6E85',
          400: '#9B9BB0',
          300: '#CBCBDA',
          200: '#E3E3ED',
          100: '#EFEFF5',
          50: '#F7F7FB',
          0: '#FFFFFF',
        },
        // Semantic
        success: { DEFAULT: '#16895A', tint: '#E3F4EC' },
        warning: { DEFAULT: '#C07A09', tint: '#FBF0DA' },
        danger: { DEFAULT: '#D23B47', tint: '#FBE6E8' },

        // Aliases deprecated — mantidos para não quebrar código em migração
        editus: {
          950: '#130B33',
          900: '#1E1654',
          800: '#2A1F6E',
          700: '#382A8C',
          600: '#5A3CE0',
          500: '#6E54F0',
          400: '#8E7BF5',
          300: '#B6A8FB',
          200: '#E3E3ED',
          100: '#ECE8FE',
          50: '#F7F7FB',
        },
        victory: {
          900: '#0A3D2A',
          800: '#0F5538',
          700: '#156B47',
          600: '#16895A',
          500: '#1FA872',
          400: '#35C589',
          200: '#9FDFCA',
          100: '#E3F4EC',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'eb-sm': '6px',
        'eb-md': '10px',
        'eb-lg': '14px',
        'eb-pill': '999px',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
}
