/** @type {import('tailwindcss').Config} */
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#C209C1",
        "brand-secondary": "#5A00EE",
      },
    },
  },
  plugins: [formsPlugin],
};
