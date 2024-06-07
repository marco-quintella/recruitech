import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        mono: 'DM Mono',
        sans: 'Inter',
        serif: 'DM Serif Display',
      },
    }),
  ],
  safelist: ['text-primary-text', 'text-secondary-text'],
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['border', 'b-2 b-rd-2'],
    ['primary-border', 'border b-primary'],
  ],
  theme: {
    colors: {
      background: {
        DEFAULT: '#fff',
        text: '#1a1a1a',
      },
      primary: {
        dark: '#390854',
        DEFAULT: 'var(--color-primary)',
        light: '#7912b0',
        text: '#fff',
      },
      secondary: {
        dark: '#d13f7a',
        DEFAULT: '#f25d9c',
        light: '#f68cb9',
        text: '#590d82',
      },
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
