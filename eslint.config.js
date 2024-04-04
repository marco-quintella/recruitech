import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu({
  formatters: true,
  unocss: true,
}, nuxt)
