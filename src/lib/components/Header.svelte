<script lang="ts">
  import { t, type Locale } from "$lib/i18n/t";
  import { Menu, X, Globe, ChevronRight, Plus } from "@lucide/svelte";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";
  import { fade, fly } from "svelte/transition";
  import { activeLocale } from "$lib/i18n/store";

  const { initialLocale = "en" } = $props<{ initialLocale?: Locale }>();

  $effect(() => {
    activeLocale.set(initialLocale);
  });

  let isMobileMenuOpen = $state(false);
  let projectType = $state("");
  let budget = $state([1000]);

  function setLocale(newLocale: string) {
    if (newLocale === $activeLocale) return;
    activeLocale.set(newLocale as Locale);

    // Silently update the URL to match the language
    const currentPath = window.location.pathname;
    const hash = window.location.hash || "";

    let newPath = currentPath;
    if (newLocale === "gr" && currentPath === "/") newPath = "/gr/";
    else if (newLocale === "en" && currentPath === "/gr/") newPath = "/";
    else if (newLocale === "gr" && !currentPath.startsWith("/gr"))
      newPath = "/gr" + currentPath;
    else if (newLocale === "en" && currentPath.startsWith("/gr"))
      newPath = currentPath.replace("/gr", "") || "/";

    window.history.replaceState({}, "", newPath + hash);
  }

  function getHref(path: string) {
    if (path.startsWith("#")) return path;
    const base = $activeLocale === "gr" ? "/gr" : "";
    return (base + path).replace(/\/$/, "") || "/";
  }

  const navLinks = $derived([
    { label: t($activeLocale, "header.about"), href: "#about" },
    { label: t($activeLocale, "header.projects"), href: "#projects" },
    { label: t($activeLocale, "header.contact"), href: "#contact" },
  ]);

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
    document.body.style.overflow = "";
  }
</script>

<header
  class="fixed top-0 bg-[#000103]/70 backdrop-blur-3xl left-0 right-0 z-[100] p-2 border-b border-white/5 transition-all duration-500"
