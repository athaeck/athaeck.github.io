// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    // erlaubt Pages als JSX/TSX
    jsx: true
  },
   app: {
       app: { baseURL: '/' },
  },
 router: {
    options: {
      trailingSlash: true
    }
  },
    nitro: {
    prerender: {
      routes: ['/de/', '/en/']
    }
  },
    i18n: {
        defaultLocale: 'de',
    locales: [
      { code: 'de', name: 'German', file: 'de.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
      strategy: "prefix_and_default", 
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ]
})