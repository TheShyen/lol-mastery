// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@import "@/assets/_variables.sass"`,
        },
      },
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', 'nuxt-quasar-ui', '@pinia/nuxt'],
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  quasar: { },
  css: [
    '@/assets/fonts.css',
  ],
})