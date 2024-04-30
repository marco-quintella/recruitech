import process from 'node:process'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { href: '/favicon.ico', rel: 'icon', sizes: 'any' },
        { href: '/nuxt.svg', rel: 'icon', type: 'image/svg+xml' },
        { href: '/apple-touch-icon.png', rel: 'apple-touch-icon' },
      ],
      meta: [
        { content: 'width=device-width, initial-scale=1', name: 'viewport' },
        { content: appDescription, name: 'description' },
        { content: 'black-translucent', name: 'apple-mobile-web-app-status-bar-style' },
        { content: 'white', media: '(prefers-color-scheme: light)', name: 'theme-color' },
        { content: '#222222', media: '(prefers-color-scheme: dark)', name: 'theme-color' },
      ],
      viewport: 'width=device-width,initial-scale=1',
    },
  },

  colorMode: {
    classSuffix: '',
  },

  css: [
    '@unocss/reset/tailwind.css',
    'assets/main.sass',
  ],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  eslintConfig: {
    setup: false,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    // typedPages: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  imports: {
    dirs: [
      './db/**/*',
      './composables/**/*',
    ],
  },

  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-module-eslint-config',
    'nuxt-quasar-ui',
    '@pinia-plugin-persistedstate/nuxt',
    '@artmizu/nuxt-prometheus',
    'nuxt-security',
    'dayjs-nuxt',
  ],

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    imports: {
      dirs: [
        './db/**/*',
        './server/services/**/*',
        './server/utils/**/*',
      ],
    },
    // prerender: {
    //   crawlLinks: false,
    //   ignore: ['/hi'],
    //   routes: ['/'],
    // },
    storage: {
      '.data:auth': { base: './.data/auth', driver: 'fs' },
      'redis': {
        driver: 'redis',
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
      },
    },
  },

  quasar: {
    plugins: ['Notify', 'Dialog', 'Loading'],
    sassVariables: 'assets/variables.sass',
  },

  runtimeConfig: {
    auth: {
      name: 'nuxt-session',
      password: '',
      password_salt: '',
    },
    mail: {
      auth: {
        pass: '',
        user: '',
      },
      from: '',
      host: '',
      port: 465,
    },
    public: {
      firebase: {
        apiKey: '',
        appId: '',
        authDomain: '',
        measurementId: '',
        messagingSenderId: '',
        projectId: '',
        storageBucket: '',
      },
      frontend: {
        url: '',
      },
    },
  },

  security: {
    headers: {
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },
})