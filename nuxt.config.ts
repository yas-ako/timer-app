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
    "@vite-pwa/nuxt",
  ],
  css: ["~/assets/css/style.css"],

  // https://zenn.dev/tanukikyo/articles/a8dda0432bd777#%E3%80%8Cnuxt.config.ts%E3%80%8D%E3%81%AE%E8%A8%AD%E5%AE%9A
  app: {
    head: {
      meta: [{ name: "theme-color", content: "#454545" }],
      link: [
        { rel: "icon", href: `/favicon.ico`, sizes: "48x48" },
        { rel: "apple-touch-icon", href: `/apple-touch-icon-180x180.png` },
      ],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Stop Watch",
      short_name: "Stop Watch",
      description: "時間計測用のストップウォッチ",
      lang: "ja",
      theme_color: "#454545",
      background_color: "#ffffff",
      start_url: "/?pwa=true",
      display: "standalone",
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
