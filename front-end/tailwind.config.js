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
      primary: {
        darkest: "#1d1a1b",
        darker: "#2e2929",
        dark: "#3f3c3b",
        DEFAULT: "#53514f",
        light: "#7b807d",
        lighter: "#b0b6b4",
        lightest: "#e3eae9",
      },
      secondary: {
        darkest: "#2b1629",
        darker: "#4c2439",
        dark: "#80314f",
        DEFAULT: "#bd466d",
        light: "#ff637d",
        lighter: "#ff9d90",
        lightest: "#feddbf",
      },
      tertiary: {
        darkest: "#142b34",
        darker: "#143b3e",
        dark: "#0f5855",
        DEFAULT: "#2a7f76",
        light: "#41c0a7",
        lighter: "#76e9af",
        lightest: "#dbffc1",
      },
    },
    extend: {
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus", "focus-within", "hover"],
      borderWidth: ["focus", "focus-within", "hover"],
      appearance: ["active", "focus"],
      outline: ["active", "focus"],
      ringWidth: ["active"],
      textColor: ["active, disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
