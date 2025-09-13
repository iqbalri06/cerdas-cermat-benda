/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4fc',
          100: '#dce8f9',
          200: '#b9d0f3',
          300: '#94b9ed',
          400: '#6f9ce7',
          500: '#4b6cb7', // Primary brand color
          600: '#3a5499', // Darker shade
          700: '#2f4378',
          800: '#182848', // Very dark shade
          900: '#0e1c2c',
        },
        secondary: {
          50: '#f2fcf5',
          100: '#e4f9eb',
          200: '#c9f3d7',
          300: '#a3e9ba',
          400: '#6fd895',
          500: '#28a745', // Success/secondary color
          600: '#218838',
          700: '#1d6e2f',
          800: '#1a5829',
          900: '#163c1e',
        },
        accent: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#ffd700', // Accent color (gold)
          600: '#ccac00',
          700: '#997f00',
          800: '#665500',
          900: '#332a00',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
