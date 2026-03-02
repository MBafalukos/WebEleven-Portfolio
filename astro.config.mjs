
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const defaultLocale = "en";
const locales = {
  en: "en-US",
  gr: "el-GR",
};

export default defineConfig({
  
  trailingSlash: "always",
  build: { format: "directory" },

  vite: { plugins: [tailwindcss()] },

  integrations: [
    svelte(),
    i18n({ locales, defaultLocale }),
    sitemap({
      i18n: { locales, defaultLocale,routing: {
      prefixDefaultLocale: true, // Ensures that your default locale is prefixed aswell
    }},
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
});