/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bupa_blue: "#0079c8",
      },
      screens: {
        sm: "600px",
      },
    },
  },
  plugins: [],
};
