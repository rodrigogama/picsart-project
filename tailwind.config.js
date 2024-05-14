/** @type {import('tailwindcss').Config} */
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin],
};
