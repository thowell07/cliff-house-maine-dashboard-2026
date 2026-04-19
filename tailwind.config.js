/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        mist: '#eef4f7',
        sea: '#327c8f',
        surf: '#79b6b7',
        sand: '#e9d2aa',
        coral: '#de7b62',
        pine: '#355849',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(12, 30, 56, 0.15)',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 30%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.2), transparent 25%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.16), transparent 20%)',
      },
    },
  },
  plugins: [],
};
