import { useBaseInfo } from "./composables/index";
const baseInfo = useBaseInfo();

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "shadcn-nuxt",
    "@nuxtjs/sitemap",
  ],
  site: {
    url: baseInfo.site,
    name: baseInfo.title,
  },
  sitemap: {
    urls: [
      {
        loc: baseInfo.site,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 1,
      },
      {
        loc: `${baseInfo.site}/a4`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        loc: `${baseInfo.site}/holiday`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.5,
      },
      {
        loc: `${baseInfo.site}/drink`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.5,
      },
      {
        loc: `${baseInfo.site}/404`,
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.1,
      },
    ],
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/var.css",
    "~/assets/css/main.css",
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  i18n: {
    locales: [
      {
        code: "zh",
        iso: "zh-CN",
        name: "简体中文",
        language: "zh",
        file: "zh.ts",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English(US)",
        language: "en",
        file: "en.ts",
      },
    ],
    defaultLocale: "zh",
    lazy: false,
  },
  app: {
    head: {
      title: baseInfo.title,
      htmlAttrs: {
        lang: "zh-CN",
        class: "dark",
      },
      bodyAttrs: {
        class: "DingTalk",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#594ec6" },
        { name: "title", content: baseInfo.title },
        {
          name: "description",
          content: baseInfo.description,
        },
      ],
    },
  },
});
