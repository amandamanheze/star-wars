/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue, sans-serif'],
        orbitron: ['Orbitron, sans-serif'],
        roboto: ['Roboto, sans-serif']
      },
    },
  },
  plugins: [],
}

