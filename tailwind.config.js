/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBgColor: "#2A2C2F",
        secondDarkBgColor: "#191B1E",
        darkMainColor: "#ADAEAF",
        darkSecondMainColor: "#D04529",
        lightBgColor: "#3b82f680",
        secondLightBgColor: "#F6F7F7",
        lightMainColor: "#403D39",
        lightSecondMainColor: "#E46B52",
      },
    },
    fontFamily: {
      sans: ["Rajdhani"],
    },
  },
  darkMode: "selector",
  plugins: [],
};
