// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
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
    '~/assets/css/pages/coming-soon.css'
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
}