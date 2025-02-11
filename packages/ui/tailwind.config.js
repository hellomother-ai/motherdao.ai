/** @type {import('tailwindcss').Config} */
import config from "@repo/tailwind-config/tailwind";

export default {
  ...config,
  content: ["./src/**/*.{ts,tsx}"],
};
