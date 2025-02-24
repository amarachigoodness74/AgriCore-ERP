/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-gray": {
          50: "#ECEFF1",
          500: "rgb(96 125 139)",
          900: "rgb(38 50 56)",
        },
      },
      backgroundColor: {
        "blue-gray-50": "rgb(38 50 56)",
        "blue-gray-500/10": "#607d8b1a",
        "blue-gray-50/50": "#eceff180",
      },
    },
  },
  plugins: [],
};
