// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Add compatibility date as recommended
  compatibilityDate: '2025-06-27',

  devtools: { enabled: true },

  // Development server configuration
  devServer: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  },

  // SSR configuration
  ssr: true,

  modules: ['@pinia/nuxt'],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/global.css',
    '~/assets/css/layout.css',
    '~/assets/css/components/header.css',
    '~/assets/css/components/product-card.css',
    '~/assets/css/components/footer.css',
    '~/assets/css/components/sidebar.css',
    '~/assets/css/components/promotional-spot.css',
    '~/assets/css/pages/home.css',
    '~/assets/css/pages/product-detail.css',
    '~/assets/css/pages/category.css',
    '~/assets/css/pages/search.css',
    '~/assets/css/pages/coming-soon.css',
  ],
  app: {
    head: {
      title: 'Fashion Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A modern fashion store built with Vue 3 and Nuxt',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },
  serverHandlers: [{ route: '/api/data', handler: '~/server/api/data.ts' }],
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    mongodbDbName: process.env.MONGODB_DB_NAME,
    public: {
      // Public config here if needed
    },
  },

  // Nitro configuration for better performance
  nitro: {
    compressPublicAssets: true,
  },

  // Route rules for caching
  routeRules: {
    // Homepage and category pages are cached for 1 hour
    '/': { headers: { 'Cache-Control': 's-maxage=3600' } },
    '/category/**': { headers: { 'Cache-Control': 's-maxage=3600' } },
    // Product pages are cached for 30 minutes
    '/product/**': { headers: { 'Cache-Control': 's-maxage=1800' } },
    // API endpoints are cached for 5 minutes
    '/api/**': { headers: { 'Cache-Control': 's-maxage=300' } },
  },
});
