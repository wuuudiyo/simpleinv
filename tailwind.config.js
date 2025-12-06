/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        status: {
          'in-stock': '#3B82F6',
          'listed': '#F59E0B',
          'sold': '#10B981',
          'returned': '#EF4444',
        },
      },
    },
  },
  plugins: [],
};
