export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 30px 80px rgba(14, 95, 255, 0.18)',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        midnight: '#071228',
        'glow-blue': '#4f8dff',
      },
    },
  },
  plugins: [],
}
