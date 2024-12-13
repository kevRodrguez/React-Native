/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}"

  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#fb8500",
        secondary: "#219ebc",
        tertiary: "#023047",
        background: "#282828",
      },


      fontFamily: {
        'work-black': ["WorkSans-Black", "sans-serif"],
        'work-light': ["WorkSans-Light", "sans-serif"],
        'work-medium': ["WorkSans-Medium", "sans-serif"],
      },


    },
  },
  plugins: [],
}

