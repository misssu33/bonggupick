import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--bg-cream)",
        paper: "var(--bg-paper)",
        charcoal: "var(--text-charcoal)",
        mute: "var(--text-mute)",
        caramel: "var(--accent-caramel)",
        "accent-caramel": "var(--accent-caramel)",
        "accent-primary-hover": "var(--accent-primary-hover)",
        "accent-light": "var(--accent-light)",
        "line-soft": "var(--line-soft)",
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        serif: [
          "var(--font-noto-serif-kr)",
          "Noto Serif KR",
          "Georgia",
          "serif",
        ],
        /** prose 등에서 `font-noto-serif` 유틸로 사용 */
        "noto-serif": [
          "var(--font-noto-serif-kr)",
          "Noto Serif KR",
          "Georgia",
          "serif",
        ],
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "1.6" }],
        sm: ["var(--text-sm)", { lineHeight: "1.65" }],
        base: ["var(--text-base)", { lineHeight: "1.7" }],
        lg: ["var(--text-lg)", { lineHeight: "1.65" }],
        xl: ["var(--text-xl)", { lineHeight: "1.5" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "1.4" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "1.25" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "1.15" }],
        "5xl": ["var(--text-5xl)", { lineHeight: "1.1" }],
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        24: "var(--space-24)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        hover: "var(--shadow-hover)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--text-charcoal)",
            maxWidth: "none",
            lineHeight: "1.8",
            a: {
              color: "var(--accent-caramel)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            },
            strong: { color: "var(--text-charcoal)" },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
