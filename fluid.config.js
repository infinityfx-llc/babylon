/** @type {import('@infinityfx/fluid/types').FluidConfig} */
module.exports = {
    theme: {
        font: {
            family: 'var(--font-manrope)'
        },
        palettes: {
            light: {
                primary: ['#d67922', '#dd8f47', '#e4a66c', '#ebbc91', '#f1d2b5', '#f8e9da'],
                accent: ['#000000'],
                fg: ['#ffffff', '#f2edeb'],
                bg: ['#f7f6f5']
            },
            dark: {
                primary: ['#d67922', '#b2651c', '#8f5117', '#6b3d11', '#47280b', '#241406'],
                fg: ['#141414', '#1f1f1f'],
                accent: ['#ffffff']
            }
        }
    },
    paths: [
        './app/**/*.{jsx,tsx}',
        './components/**/*.{jsx,tsx}',
        './context/**/*.{jsx,tsx}'
    ]
}