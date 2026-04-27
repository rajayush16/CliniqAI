import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          cyan: "#06B6D4",
          teal: "#14B8A6",
        },
        app: {
          light: {
            bg: "#F8FAFC",
            surface: "#FFFFFF",
            text: {
              primary: "#0F172A",
              secondary: "#475569",
            },
            border: "#E2E8F0",
          },
          dark: {
            bg: "#020617",
            surface: "#0F172A",
            text: {
              primary: "#F8FAFC",
              secondary: "#94A3B8",
            },
            border: "#1E293B",
          },
        },
      },
    },
  },
} satisfies Config;

export default config;
