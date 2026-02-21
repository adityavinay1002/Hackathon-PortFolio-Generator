/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f4ff',
                    100: '#d9e2ff',
                    200: '#bcd0ff',
                    300: '#8eb3ff',
                    400: '#5889ff',
                    500: '#2c56ff',
                    600: '#1a3bff',
                    700: '#122ceb',
                    800: '#0f24bd',
                    900: '#132494',
                },
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
