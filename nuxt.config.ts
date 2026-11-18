// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxt/content', '@nuxt/image', '@nuxt/fonts', '@nuxt/eslint'],

  content: {
    // Nothing is written at runtime, so the container can run read-only.
    database: { type: 'sqlite', filename: ':memory:' },
    experimental: { sqliteConnector: 'native' },
  },

  compatibilityDate: '2026-11-18',

  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      // One entry point per locale; i18n adds `/en` only for `nuxt generate`.
      routes: ['/', '/en'],
      ignore: ['/builds/', '/media/', '/mail', '/downloads/'],
    },
  },

  eslint: {
    config: { stylistic: true },
  },

  fonts: {
    families: [{
      name: 'Exo',
      provider: 'npm',
      weights: ['100 900'],
      // The package names its face "Exo Variable"; with `file` the provider takes it as "Exo".
      providerOptions: { npm: { package: '@fontsource-variable/exo', file: 'index.css' } },
    }],
  },

  i18n: {
    baseUrl: 'https://athaeck.de',
    locales: [
      { code: 'de', language: 'de-DE', file: 'de.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    customRoutes: 'config',
    // Keys are route names (file `projekte/[slug].vue` → `projekte-slug`); slugs are shared across languages.
    pages: {
      'projekte': { de: '/projekte', en: '/projects' },
      'projekte-slug': { de: '/projekte/[slug]', en: '/projects/[slug]' },
      'lebenslauf': { de: '/lebenslauf', en: '/cv' },
      'ueber-mich': { de: '/ueber-mich', en: '/about' },
      'impressum': { de: '/impressum', en: '/legal-notice' },
      'datenschutz': { de: '/datenschutz', en: '/privacy' },
    },
  },

  image: {
    provider: 'ipxStatic',
  },
})
