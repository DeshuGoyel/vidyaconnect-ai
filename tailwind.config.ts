import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#FFF8F0",
          100: "#FFE8CC",
          200: "#FFD4A8",
          300: "#FFB570",
          400: "#FF9A45",
          500: "#FF6B00",
          600: "#E05000",
          700: "#B83D00",
          800: "#8F2E00",
          900: "#5C1D00"
        },
        navy: {
          50: "#F0F2FF",
          100: "#D9DEFF",
          200: "#B3BCFF",
          300: "#7B8FFF",
          400: "#4D63FF",
          500: "#1A2FD4",
          600: "#0F1FA8",
          700: "#0A1480",
          800: "#060D58",
          900: "#030630"
        },
        ink: {
          50: "#F7F7F8",
          100: "#EDEDEF",
          200: "#D4D4D8",
          300: "#A1A1AA",
          400: "#71717A",
          500: "#3F3F46",
          600: "#27272A",
          700: "#18181B",
          800: "#0A0A0F",
          900: "#050508"
        },
        cream: "#FDFAF5",
        success: "#00C47A",
        warning: "#F5C518",
        danger: "#EF4444"
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px"
      },
      boxShadow: {
        card: "0 14px 40px rgba(10,10,15,0.08)",
        elevated: "0 24px 70px rgba(10,10,15,0.16)",
        ai: "0 0 0 1px rgba(255,107,0,0.26), 0 24px 80px rgba(255,107,0,0.18)"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.88)", opacity: "0.8" },
          "100%": { transform: "scale(1.45)", opacity: "0" }
        },
        "bounce-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "70%": { transform: "scale(1.04)", opacity: "1" },
          "100%": { transform: "scale(1)" }
        }
      },
      animation: {
        fadeInUp: "fadeInUp 500ms ease both",
        shimmer: "shimmer 1.8s infinite",
        "pulse-ring": "pulse-ring 1.4s infinite",
        "bounce-in": "bounce-in 420ms ease both"
      }
    }
  },
  plugins: []
};

export default config;
