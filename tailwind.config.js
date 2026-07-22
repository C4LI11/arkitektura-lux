/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pitch: '#050505',
        bronze: '#B89B72',
        stone: '#2A2A2A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Bodoni Moda', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.18em',
      },
    },
  },
  plugins: [],
}

