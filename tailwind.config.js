/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'class',
    theme: {
        fontSize: { xss : '0.17rem', xsm: '0.45rem', xms : '0.4rem'},
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
    ],
}
