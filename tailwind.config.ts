import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: { 900: '#050816', 800: '#0B1020', 700: '#111827' },
        primary: '#2563EB',
        cyan: '#06B6D4',
        purple: '#8B5CF6',
        green: '#10B981',
        orange: '#F59E0B',
        text: { light: '#F8FAFC', muted: '#CBD5E1', dark: '#94A3B8' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
