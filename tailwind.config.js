module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        independence: "#383B53",
        crayola: "#3777FF",
        princeton: "#EE7B30",
        linen: "#F9EBE0",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
