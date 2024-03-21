/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      colors: {
        "weather-primary": "#3BA3D0",
        "weather-secondary": "#63AFD0",
      },
      fonts: {
        Roboto: ["Roboto, sans-serif"],
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px",
      },
    },
  },
  plugins: [
    tailwindScrollbar,
  ],
}

