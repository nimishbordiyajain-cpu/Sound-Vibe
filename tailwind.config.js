/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          base: '#09090b', // Zinc 950
          highlight: '#18181b', // Zinc 900
          elevated: '#27272a', // Zinc 800
          light: '#3f3f46', // Zinc 700
          green: '#8b5cf6', // Violet 500
          greenHover: '#a78bfa', // Violet 400
          text: '#a1a1aa', // Zinc 400
          white: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}
