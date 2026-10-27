/** @type {import('tailwindcss').Config} */
module.exports = {
  //Had to include this to stop an error from appearing 
  darkMode: "class",
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        theme_primary: "#FE8C00",
        theme_red: "#D33B0D",
        theme_green: "#084137",
        theme_orange: "#DF5A0C",
        theme_yellow: "#EB920C",
      },
      fontFamily: {
        // QUICKSAND
        sans: ["Quicksand-Regular"],
        quicksand: ["Quicksand-Regular", "sans-serif"],
        bold: ["Quicksand-Bold", "sans-serif"],
        medium: ["Quicksand-Medium", "sans-serif"],
        light: ["Quicksand-Light", "sans-serif"],
        semibold: ["Quicksand-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}