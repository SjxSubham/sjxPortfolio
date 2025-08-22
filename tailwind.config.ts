import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ""],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(222, 28%, 7%)",
        foreground: "hsl(210, 40%, 98%)",
        primary: {
          DEFAULT: "hsl(262, 83%, 58%)",
          foreground: "#fff"
        },
        secondary: {
          DEFAULT: "hsl(208, 100%, 50%)",
          foreground: "#fff"
        },
        muted: "hsl(222, 14%, 15%)",
        border: "hsl(220, 13%, 18%)",
        card: "hsl(222, 14%, 12%)"
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(124, 58, 237, 0.6)",
        soft: "0 10px 30px rgba(0,0,0,0.35)"
      },
      keyframes: {
        "float-y": { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        "shine": { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(200%)" } },
        "aurora": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-10%, 10%, 0) scale(1.1)" }
        }
      },
      animation: {
        "float-y": "float-y 6s ease-in-out infinite",
        "shine": "shine 2.5s linear infinite",
        "aurora": "aurora 12s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;