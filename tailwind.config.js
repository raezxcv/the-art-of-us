/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'scrap-cream': '#FAF7F2',
        'scrap-paper': '#F3ECE2',
        'scrap-kraft': '#E9DFCE',
        'scrap-peach': '#FDE4D0',
        'scrap-peach-dark': '#F5BFA2',
        'scrap-cherry': '#C0392B',
        'scrap-cherry-dark': '#8E1B1B',
        'scrap-butter': '#FEF3C7',
        'scrap-butter-dark': '#FDE68A',
        'scrap-brown': '#2C1E14',
        'scrap-sepia': '#4A3525',
        'scrap-pencil': '#6B4E38',
        'scrap-sage': '#5E6C52',
        'scrap-slate': '#47667B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Fraunces"', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
        casual: ['"Patrick Hand"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'polaroid': '0 12px 32px -8px rgba(44, 30, 20, 0.18), 0 4px 10px -2px rgba(44, 30, 20, 0.08)',
        'polaroid-hover': '0 20px 40px -10px rgba(44, 30, 20, 0.28), 0 8px 16px -4px rgba(44, 30, 20, 0.12)',
        'paper': '0 8px 24px -4px rgba(44, 30, 20, 0.1), 0 2px 6px -1px rgba(44, 30, 20, 0.05)',
        'paper-curl': '0 15px 30px -10px rgba(44, 30, 20, 0.22), 0 2px 5px rgba(0, 0, 0, 0.06)',
        'tape': '0 2px 4px rgba(44, 30, 20, 0.12)',
      },
    },
  },
  plugins: [],
}

