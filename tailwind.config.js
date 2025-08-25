/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8e2de2',
          dark: '#4a00e0',
          light: '#a855f7'
        },
        dark: {
          DEFAULT: '#0a0a0a',
          light: '#121212',
          lighter: '#1a1a1a'
        },
        light: {
          DEFAULT: '#ffffff',
          dark: '#f5f5f5',
          darker: '#e5e5e5'
        },
        monacoBg: '#011627', // Monaco editor background
        monacoText: '#c792ea', // Monaco editor text color
        monacoKeyword: '#569cd6', // Keywords like `int`, `return`
        monacoString: '#ce9178', // String literals
        monacoComment: '#6a9955', // Comments
        monacoFunction: '#dcdcaa', // Function names
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'], // Monaco-like font
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #4a00e0, #8e2de2)',
        'radial-gradient': 'radial-gradient(circle, rgba(74, 0, 224, 0.1) 0%, rgba(0, 0, 0, 0) 70%)'
      },
      boxShadow: {
        'skill': '0 10px 30px rgba(0, 0, 0, 0.3)',
        'project': '0 5px 15px rgba(0, 0, 0, 0.2)',
        'project-hover': '0 15px 30px rgba(0, 0, 0, 0.3)',
        'button': '0 4px 15px rgba(142, 45, 226, 0.4)',
        'button-hover': '0 7px 20px rgba(142, 45, 226, 0.5)'
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

