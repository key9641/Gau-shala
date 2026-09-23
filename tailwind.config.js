/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gau: {
          bg: '#FCFAF6',
          surface: '#F6F1E7',
          cream: '#F3EDE2',
          green: {
            50: '#F0F7F2',
            100: '#DCEDE1',
            200: '#B9DEC4',
            500: '#3D8B5D',
            600: '#2D6A4F',
            700: '#1E4D2B',
            800: '#163820',
            900: '#0F2615',
          },
          brown: {
            50: '#FAF6F2',
            100: '#F3ECE4',
            200: '#E4D5C5',
            400: '#B08968',
            600: '#7F4F24',
            700: '#5C3D2E',
            800: '#43281C',
            900: '#2E190E',
          },
          gold: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },
          terracotta: '#D46A43'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(45, 106, 79, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(45, 106, 79, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'warm': '0 8px 30px rgba(127, 79, 36, 0.08)',
      }
    },
  },
  plugins: [],
}
