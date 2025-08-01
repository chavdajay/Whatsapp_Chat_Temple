/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 4px 6px rgba(252, 95, 54, 0.10)", // Custom shadow with the color you want
      },
      colors: {
        primary: {
          100: "#11057E",
          200: "#59598E", //light primary
          300: "#4D426D", //chat color
          400: "#0070FF", //button color
          500: "#DCE9FE", //elipse bg,
          600: "#372FA3", //btn bg gradient
          700: "#6a6381", //hover
        },
        white: {
          100: "#FFFFFF",
          200: "#a3aed0",
          300: "#F9FAFC", //sidebar color
          400: "#f4f7fe", // sky color
          500: "#F5F7FB",
        },
        black: {
          100: "#000000",
          200: "#E8E8E8", //border
          300: "#667085", // black subtitle
          400: "#F3F3FB",
        },
        blue: {
          900: "#0F172A", // static home
        },
        orange: {
          100: "#EFA985",
          500: "#FC5F36", // static home
        },
        red: {
          100: "#F64E60",
          200: "#fee9e7", // bg icon
          300: "#900b09", //icon
        },
        green: {
          100: "#ebffee", // bg icon
          200: "#02542d", // icon
        },
        grey_font: {
          100: "#A2A2A2",
          200: "#575F6E", // modify template font
          300: "#BCBCBC", // modify template light font
          400: "#A1A1A1", // chat screen light font
          500: "#8A8A8A", // chat screen light font
        },
        grey: {
          100: "#CCD0CF", // preview placeholder
          200: "#EEEEEE", // border
          300: "#727272", // icon color
          400: "#E8ECEF", // chat text bg
        },
        icon_color: {
          100: "#6450A8",
        },
        light: {
          100: "#F7F8FF", //purpal color
          200: "#FDEEEF", //light red
          300: "#FFF9E6", //light yellow
          400: "#EAFBF5", //light green
          500: "#EFA98533", //light orange
        },
        bg_color: {
          100: "#F2F3F5", //searchbar at chat
          200: "#E0E6EA", //chatlist bg at chat
        },
        template_card: {
          100: "#7F56D90D", // bg-light purple
          200: "#FC5F360D", // bg-light red
          300: "#B8A3330D", // bg-light yellow
        },
        template_card_border: {
          100: "#7F56D933", // border-light purple
          200: "#FC5F3633", // border-light red
          300: "#B8A33333", // border-light yellow
        },
        template_icon_bg: {
          100: "#7F56D914", // bg-light purple
          200: "#FC5F3614", // bg-light red
          300: "#B8A33314", // bg-light yellow
        },
        template_icon_font: {
          100: "#7F56D9", // font-light purple
          200: "#FC5F36", // font-light red
          300: "#B8A333", // font-light yellow
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