>
  <div class="max-w-7xl mx-auto px-6">
    <nav class="relative flex items-center justify-between">
      <!-- Logo / Brand & Mobile Open Button -->
      <div class="flex items-center justify-between w-full md:w-auto">
        <a
          href={getHref("/")}
          class="text-2xl font-black tracking-tighter text-white z-[110]"
        >
          PORT<span class="text-[#FF312E]">FOLIO</span>
        </a>

        <!-- Mobile Menu Toggle (Open Only) -->
        <button
          onclick={toggleMobileMenu}
          class="md:hidden z-[110] p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu class="w-6 h-6" />
        </button>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            class="px-6 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            {link.label}
          </a>
        {/each}
      </div>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Language Switcher -->
        <div
          class="flex items-center bg-white/5 rounded-xl p-1 border border-white/5"
        >
          <button
            onclick={() => setLocale("en")}
            class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all {$activeLocale ===
            'en'
              ? 'bg-white text-black'
              : 'text-white/40 hover:text-white'}"
          >
            EN
          </button>
          <button
            onclick={() => setLocale("gr")}
            class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all {$activeLocale ===
            'gr'
              ? 'bg-white text-black'
              : 'text-white/40 hover:text-white'}"
          >
            GR
          </button>
        </div>
        <Dialog.Root>
          <form>
            <Dialog.Trigger
              class="inline-flex items-center gap-2 bg-[#FF312E] hover:bg-white hover:text-black text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,49,46,0.2)]"
            >
              {t($activeLocale, "header.cta")}
              <Plus class="w-4 h-4" />
            </Dialog.Trigger>
            <Dialog.Content
              class="sm:max-w-[425px] bg-[#000103]/90 backdrop-blur-3xl border border-white/10 text-white rounded-2xl shadow-2xl"
            >
              <Dialog.Header class="space-y-3">
                <Dialog.Title class="text-2xl font-black"
                  >{t($activeLocale, "header.dialog.title")}</Dialog.Title
                >
                <Dialog.Description class="text-white/60">
                  {t($activeLocale, "header.dialog.description")}
                </Dialog.Description>
              </Dialog.Header>
              <div class="grid gap-6 py-4">
                <div class="grid gap-3">
                  <Label class="text-white/80"
                    >{t($activeLocale, "header.dialog.projectType")}</Label
                  >
                  <Select.Root type="single" bind:value={projectType}>
                    <Select.Trigger
                      class="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors focus:ring-[#FF312E] focus:ring-offset-0"
                    >
                      {projectType
                        ? projectType
                        : t($activeLocale, "header.dialog.selectType")}
                    </Select.Trigger>
                    <Select.Content
                      class="bg-[#000103] border-white/10 text-white"
                    >
                      <Select.Item
                        value={t($activeLocale, "header.dialog.website")}
                        class="hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
                        >{t(
                          $activeLocale,
                          "header.dialog.website",
                        )}</Select.Item
                      >
                      <Select.Item
                        value={t($activeLocale, "header.dialog.ecommerce")}
                        class="hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
                        >{t(
                          $activeLocale,
                          "header.dialog.ecommerce",
                        )}</Select.Item
                      >
                      <Select.Item
                        value={t($activeLocale, "header.dialog.webapp")}
                        class="hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
                        >{t($activeLocale, "header.dialog.webapp")}</Select.Item
                      >
                    </Select.Content>
                  </Select.Root>
                </div>
                <div class="grid gap-3 pt-4">
                  <div class="flex items-center justify-between">
                    <Label class="text-white/80"
                      >{t($activeLocale, "header.dialog.budget")}</Label
                    >
                    <span class="text-sm font-bold text-[#FF312E]"
                      >€{budget[0]}</span
                    >
                  </div>
                  <Slider
                    bind:value={budget}
                    max={10000}
                    step={100}
                    class="py-2"
                  />
                </div>
              </div>
              <Dialog.Footer class="gap-3 sm:gap-0 mt-4">
                <Dialog.Close
                  type="button"
                  class="px-6 py-2.5 rounded-xl font-bold text-sm bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10"
                >
                  {t($activeLocale, "header.dialog.cancel")}
                </Dialog.Close>
                <Button
                  type="submit"
                  class="bg-[#FF312E] hover:bg-white hover:text-black text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,49,46,0.2)]"
                >
                  {t($activeLocale, "header.dialog.submit")}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </form>
        </Dialog.Root>
      </div>
    </nav>
  </div>
</header>

