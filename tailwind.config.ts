import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        ink: {
          50:  "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          950: "#0C0A09",
        },
        success: "#059669",
        warning: "#D97706",
        danger:  "#DC2626",
        info:    "#2563EB",
      },
      fontFamily: {
        display: ["var(--font-clash)", "sans-serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm:    "8px",
        DEFAULT: "12px",
        md:    "12px",
        lg:    "16px",
        xl:    "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        soft:     "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)",
        card:     "0 2px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        elevated: "0 4px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.10)",
        brand:    "0 4px 16px rgba(249,115,22,0.24)",
        "brand-lg": "0 8px 32px rgba(249,115,22,0.32)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        "fade-up": "fadeUp 0.3s ease-out",
        "count-up": "countUp 0.6s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        countUp: {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
