<script lang="ts">
  import { t } from "$lib/i18n/t";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { ExternalLink, ChevronLeft, ChevronRight } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { register } from "swiper/element/bundle";
  import { type Locale } from "$lib/i18n/t";
  const { locale = "en" } = $props<{ locale?: Locale }>();

  let projectsSection: HTMLElement;
  let swiperEl: any;

  let projects = $derived([
    {
      id: "01",
      title: t(locale, "projects.projectOne.title"),
      subtitle: t(locale, "projects.projectOne.subtitle"),
      description: t(locale, "projects.projectOne.description"),
      features: t(locale, "projects.projectOne.features"),
      image: "/images/Nasia1.jpg",
      link: "https://nasia-adam.com",
    },
    {
      id: "02",
      title: t(locale, "projects.projectTwo.title"),
      subtitle: t(locale, "projects.projectTwo.subtitle"),
      description: t(locale, "projects.projectTwo.description"),
      features: t(locale, "projects.projectTwo.features"),
      image: "/images/Nasia2.jpg",
      link: "https://dotheworkintensive.com",
    },
    {
      id: "03",
      title: t(locale, "projects.projectThree.title"),
      subtitle: t(locale, "projects.projectThree.subtitle"),
      description: t(locale, "projects.projectThree.description"),
      features: t(locale, "projects.projectThree.features"),
      image: "/images/Ecommerce.jpg",
      link: "https://stolesergasias.gr",
    },
  ]);

  onMount(() => {
    register();

    const swiperParams = {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,

      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      },
      on: {
        init() {
          console.log("Swiper initialized");
        },
      },
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  });

  $effect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      let ctx = gsap.context(() => {
        gsap.from(projectsSection, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: projectsSection,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }, projectsSection);

      return () => ctx.revert();
    }
  });
</script>

<section
  id="projects"
  bind:this={projectsSection}
  class="py-24 bg-[#000103] text-white px-6 overflow-hidden"
>
  <div class="max-w-7xl mx-auto space-y-16">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-4">
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight">
          {t(locale, "projects.title")}
        </h2>
      </div>

      <div class="flex gap-4">
        <button
          onclick={() => swiperEl.swiper.slidePrev()}
          class="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button
          onclick={() => swiperEl.swiper.slideNext()}
          class="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight class="w-6 h-6" />
        </button>
      </div>
    </div>

    <swiper-container bind:this={swiperEl} init="false" class="pb-12">
      {#each projects as project}
        <swiper-slide>
          <div
            class="group bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col"
          >
            <!-- Top Asset -->
            <div class="aspect-[4/3] overflow-hidden relative">
              <div class="absolute top-6 right-6 z-10"></div>
              <img
                src={project.image}
                alt={project.title}
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
              />
            </div>

            <!-- Bottom Info -->
            <div class="p-8 flex flex-col flex-grow space-y-4">
              <div class="space-y-1">
                <h3 class="text-2xl font-bold tracking-tight">
                  {project.title}
                </h3>
                {#if project.subtitle}
                  <p class="text-white/40 text-sm font-medium">
                    {project.subtitle}
                  </p>
                {/if}
              </div>

              {#if project.features && Array.isArray(project.features)}
                <div class="space-y-3 pt-2">
                  <ul class="space-y-2">
                    {#each project.features as feature}
                      <li class="flex items-start gap-2 text-sm text-white/70">
                        <span
                          class="w-1.5 h-1.5 rounded-full bg-[#FF312E] mt-1.5 shrink-0"
                        ></span>
                        <span class="leading-tight">{feature}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}

              <div class="pt-6 border-t border-white/5 mt-auto">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-[#FF312E] font-semibold group/link"
                >
                  {t(locale, "projects.viewProject")}
                  <ExternalLink
                    class="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>
</section>

<style>
  swiper-container {
    width: 100%;
    height: auto;
  }
</style>
