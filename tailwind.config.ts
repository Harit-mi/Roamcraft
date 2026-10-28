import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Color Palette ──────────────────────────────────────────────────
      colors: {
        // Canvas / paper surfaces
        canvas: {
          DEFAULT: "#FAF8F5",
          subtle: "#F5EFEB",
          muted: "#EBE3DB",
        },
        cream: {
          50: "#FDFBF7",
          100: "#FAF8F5",
          200: "#F5EFEB",
          300: "#EBE3DB",
          400: "#DED3C7",
        },
        // Terracotta — primary brand accent
        terracotta: {
          50:  "#FDF6F3",
          100: "#F9ECE6",
          200: "#F2D5CA",
          300: "#E6B2A0",
          400: "#D7846B",
          500: "#C85A32",
          DEFAULT: "#C85A32",
          600: "#B44A24",
          700: "#923819",
          800: "#742C15",
          900: "#5D2311",
        },
        // Forest — secondary accent
        forest: {
          50:  "#F0F6F3",
          100: "#D9E9E0",
          200: "#B4D3C3",
          500: "#2D6A4F",
          700: "#1B4332",
          800: "#143326",
          900: "#0D2219",
        },
        // Charcoal — text hierarchy
        charcoal: {
          50:  "#A8A29E",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          950: "#11100F",
        },
        // Design-token aliases
        journal: {
          paper:     "#F8F5F0",
          parchment: "#F2EDE4",
          sand:      "#E7DFD5",
          ink:       "#181614",
          clay:      "#C2542D",
          cedar:     "#263D33",
          amber:     "#D9822B",
        },
        // Semantic design roles
        ink:    "#181614",
        clay:   "#C2542D",
        parch:  "#F2EDE4",
        cedar:  "#263D33",
        amber:  "#D9822B",
        mist:   "#78716C",
        sand:   "#E7DFD5",
      },

      // ── Typography ─────────────────────────────────────────────────────
      fontFamily: {
        // Display / Editorial headings → Fraunces (optical‑size aware, has italic)
        display: ["Fraunces", "Georgia", "Times New Roman", "serif"],
        serif:   ["Fraunces", "Georgia", "Times New Roman", "serif"],
        // Interface, body, labels → DM Sans
        sans:    ["'DM Sans'", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        // Monospace stamps, locus tags, coordinates → DM Mono
        mono:    ["'DM Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      // ── Type Scale ─────────────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem",  { lineHeight: "1rem",    letterSpacing: "0.04em" }],  // 10px
        "xs":  ["0.75rem",   { lineHeight: "1.125rem", letterSpacing: "0.01em" }], // 12px
        "sm":  ["0.875rem",  { lineHeight: "1.375rem", letterSpacing: "0em" }],    // 14px
        "base":["1rem",      { lineHeight: "1.625rem", letterSpacing: "0em" }],    // 16px
        "lg":  ["1.125rem",  { lineHeight: "1.75rem",  letterSpacing: "-0.01em" }],// 18px
        "xl":  ["1.25rem",   { lineHeight: "1.875rem", letterSpacing: "-0.01em" }],// 20px
        "2xl": ["1.5rem",    { lineHeight: "2rem",     letterSpacing: "-0.02em" }],// 24px
        "3xl": ["1.875rem",  { lineHeight: "2.375rem", letterSpacing: "-0.02em" }],// 30px
        "4xl": ["2.25rem",   { lineHeight: "2.75rem",  letterSpacing: "-0.03em" }],// 36px
        "5xl": ["3rem",      { lineHeight: "3.5rem",   letterSpacing: "-0.03em" }],// 48px
        "6xl": ["3.75rem",   { lineHeight: "4.25rem",  letterSpacing: "-0.04em" }],// 60px
        "7xl": ["4.5rem",    { lineHeight: "4.875rem", letterSpacing: "-0.04em" }],// 72px
        "8xl": ["6rem",      { lineHeight: "6.5rem",   letterSpacing: "-0.05em" }],// 96px
      },

      // ── Spacing & Layout ───────────────────────────────────────────────
      spacing: {
        "4.5": "1.125rem",
        "18":  "4.5rem",
        "22":  "5.5rem",
      },

      // ── Border Radius ──────────────────────────────────────────────────
      borderRadius: {
        "sm":  "4px",
        "md":  "6px",
        "lg":  "10px",
        "xl":  "14px",
        "2xl": "18px",
        "3xl": "24px",
        "4xl": "32px",
      },

      // ── Box Shadows ────────────────────────────────────────────────────
      boxShadow: {
        "2xs": "0 1px 1px 0 rgba(24, 22, 20, 0.03)",
        "xs":  "0 1px 2px 0 rgba(24, 22, 20, 0.05)",
        "sm":  "0 2px 4px 0 rgba(24, 22, 20, 0.06), 0 1px 2px 0 rgba(24, 22, 20, 0.04)",
        "card":"0 1px 3px rgba(24,22,20,0.07), 0 1px 2px rgba(24,22,20,0.04)",
        "lifted":"0 4px 12px rgba(24,22,20,0.08), 0 2px 4px rgba(24,22,20,0.04)",
        "float":"0 8px 24px rgba(24,22,20,0.10), 0 4px 8px rgba(24,22,20,0.05)",
        "inner-xs": "inset 0 1px 2px rgba(24, 22, 20, 0.06)",
      },

      // ── Transitions ────────────────────────────────────────────────────
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo":  "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      transitionDuration: {
        "150": "150ms",
        "250": "250ms",
        "350": "350ms",
      },

      // ── Animation ──────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up":  "fade-up 0.25s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
