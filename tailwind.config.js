module.exports = {
  module: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232f3e",
          DEFAULT: "#131921",
        },
      },
    },
    variants: {
      extend: {},
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
