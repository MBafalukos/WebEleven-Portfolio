import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/WebEleven-Portfolio",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "gr"],
  },

  trailingSlash: "never",
  build: { format: "directory" },

  vite: { plugins: [tailwindcss()] },

  integrations: [svelte(), sitemap()],
});