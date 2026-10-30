/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FBFBFA',
          100: '#F4F4F1',
          200: '#E8E8E3',
          300: '#D5D5CD',
          400: '#A9A99D',
          500: '#7E7E70',
          600: '#616155',
          700: '#4A4A41',
          800: '#35352F',
          900: '#232320',
          950: '#171714',
        },
        subtle: {
          border: '#E7E5E4', // stone-200
          card: '#FFFFFF',
          bg: '#FAFAF9',     // stone-50
          muted: '#78716C',   // stone-500
          dark: '#1C1917'     // stone-900
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'] // Clean simple modern replacement for serif
      }
    },
  },
  plugins: [],
}
