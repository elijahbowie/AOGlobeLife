/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Deep backgrounds
        apex: {
          950: '#050507',    // Deepest black
          900: '#0a0a0f',    // Very dark
          800: '#12121a',    // Main background
          700: '#1a1a24',    // Card background
          600: '#24242f',    // Elevated surfaces
          500: '#2e2e3a',    // Borders
          400: '#3d3d4a',    // Subtle borders
          300: '#4d4d5a',    // Disabled text
        },
        // Accent - Luxury Gold
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',    // Primary accent
          500: '#f59e0b',    // Hover state
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Success/Progress - Emerald
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Rank colors
        rank: {
          producer: '#94a3b8',      // Silver - Base producers
          regional: '#60a5fa',      // Blue - Regional Producer
          coexec: '#a78bfa',        // Purple - Co-Executive
          executive: '#fbbf24',     // Gold - Executive Producer
          chief: '#f472b6',         // Pink - Chief Executive
          partner: '#ef4444',       // Red - Partner
          senior: '#dc2626',        // Deep Red - Senior Partner
        },
        // Status colors
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-gradient': 'linear-gradient(135deg, #12121a 0%, #1a1a24 50%, #0a0a0f 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), transparent)',
        'card-gradient': 'linear-gradient(180deg, rgba(26, 26, 36, 0.8) 0%, rgba(18, 18, 26, 0.9) 100%)',
        'glow-gold': 'radial-gradient(circle at center, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
        'glow-emerald': 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.15)',
        'glow-gold-lg': '0 0 40px rgba(251, 191, 36, 0.2)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-emerald-lg': '0 0 40px rgba(16, 185, 129, 0.2)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.35)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'progress': 'progress 1s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' },
        },
        glow: {
          '0%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
