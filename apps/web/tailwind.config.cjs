/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        fontWeight: {
            // NOTE: Optimize for Noto Sans JP
            thin: '100',
            light: '300',
            normal: '400',
            medium: '500',
            bold: '700',
            extrabold: '900',
        },
        extend: {
            fontFamily: {
                sans: ['Noto Sans JP', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    light: '#3B82F6',
                    DEFAULT: '#1D4ED8',
                    dark: '#1E3A8A',
                },
                secondary: {
                    light: '#F5D0FE',
                    DEFAULT: '#E879F9',
                    dark: '#C026D3',
                },
                black: '#121212',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
    extend: {},
};
