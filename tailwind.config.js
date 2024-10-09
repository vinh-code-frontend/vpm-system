/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        ssm: '480px',
        120: '30rem'
      }
    },
    screens: {
      ssm: '480px'
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const weights = [100, 200, 300, 400, 500, 600, 700, 800]
      const newUtilities = weights.reduce((acc, weight) => {
        acc[`.font-playpen-${weight}`] = {
          fontFamily: '"Playpen Sans", cursive',
          fontOpticalSizing: 'auto',
          fontWeight: weight,
          fontStyle: 'normal'
        }
        return acc
      }, {})

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
