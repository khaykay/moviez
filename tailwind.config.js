/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        primary: "hsla(var(--color-glass), <alpha-value>)",
        secondary: "hsla(var(--color-glass-border), <alpha-value>)",
      },
    },
  },
  plugins: [],
};
