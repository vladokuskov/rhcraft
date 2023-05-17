/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        gray: {
          960: '#111111',
        },
      },
      color: {
        white: {
          100: 'F4F4F4',
        },
      },
      fontFamily: {
        sans: ['var(--font-source-sans-pro)'],
        serif: ['var(--font-inter)'],
      },
      screens: {
        sm: '640px',
      },
    },
  },
  plugins: [],
}
