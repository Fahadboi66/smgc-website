/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060e1e',
          900: '#0a1628',
          800: '#0f2044',
          700: '#1a3260',
          600: '#1e3a75',
        },
        cyan: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulse_glow: 'pulse_glow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(56,189,248,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(56,189,248,0)' },
        },
      },
    },
  },
  plugins: [],
}
