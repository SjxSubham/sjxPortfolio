/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8e2de2",
          dark: "#4a00e0",
          light: "#a855f7",
        },
        dark: {
          DEFAULT: "#0a0a0f",
          light: "#0d1117",
          lighter: "#161b22",
          surface: "#1a1a2e",
        },
        os: {
          bg: "#0a0a0f",
          surface: "#0d1117",
          elevated: "#161b22",
          border: "rgba(255, 255, 255, 0.06)",
          "border-hover": "rgba(255, 255, 255, 0.12)",
          text: "#e2e8f0",
          "text-muted": "#94a3b8",
          "text-dim": "rgba(255, 255, 255, 0.3)",
        },
        terminal: {
          bg: "#0a0e14",
          text: "#94a3b8",
          green: "#4ade80",
          cyan: "#22d3ee",
          yellow: "#facc15",
          red: "#ef4444",
          purple: "#c084fc",
          blue: "#60a5fa",
          orange: "#f97316",
        },
        monacoBg: "#011627",
        monacoText: "#c792ea",
        monacoKeyword: "#569cd6",
        monacoString: "#ce9178",
        monacoComment: "#6a9955",
        monacoFunction: "#dcdcaa",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Cascadia Code",
          "Consolas",
          "monospace",
        ],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #4a00e0, #8e2de2)",
        "gradient-purple-blue": "linear-gradient(135deg, #7c3aed, #3b82f6)",
        "gradient-glow":
          "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
        "radial-gradient":
          "radial-gradient(circle, rgba(74, 0, 224, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
        "dot-pattern":
          "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-sm": "16px 16px",
        "dot-md": "24px 24px",
        "dot-lg": "32px 32px",
      },
      boxShadow: {
        window:
          "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        "window-active":
          "0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(168, 85, 247, 0.15)",
        taskbar: "0 -4px 30px rgba(0, 0, 0, 0.3)",
        "glow-sm": "0 0 15px rgba(168, 85, 247, 0.1)",
        "glow-md": "0 0 30px rgba(168, 85, 247, 0.15)",
        "glow-lg": "0 0 60px rgba(168, 85, 247, 0.2)",
        "glow-green": "0 0 20px rgba(34, 197, 94, 0.15)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.15)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        skill: "0 10px 30px rgba(0, 0, 0, 0.3)",
        project: "0 5px 15px rgba(0, 0, 0, 0.2)",
        "project-hover": "0 15px 30px rgba(0, 0, 0, 0.3)",
        button: "0 4px 15px rgba(142, 45, 226, 0.4)",
        "button-hover": "0 7px 20px rgba(142, 45, 226, 0.5)",
      },
      borderRadius: {
        os: "12px",
        "os-lg": "16px",
        "os-xl": "20px",
      },
      spacing: {
        taskbar: "48px",
        titlebar: "40px",
      },
      backdropBlur: {
        os: "20px",
        "os-heavy": "40px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        windowOpen: {
          from: { opacity: "0", transform: "scale(0.92) translateY(10px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        windowClose: {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.92) translateY(10px)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        float: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(50px, -40px)" },
          "50%": { transform: "translate(100px, 0)" },
          "75%": { transform: "translate(50px, 40px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        shine: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(168, 85, 247, 0.1)" },
          "50%": { boxShadow: "0 0 25px rgba(168, 85, 247, 0.25)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out forwards",
        slideUp: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideDown: "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        scaleIn: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        windowOpen: "windowOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        windowClose: "windowClose 0.2s ease-in forwards",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 20s linear infinite",
        shine: "shine 2s linear infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "0.875rem" }],
      },
      opacity: {
        2: "0.02",
        3: "0.03",
        4: "0.04",
        6: "0.06",
        8: "0.08",
        12: "0.12",
        15: "0.15",
      },
    },
  },
  plugins: [],
};
