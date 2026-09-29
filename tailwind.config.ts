import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
        },
        line: 'var(--color-line)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          soft: 'var(--color-accent-soft)',
          bright: 'var(--color-accent-bright)',
        },
        brand: {
          orange: 'var(--color-brand-orange)',
          green: 'var(--color-brand-green)',
        },
        dark: {
          DEFAULT: 'var(--color-dark)',
          deep: 'var(--color-dark-deep)',
          line: 'var(--color-dark-line)',
          fg: 'var(--color-on-dark)',
          'fg-muted': 'var(--color-on-dark-muted)',
        },
        sky: {
          DEFAULT: 'var(--color-sky)',
          soft: 'var(--color-sky-soft)',
        },
        cta: 'var(--color-cta)',
        success: 'var(--color-success)',
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
