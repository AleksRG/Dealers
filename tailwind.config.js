const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.yellow,
      lime: colors.lime,
      amber: colors.amber,
      fuchsia: colors.fuchsia,
      bluegray: colors.blueGray,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
