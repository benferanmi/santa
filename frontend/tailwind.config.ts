import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Unified color definitions
        primary: "var(--primary, var(--color-primary))",
        "primary-foreground":
          "var(--primary-foreground, var(--color-primary-content))",

        secondary: "var(--secondary, var(--color-secondary))",
        "secondary-foreground":
          "var(--secondary-foreground, var(--color-secondary-content))",

        accent: "var(--accent, var(--color-accent))",
        "accent-foreground":
          "var(--accent-foreground, var(--color-accent-content))",

        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",

        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        gone: "var(--from-color)",
        gtwo: "var(--to-color)",
        gthree: "var(--via-color)",

        special: "var(--color-special)", // optional fallback
      },
      backgroundImage: {
        image1: "var(--image1)",
        image2: "var(--image2)",
        image3: "var(--image3)",
        image4: "var(--image4)",
        image5: "var(--image5)",
        gradient:
          "linear-gradient(to right, var(--from-color), var(--via-color), var(--to-color))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    themes: true,
  },
};

export default config;
