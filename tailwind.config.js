/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',   // Small screens: min-width of 640px
      'md': '768px',   // Medium screens: min-width of 768px
      'lg': '1024px',  // Large screens: min-width of 1024px
      'xl': '1280px',  // Extra large screens: min-width of 1280px
      '2xl': '1536px'
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: "white", // Custom blue color for h1
              // fontWeight: "bold",
            },
            h2: {
              color: "white", // Custom blue color for h2

            },
            h3: {
              color: "white", // Custom blue color for h2

            },
            h4: {
              color: "white", // Custom blue color for h2

              p: {
                color: "white", // Gray text for paragraphs

              },
              strong: {
                color: "white",
              },
              blockquote: {
                borderLeftColor: "#2563EB", // Custom border color for blockquotes
                color: "#6B7280",
                fontStyle: "italic",
              },
            },
          },
        },
        fontFamily: {
          juanaAlt: ['"Juana Alt"', 'sans-serif'],
          juana: ['"Juana"', 'serif'],
          neueMachina: ['"Neue Machina"', 'sans-serif'],
          fontspring: ['"Font Spring"', "serif"]
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }}