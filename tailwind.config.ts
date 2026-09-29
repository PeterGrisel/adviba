import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          soft: 'rgb(var(--color-accent-soft) / <alpha-value>)',
          bright: 'rgb(var(--color-accent-bright) / <alpha-value>)',
        },
        brand: {
          orange: 'rgb(var(--color-brand-orange) / <alpha-value>)',
          green: 'rgb(var(--color-brand-green) / <alpha-value>)',
        },
        dark: {
          DEFAULT: 'rgb(var(--color-dark) / <alpha-value>)',
          deep: 'rgb(var(--color-dark-deep) / <alpha-value>)',
          line: 'rgb(var(--color-dark-line) / <alpha-value>)',
          fg: 'rgb(var(--color-on-dark) / <alpha-value>)',
          'fg-muted': 'rgb(var(--color-on-dark-muted) / <alpha-value>)',
        },
        sky: {
          DEFAULT: 'rgb(var(--color-sky) / <alpha-value>)',
          soft: 'rgb(var(--color-sky-soft) / <alpha-value>)',
        },
        cta: 'rgb(var(--color-cta) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-display)', 'ui-sans-serif', 'Segoe UI', 'sans-serif'],
        slab: ['var(--font-slab)', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(51, 54, 59, 0.05), 0 8px 24px rgba(51, 54, 59, 0.05)',
        elevated: '0 2px 6px rgba(51, 54, 59, 0.07), 0 20px 44px rgba(51, 54, 59, 0.08)',
        warm: '0 1px 2px rgba(226, 146, 0, 0.1), 0 12px 28px rgba(226, 146, 0, 0.14)',
      },
      borderRadius: {
        card: '20px',
      },
    },
  },
  plugins: [],
};

export default config;
