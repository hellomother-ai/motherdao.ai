/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
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
      maxWidth: {
        limit: "1340px",
      },
      spacing: {
        "2xs": "var(--spacing-100)",
        xs: "var(--spacing-200)",
        sm: "var(--spacing-300)",
        md: "var(--spacing-400)",
        lg: "var(--spacing-500)",
        xl: "var(--spacing-600)",
        "2xl": "var(--spacing-700)",
        "3xl": "var(--spacing-800)",
      },
      fontSize: {
        base: "var(--sizing-200)",
        sm: "var(--sizing-150)",
        md: "var(--sizing-200)",
        lg: "var(--sizing-300)",
        xl: "var(--sizing-400)",
        "1xl": "var(--sizing-500)",
        "2xl": "var(--sizing-700)",
      },
      boxShadow: {
        active: "0 0 0 2px hsl(var(--primary-500))",
        "3xl": "0 0 28px 0 hsl(40, 100%, 77%)",
      },
      /* Tailwind convenience color shortcuts */
      colors: {
        /* TODO: these aren't defined yet */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        background: "hsl(var(--app))",
        app: "hsl(var(--app))",

        /* Primary brand color */
        primary: "hsl(var(--primary-600))",

        /* Theme colors */
        surface: {
          DEFAULT: "hsl(var(--surface-primary-fill))",
          outline: "hsl(var(--surface-primary-outline))",
          secondary: {
            DEFAULT: "hsl(var(--surface-secondary-fill))",
            outline: "hsl(var(--surface-secondary-outline))",
          },
          tertiary: {
            DEFAULT: "hsl(var(--surface-tertiary-fill))",
            outline: "hsl(var(--surface-tertiary-outline))",
          },
          highlight: {
            DEFAULT: "hsl(var(--surface-highlight-fill))",
            outline: "hsl(var(--surface-highlight-outline))",
          },
          progress: {
            DEFAULT: "hsl(var(--surface-progress-fill))",
          },
        },
        feedback: {
          alert: "hsl(var(--feedback-alert))",
          success: "hsl(var(--feedback-success))",
          warning: "hsl(var(--feedback-warning))",
        },
        foreground: {
          DEFAULT: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          tertiary: "hsl(var(--text-tertiary))",
          highlight: "hsl(var(--text-highlight))",
          progress: "hsl(var(--text-primary))",
          disabled: "hsl(var(--text-disabled))",
        },
        "primary-500": "hsl(var(--primary-500))",
        "primary-600": "hsl(var(--primary-600))",

        "neutral-50": "hsl(var(--neutral-50))",
        "neutral-100": "hsl(var(--neutral-100))",
        "neutral-200": "hsl(var(--neutral-200))",
        "neutral-300": "hsl(var(--neutral-300))",
        "neutral-400": "hsl(var(--neutral-400))",
        "neutral-500": "hsl(var(--neutral-500))",
        "neutral-600": "hsl(var(--neutral-600))",
        "neutral-650": "hsl(var(--neutral-650))",
        "neutral-700": "hsl(var(--neutral-700))",
        "neutral-800": "hsl(var(--neutral-800))",
        "neutral-900": "hsl(var(--neutral-900))",

        "secondary-100": "hsl(var(--secondary-100))",
        "secondary-200": "hsl(var(--secondary-200))",
        "secondary-300": "hsl(var(--secondary-300))",
        "secondary-400": "hsl(var(--secondary-400))",

        "tertiary-200": "hsl(var(--tertiary-200))",
        "tertiary-300": "hsl(var(--tertiary-300))",
        "tertiary-500": "hsl(var(--tertiary-500))",
        "tertiary-600": "hsl(var(--tertiary-600))",
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
      fontFamily: {
        sans: ["AeonikPro", ...defaultTheme.fontFamily.sans],
        mono: ["AeonikFono", ...defaultTheme.fontFamily.mono],
        aeonpro: ["AeonikPro", ...defaultTheme.fontFamily.sans],
        aeonfono: ["AeonikFono", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
