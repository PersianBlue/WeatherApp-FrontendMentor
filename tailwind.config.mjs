/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Neutral Colors
        neutral: {
          900: "#02012C",
          800: "#262540",
          700: "#302F4A",
          600: "#3C3B5E",
          300: "hsl(240, 6%, 70%)",
          200: "hsl(250, 6%, 84%)",
          0: "hsl(0, 0%, 100%)",
        },
        // Orange
        orange: {
          500: "hsl(28, 100%, 52%)",
        },
        // Blue
        blue: {
          500: "hsl(233, 67%, 56%)",
          700: "hsl(248, 70%, 36%)",
        },
      },
      fontFamily: {
        // DM Sans for body text
        sans: ["DM Sans", "system-ui", "sans-serif"],
        // Bricolage Grotesque for headings
        heading: ["Bricolage Grotesque", "system-ui", "sans-serif"],
      },
      fontSize: {
        base: "18px", // Body copy size
      },
    },
  },
  plugins: [],
};
