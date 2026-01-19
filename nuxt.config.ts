// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  // Enable compression for better performance
  nitro: {
    compressPublicAssets: true,
  },

  // Optimize Tailwind CSS
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false,
  },

  app: {
    head: {
      title: 'What is my IP? - IP Address Lookup',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Find your public IP address and location information instantly' },
        { name: 'author', content: 'Mathieu Mafille' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // Preconnect to external API for faster loading
        { rel: 'dns-prefetch', href: 'http://ip-api.com' },
        { rel: 'preconnect', href: 'http://ip-api.com' },
      ],
    },
  }
})