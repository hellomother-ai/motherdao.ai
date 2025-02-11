import config from "@repo/tailwind-config/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  ...config,
  content: [
    "../../packages/ui/src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/stories/*.{tsx,ts}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
};
