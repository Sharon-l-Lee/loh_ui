/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Replace amber with custom gold colors
        gold: {
          50: '#FFD700', //richer Gold
          100: '#B76E79', //rose gold
          150: '#F7E7CE', // champagn gold
          250: '#CFB53B', // antique gold
          300: '#CD7F32', //bronze gold
          350: '#E6BE8A' // pale gold text-amber-500
        },
      },
    },
  },
  plugins: [],
}
