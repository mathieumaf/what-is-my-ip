// https://nuxt.com/docs/api/configuration/nuxt-config
import { joinURL } from 'ufo'

const appBaseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    baseURL: appBaseURL,
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
        { rel: 'icon', type: 'image/x-icon', href: joinURL(appBaseURL, 'favicon.ico') },
        { rel: 'shortcut icon', type: 'image/x-icon', href: joinURL(appBaseURL, 'favicon.ico') },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: joinURL(appBaseURL, 'favicon-16x16.png') },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: joinURL(appBaseURL, 'favicon-32x32.png') },
        { rel: 'apple-touch-icon', sizes: '180x180', href: joinURL(appBaseURL, 'apple-touch-icon.png') },
        { rel: 'manifest', href: joinURL(appBaseURL, 'site.webmanifest') },
      ],
    },
  }
})
