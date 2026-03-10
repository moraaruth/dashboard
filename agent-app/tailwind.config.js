/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        safaricom: {
          green: '#00A651',
          red: '#E30613',
        }
      }
    },
  },
  plugins: [],
}
