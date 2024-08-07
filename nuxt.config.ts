import process from 'node:process'
import { appDescription } from './app/constants/index'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { href: '/favicon.ico', rel: 'icon', sizes: 'any' },
        { href: '/logo-symbol-only.svg', rel: 'icon', type: 'image/svg+xml' },
        { href: '/logo-symbol-only.png', rel: 'apple-touch-icon' },
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

  compatibilityDate: '2024-07-03',

  css: [
    '@unocss/reset/tailwind.css',
    'assets/main.sass',
  ],

  dayjs: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
  },

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

  future: {
    compatibilityVersion: 4,
  },

  // googleAdsense: {
  //   id: 'ca-pub-7015724364902511',
  // },

  imports: {
    dirs: [
      './utils/**/*',
      './composables/**/*',
      './stores/**/*',
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
    // '@nuxtjs/google-adsense',
    '@nuxtjs/mdc',
    '@nuxtjs/sitemap',
  ],

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },

    imports: {
      dirs: [
        './server/utils/**/*',
        './server/services/**/*',
        './lib/*',
        './app/utils/**/*',
      ],
    },

    prerender: {
      crawlLinks: true,
      routes: ['sitemap.xml'],
    },

    storage: {
      '.data:auth': { base: './.data/auth', driver: 'fs' },
      'redis': {
        driver: 'redis',
        url: process.env.REDIS_URL,
      },
    },
  },

  quasar: {
    plugins: ['Notify', 'Dialog', 'Loading'],
    sassVariables: './app/assets/variables.sass',
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
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'credentialless',
      crossOriginResourcePolicy: 'cross-origin',
    },
  },

  site: {
    url: 'https://get-jobs.tech',
  },

  sitemap: {
    sources: ['/api/sitemap'],
  },
})
