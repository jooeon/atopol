/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        './index.html',
    ],
    plugins: [
        require('@tailwindcss/aspect-ratio'),
    ],
    theme: {
        fontFamily: {
            'hedvig': ['Hedvig Letters Serif', 'georgiapro', 'serif'],
            'georgia': ['georgiapro', 'serif'],
        },
        extend: {
            width: {
                '50vw': '50vw',
                '90vw': '90vw',
            },
            maxWidth: {
                'half': '50%',
                '90vw': '90vw',
            },
            height: {
                '500px':'500px',
                '90vh': '90vh',
            },
            minHeight: {
                '30vh': '30vh',
            },
            maxHeight: {
                '90vh': '90vh',
            },
            spacing: {
                '40rem' : '40rem',
                '50rem' : '50rem',
                '60rem' : '60rem',
            },
            fontSize: {
                '35px': '35px',
                '5xs': ['0.25rem', '0.667rem'],
                '4xs': ['0.375rem', '0.667rem'],
                '3xs': ['0.5rem', '0.75rem'],
                '2xs': ['0.625rem', '0.75rem'],
                '10xl': '10rem', /* 160px */
                '11xl': '12rem', /* 192px */
                '12xl': '13.5rem', /* 216px */
                '13xl': '15rem', /* 240px */
                '14xl': '17rem', /* 272px */
                '15xl': '19rem', /* 304px */
                '16xl': '21rem', /* 336px */
                '17xl': '23rem', /* 368px */
                '18xl': '25rem', /* 400px */
            },
            backdropBlur: {
                xs: '0.75px',
            },
            colors: {
                customWhite: "#f1f1f1",
                customBlack: "#050505",
                customBlackLight: "#151515",
                customGray: "#4e4e4e",
                customGrayLight: "#8e8e8e",
                customGrayLighter: "#cccccc",
                customNavy: "#100f14",
                customNavyLight: "#15141a",
            },
            screens: {
                'xs': '390px',
                '3xl': '2560px',	// 1440p (QHD)
                '4xl': '3024px',	// MacBook Pro 14"
                '5xl': '3456px',	// MacBook Pro 16"
                '6xl': '3840px',	// 4k (UHD)
                '7xl': '5120px',	// Studio Display
            },
        }
    },
};
