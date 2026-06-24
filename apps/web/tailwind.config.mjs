/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f4f1e8",
        paper: "#fbf9f2",
        ink: "#16201a",
        moss: "#1b5e43",
        sage: "#9fdcb8",
        clay: "#b07a3a",
        lavender: "#efeaff"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        panel: "0 18px 60px rgba(40,55,45,.16)",
        soft: "0 12px 34px rgba(40,55,45,.14)"
      }
    }
  },
  plugins: []
};

export default config;
