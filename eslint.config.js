import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu({
  formatters: true,
  rules: {
    'perfectionist/sort-array-includes': 'warn',
    'perfectionist/sort-enums': 'warn',
    'perfectionist/sort-exports': 'warn',
    'perfectionist/sort-objects': 'warn',
  },
  unocss: true,
}, nuxt)
