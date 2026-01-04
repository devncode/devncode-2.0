/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: "#cc775c",
        peach: "#d5a37f",
        beige: "#e2dacc",
        "custom-black": "#141415",
      },
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};
