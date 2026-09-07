import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: { 950: '#020617', 900: '#0f172a', 800: '#1e293b', 700: '#334155', 600: '#475569' },
        surface: { base: '#f8fafc', card: '#ffffff', subtle: '#f1f5f9', border: '#e2e8f0' },
        cisco: {
          blue: '#0284c7',
          dark: '#005073',
          cyan: '#0891b2',
          green: '#059669',
          amber: '#d97706',
          purple: '#7c3aed'
        },
        primary: '#0284c7',
        cyan: '#0891b2',
        purple: '#7c3aed',
        green: '#059669',
        orange: '#ea580c',
        text: { 
          heading: '#0f172a', 
          body: '#334155', 
          muted: '#64748b',
          light: '#f8fafc' 
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
