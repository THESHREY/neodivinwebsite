import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === SPIRITUAL INDIAN PALETTE ===
        // Primary accent — Sacred Saffron (Kesari)
        saffron: {
          DEFAULT: "#E07C24",
          light: "#F0A050",
          dark: "#C06820",
          muted: "#E07C2415",
        },
        // Temple Gold — Warm divine gold
        gold: {
          DEFAULT: "#C8A951",
          light: "#DCC078",
          dark: "#A88D3A",
          muted: "#C8A95115",
        },
        // Warm cream backgrounds — Purity / Sattvic
        cream: {
          DEFAULT: "#FFF8F0",
          dark: "#F5ECDF",
          light: "#FFFDF8",
        },
        // Earth brown — Grounding text color
        charcoal: {
          DEFAULT: "#2A1A10",
          light: "#3D2B1F",
          dark: "#1A0D05",
        },
        // Sage green — Healing / Nature
        sage: {
          DEFAULT: "#6B8F71",
          light: "#8AAF8F",
          dark: "#4E6E53",
        },
        // Deep Maroon — Shakti / Power
        maroon: {
          DEFAULT: "#7B2D3B",
          light: "#9E4A5A",
          dark: "#5A1F2B",
        },
        // Sandalwood — Warm neutral
        sandal: {
          DEFAULT: "#DCC5A0",
          light: "#EDD8B8",
          dark: "#C4A878",
        },
        // Terracotta — Earthy warmth
        terra: {
          DEFAULT: "#C1694F",
          light: "#D4876E",
          dark: "#A35238",
        },
        // Keep purple for admin (backward compat)
        purple: {
          DEFAULT: "#4A2C5E",
          light: "#6B4587",
          dark: "#331F42",
        },
        "soft-white": "#FFFDF8",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        display: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-xl": ["2.25rem", { lineHeight: "1.2" }],
        "heading-lg": ["1.875rem", { lineHeight: "1.3" }],
        heading: ["1.5rem", { lineHeight: "1.3" }],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in-down": "fadeInDown 0.7s ease-out forwards",
        "slide-in-left": "slideInLeft 0.7s ease-out forwards",
        "slide-in-right": "slideInRight 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "diya-flicker": "diyaFlicker 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(200,169,81,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(200,169,81,0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(200,169,81,0.4)" },
          "50%": { boxShadow: "0 0 0 15px rgba(200,169,81,0)" },
        },
        diyaFlicker: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "25%": { opacity: "0.85", transform: "scale(1.02)" },
          "50%": { opacity: "1", transform: "scale(0.98)" },
          "75%": { opacity: "0.9", transform: "scale(1.01)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gold-shimmer":
          "linear-gradient(110deg, transparent 25%, rgba(200,169,81,0.1) 50%, transparent 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
