// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15', // Nuxt 4 compatibility date for stable API
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    public: {
      siteUrl: 'http://localhost:3000',
    },
  },
  app: {
    head: {
      title: 'What is my IP',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
})
