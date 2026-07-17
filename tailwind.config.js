/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F7F2E8",
          soft: "#FBF8F2",
        },
        olive: {
          DEFAULT: "#5A5C3A",
          soft: "#7A7D53",
        },
        gold: {
          DEFAULT: "#B89B5E",
          soft: "#D9C79A",
        },
        brown: {
          DEFAULT: "#2E261F",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 24px rgba(46,38,31,0.08)",
        lift: "0 24px 45px rgba(46,38,31,0.16)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-18px) rotate(1deg)" },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
