import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                luxeGold: '#D4AF37',
                deepBlack: '#000000',
                charcoal: '#1A1A1A',
                powerGreen: '#10B981',
            },
            fontFamily: {
                arabic: ['Amiri', 'serif'],
                calligraphy: ['"Cinzel Decorative"', 'serif'],
                'arabic-display': ['"El Messiri"', 'sans-serif'],
                display: ['Bebas Neue', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
