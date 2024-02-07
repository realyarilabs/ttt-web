/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'chat-green': 'rgba(45, 128, 120, 0.2)',
      },
    },
  },
  plugins: [],
}

