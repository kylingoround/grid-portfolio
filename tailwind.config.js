/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
      },
      fontFamily: {
        header: ['Stacion', 'sans-serif'],
        body: ['var(--font-geist-sans)'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      textStyles: {
        'title-lg': {
          fontSize: '2.5rem',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          fontWeight: '400',
        },
        'title-md': {
          fontSize: '2rem',
          lineHeight: '1.2',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        },
        'title-sm': {
          fontSize: '1.5rem',
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        },
        'subtitle': {
          fontSize: '1.25rem',
          lineHeight: '1.4',
          letterSpacing: '0',
          fontWeight: '300',
        },
        'body-lg': {
          fontSize: '1.125rem',
          lineHeight: '1.5',
          letterSpacing: '0',
          fontWeight: '400',
        },
        'body': {
          fontSize: '1rem',
          lineHeight: '1.5',
          letterSpacing: '0',
          fontWeight: '400',
        },
        'body-sm': {
          fontSize: '0.875rem',
          lineHeight: '1.5',
          letterSpacing: '0',
          fontWeight: '400',
        },
        'caption': {
          fontSize: '0.75rem',
          lineHeight: '1.5',
          letterSpacing: '0.01em',
          fontWeight: '300',
        },
      },
    },
  },
  corePlugins: {
    textStyles: true,
  },
  plugins: [
    require('@tailwindcss/postcss/plugin')({
      textStyles: true
    })
  ],
}
