/** @type {import('@infinityfx/fluid/types').FluidConfig} */
module.exports = {
    theme: {
        font: {
            family: 'var(--font-manrope)'
        },
        palettes: {
            light: {
                primary: ["#df7700", "#e48c25", "#eaa149", "#efb66e", "#f4ca93", "#fadfb7"],
                grey: ["#e6dcc6", "#ccc3b0", "#b3ab9a", "#999284", "#807a6e", "#666258", "#4d4942", "#33312c", "#191816"],
                accent: ["#00df68"],
                bg: ["#efe5cf"],
                fg: ["#fff4dc", "#dfd6c1"]
            },
            dark: {
                primary: ["#df7700", "#ba6300", "#954f00", "#703c00", "#4a2800", "#251400"],
                grey: ["#1a1a1a", "#333333", "#4d4d4d", "#666666", "#808080", "#999999", "#b3b3b3", "#cccccc", "#e6e6e6"],
                accent: ["#00df68"],
                bg: ["#000000"],
                fg: ["#101010", "#202020"]
            }
        }
    },
    paths: [
        './app/**/*.{jsx,tsx}',
        './components/**/*.{jsx,tsx}',
        './context/**/*.{jsx,tsx}'
    ]
}