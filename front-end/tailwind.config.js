module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: {
        darkest: "#1a1a1a",
        darker: "#2a2a2a",
        dark: "#3b3b3b",
        DEFAULT: "#4f4f4f",
        light: "#777777",
        lighter: "#a7a7a7",
        lightest: "#e6e6e6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
