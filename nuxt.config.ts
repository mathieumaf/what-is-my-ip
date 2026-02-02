// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15', // Nuxt 4 compatibility date for stable API
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  app: {
    head: {
      title: 'What is my IP',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
})
