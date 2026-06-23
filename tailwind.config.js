/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./features/**/*.{js,jsx}",
    "./store/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        hv: {
          cyan: '#3EE6FF',
          sky: '#3B82F6',
          lavender: '#8B5CF6',
          indigo: '#6366F1',
          coral: '#FF6B6B',
          mint: '#22C55E',
          bg: '#F8FAFF',
          surface: '#FFFFFF',
          foreground: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        card: '0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -1px rgba(0,0,0,0.02)',
        elevated: '0 12px 20px -8px rgba(0,0,0,0.06), 0 4px 8px -4px rgba(0,0,0,0.03)',
        modal: '0 25px 50px -12px rgba(0,0,0,0.12)',
        hover: '0 20px 28px -8px rgba(0,0,0,0.08), 0 8px 12px -6px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        soft: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        card: '16px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
