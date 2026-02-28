<script lang="ts">
  import { t, type Locale } from "$lib/i18n/t";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Github, Linkedin, User, File } from "@lucide/svelte";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { activeLocale } from "$lib/i18n/store";

  let aboutSection: HTMLElement;

  $effect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      let ctx = gsap.context(() => {
        gsap.from(aboutSection, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: aboutSection,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }, aboutSection);

      return () => ctx.revert();
    }
  });
</script>

<section id="about" bind:this={aboutSection} class="py-34 text-[#FFFFFA] px-6">
  <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div class="space-y-6">
      <h2 class="text-3xl md:text-4xl font-semibold flex items-center gap-3">
        <User class="w-8 h-8 text-[#FF312E]" />
        {t($activeLocale, "about.title")}
      </h2>

      <p class="text-white/70 leading-relaxed">
        {t($activeLocale, "about.description1")}
      </p>

      <p class="text-white/60">
        {t($activeLocale, "about.description2")}
      </p>
      <div class="flex gap-2">
        <a href="https://github.com/MBafalukos" class="flex items-center gap-2"
          ><Badge>Github<Github /></Badge></a
        >
        <a
          href="https://www.linkedin.com/in/mbafalukos/"
          class="flex items-center gap-2"><Badge>LinkedIn<Linkedin /></Badge></a
        >
      </div>
    </div>

    <div class=" h-80 flex items-center justify-center overflow-hidden">
      <Avatar.Root class="w-72 h-72">
        <Avatar.Image
          src="./images/avatar.webp"
          class="w-full h-full object-contain"
          alt="Michalis Bafalukos"
          loading="lazy"
          decoding="async"
        />
        <Avatar.Fallback>MB</Avatar.Fallback>
      </Avatar.Root>
    </div>
  </div>
</section>
