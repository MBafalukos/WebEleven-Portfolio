
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
  site: "https://MBafalukos.github.io",
  base: "/WebEleven-Portfolio",
  trailingSlash: "always",
  build: { format: "directory" },

  vite: { plugins: [tailwindcss()] },

  integrations: [
    svelte(),
    i18n({ locales, defaultLocale }),
    sitemap({
      i18n: { locales, defaultLocale },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
});