// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/google-fonts",
      {
        families: { "Noto+Sans+JP": [300, 400, 600] },
      },
    ],
  ],
  css: ["~/assets/css/style.css"],
});
