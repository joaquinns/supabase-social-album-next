/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-grid': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    }
  },
  plugins: []
}