<!-- Mobile Menu Overlay -->
{#if isMobileMenuOpen}
  <div
    transition:fade={{ duration: 300 }}
    class="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[200] md:hidden flex flex-col justify-center p-8"
  >
    <!-- Close Button Inside Overlay -->
    <button
      onclick={toggleMobileMenu}
      class="absolute top-6 right-6 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors z-[210]"
      aria-label="Close menu"
    >
      <X class="w-6 h-6" />
    </button>

    <div class="space-y-12">
      <!-- Mobile Links -->
      <nav class="flex flex-col gap-6">
        {#each navLinks as link, i}
          <a
            href={link.href}
            onclick={closeMobileMenu}
            in:fly={{ y: 20, delay: 100 + i * 100, duration: 500 }}
            class="text-2xl font-bold tracking-tighter text-white hover:text-[#FF312E] transition-colors flex items-center justify-between group"
          >
            {link.label}
            <ChevronRight
              class="w-10 h-10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-[#FF312E]"
            />
          </a>
        {/each}
      </nav>

      <!-- Mobile Actions -->
      <div
        in:fly={{ y: 20, delay: 500, duration: 500 }}
        class="flex flex-col gap-8"
      >
        <div class="flex items-center gap-6">
          <Globe class="w-6 h-6 text-white/20" />
          <div class="flex gap-4">
            <button
              onclick={() => setLocale("en")}
              class="text-lg font-bold {$activeLocale === 'en'
                ? 'text-white'
                : 'text-white/20'}"
            >
              English
            </button>
            <button
              onclick={() => setLocale("gr")}
              class="text-lg font-bold {$activeLocale === 'gr'
                ? 'text-white'
                : 'text-white/20'}"
            >
              Ελληνικά
            </button>
          </div>
        </div>

        <Dialog.Root>
          <form>
            <Dialog.Trigger
              onclick={closeMobileMenu}
              class="bg-[#FF312E] text-white flex items-center justify-center gap-2 p-4 rounded-2xl font-black text-2xl w-full text-center shadow-[0_20px_50px_rgba(255,49,46,0.3)]"
            >
              {t($activeLocale, "header.cta")}
              <Plus class="w-4 h-4" />
            </Dialog.Trigger>
            <Dialog.Content
              class="sm:max-w-[425px] bg-[#000103]/90 backdrop-blur-3xl border border-white/10 text-white rounded-2xl shadow-2xl"
            >
              <Dialog.Header class="space-y-3">
                <Dialog.Title class="text-2xl font-black"
                  >{t($activeLocale, "header.dialog.title")}</Dialog.Title
                >
                <Dialog.Description class="text-white/60">
                  {t($activeLocale, "header.dialog.description")}
                </Dialog.Description>
              </Dialog.Header>
              <div class="grid gap-6 py-4">
                <div class="grid gap-3">
                  <Label class="text-white/80"
                    >{t($activeLocale, "header.dialog.projectType")}</Label
                  >
                  <Select.Root type="single" bind:value={projectType}>
                    <Select.Trigger
                      class="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors focus:ring-[#FF312E] focus:ring-offset-0"
                    >
                      {projectType
                        ? projectType
                        : t($activeLocale, "header.dialog.selectType")}
                    </Select.Trigger>
                    <Select.Content
                      class="bg-[#000103] border-white/10 text-white"
                    >
                      <Select.Item
                        value={t($activeLocale, "header.dialog.website")}
                        class="hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
                        >{t(
                          $activeLocale,
                          "header.dialog.website",
                        )}</Select.Item
                      >
                      <Select.Item
                        value={t($activeLocale, "header.dialog.ecommerce")}
                        class="hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
                        >{t(
                          $activeLocale,
                          "header.dialog.ecommerce",
                        )}</Select.Item
                      >
                      <Select.Item
                        value={t($activeLocale, "header.dialog.webapp")}
                        class="hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
                        >{t($activeLocale, "header.dialog.webapp")}</Select.Item
                      >
                    </Select.Content>
                  </Select.Root>
                </div>
                <div class="grid gap-3 pt-4">
                  <div class="flex items-center justify-between">
                    <Label class="text-white/80"
                      >{t($activeLocale, "header.dialog.budget")}</Label
                    >
                    <span class="text-sm font-bold text-[#FF312E]"
                      >€{budget[0]}</span
                    >
                  </div>
                  <Slider
                    bind:value={budget}
                    max={10000}
                    step={100}
                    class="py-2"
                  />
                </div>
              </div>
              <Dialog.Footer class="gap-3 sm:gap-0 mt-4">
                <Dialog.Close
                  type="button"
                  class="px-6 py-2.5 rounded-xl font-bold text-sm bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 w-full sm:w-auto"
                >
                  {t($activeLocale, "header.dialog.cancel")}
                </Dialog.Close>
                <Button
                  type="submit"
                  class="bg-[#FF312E] hover:bg-white hover:text-black text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,49,46,0.2)] w-full sm:w-auto mt-2 sm:mt-0"
                >
                  {t($activeLocale, "header.dialog.submit")}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </form>
        </Dialog.Root>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    transition: background-color 0.3s ease;
  }
</style>
