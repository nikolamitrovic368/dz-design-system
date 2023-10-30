/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './stories/*'],
  content: [],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'blue-500': '#2276FC',
        'yellow-100': '#fef7da',
        'blue-80': '#000092',
        black: {
          10: '#F5F5F5',
          20: '#E8E8E8',
          30: '#E9E9E9',
          40: '#CDCDCD',
          60: '#757575',
          80: '#4D4D4D',
          100: '#000000',
        },
        red: {
          10: 'rgba(254, 112, 57, 0.1)',
          40: '#B75D3B',
          60: 'rgba(235, 20, 20, 0.1)',
          100: '#C33022',
        },
        green: {
          10: 'rgba(94, 149, 94, 0.1)',
          100: '#3F5A3F',
        },
        white: {
          100: '#FFFFFF',
          '100-op-80': '#FFFFFFCC',
          '100-op-60': '#FFFFFF99',
        },
        yellow: {
          10: 'rgba(255, 209, 23, 0.1)',
          40: '#8E7305',
        },
      },
      containers: {
        '6colMbl': '8.375rem',
        '2col': '13.9375rem',
        '3col': '20.9375rem',
        '4col': '27.125rem',
        '6col': '42.375rem',
        '10col': '74.75rem',
        '12col': '90rem',
        '12colMbl': '20rem',
        headerMd: '56.25rem',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontFamily: {
        sans: [
          'avenir-medium',
          'avenir-medium-italic',
          'avenir-regular',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: ['0.75rem', '1.125rem'],
        sm: ['0.875rem', '1.375rem'],
        md: ['1rem', '1.5rem'],
        lg: ['1.375rem', '1.75rem'],
        xl: ['1.875rem', '2.25rem'],
        xxl: ['2.75rem', '3.25rem'],
        xxxl: ['4.125rem', '4.625rem'],
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        drop: '0px 2px 18px rgba(0, 0, 0, 0.06)',
        top: '0px -25px 38px -24px rgba(0, 0, 0, 0.12)',
        down: '0px 25px 38px -24px rgba(0, 0, 0, 0.12)',
        bottomBorderBlack20: '0px 1px 0px 0px #E8E8E8',
        bottomBorderBlack60: '0px 1px 0px 0px #757575',
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.2)' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        topPositionMbl: {
          '0%': { top: '1.75rem', opacity: 0 },
          '100%': { top: '3.75rem', opacity: 1 },
        },
      },
      transitionTimingFunction: {
        'dz-timing': 'cubic-bezier(.73,.71,.65,.99)',
      },
      transitionProperty: {
        'text-decoration': 'text-decoration',
      },
      animation: {
        slowZoomIn: '15s ease-in 0.3s 1 both zoomIn',
        slowZoomOut: '15s ease-in 0.3s 1 both zoomOut',
        fadeIn: 'fadeIn 0.3s ease-in both',
        slowTop: 'topPositionMbl 0.3s ease-in both',
      },
      screens: {
        xs: '576px',
        md: '769px',
      },
      dropShadow: {
        100: '0px 2px 18px rgba(0, 0, 0, 0.06)',
        150: '0px 2px 18px rgba(0, 0, 0, 0.08)'
      },
      textDecorationColor: {
        'black-60': '#757575',
        'black-100': '#000',
      }
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/container-queries'),
  ],
};
