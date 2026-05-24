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
        editus: {
          950: '#0F0C2E',
          900: '#1E1654',
          800: '#2A1F7A',
          700: '#3D30AB',
          600: '#6459C8',
          500: '#7A71D4',
          400: '#9B94E0',
          300: '#B8B3EB',
          200: '#D4D1F5',
          100: '#EEEDFE',
          50:  '#F5F4FD',
        },
        victory: {
          900: '#04342C',
          800: '#085041',
          700: '#0F6E56',
          600: '#1D9E75',
          500: '#2EBF8E',
          400: '#5DCAA5',
          200: '#9FE1CB',
          100: '#E1F5EE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
}
