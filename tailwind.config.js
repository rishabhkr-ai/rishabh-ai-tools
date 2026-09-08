/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        mesh:
          'radial-gradient(60% 50% at 15% 10%, rgba(124,92,255,0.22) 0%, rgba(124,92,255,0) 60%), radial-gradient(50% 45% at 85% 8%, rgba(34,211,238,0.16) 0%, rgba(34,211,238,0) 60%), radial-gradient(55% 55% at 50% 100%, rgba(124,92,255,0.12) 0%, rgba(124,92,255,0) 60%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(20px, -15px) scale(1.05)' },
        },
        rise: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        drift: 'drift 16s ease-in-out infinite',
        'drift-slow': 'drift 22s ease-in-out infinite reverse',
        rise: 'rise 0.45s ease-out both',
      },
    },
  },
  plugins: [],
}
