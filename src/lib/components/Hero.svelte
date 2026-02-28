<script lang="ts">
  import { t, type Locale } from "$lib/i18n/t";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { ScrollToPlugin } from "gsap/ScrollToPlugin";
  import { ChevronsDown } from "@lucide/svelte";
  import { activeLocale } from "$lib/i18n/store";

  let heroContainer: HTMLElement;
  let heroContent: HTMLElement;
  let svgCircle: SVGCircleElement;
  let iconContainer: HTMLDivElement;

  $effect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroContainer,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(heroContent, {
          scale: 1.3,
          opacity: 0,
          ease: "power2.in",
        });

        // SVG Button Animation - Pausable
        const circleAnim = gsap.fromTo(
          svgCircle,
          { strokeDasharray: "0 100", strokeDashoffset: "0" },
          {
            strokeDasharray: "100 100",
            duration: 2,
            repeat: -1,
            ease: "power1.inOut",
            yoyo: true,
          },
        );

        const iconAnim = gsap.to(iconContainer, {
          y: 3,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });

        // Pause animations when Hero is out of view to save CPU
        ScrollTrigger.create({
          trigger: heroContainer,
          start: "top bottom",
          end: "bottom top",
          onLeave: () => {
            circleAnim.pause();
            iconAnim.pause();
          },
          onEnter: () => {
            circleAnim.play();
            iconAnim.play();
          },
          onEnterBack: () => {
            circleAnim.play();
            iconAnim.play();
          },
          onLeaveBack: () => {
            circleAnim.pause();
            iconAnim.pause();
          },
        });

        ScrollTrigger.refresh();
      }, heroContainer);

      return () => {
        ctx.revert(); // Safely clean up only this component's animations
      };
    }
  });

  function handleExplore(e: MouseEvent) {
    e.preventDefault();
    gsap.to(window, {
      scrollTo: "#about",
      duration: 1.5,
      ease: "power3.inOut",
    });
  }
</script>

<section
  id="top"
  bind:this={heroContainer}
  class="min-h-screen flex items-center justify-center text-white px-6 overflow-hidden"
>
  <div
    bind:this={heroContent}
    class="max-w-4xl text-center space-y-8 will-change-[transform,opacity]"
  >
    <h1 class="text-4xl md:text-8xl font-bold tracking-tight">
      {t($activeLocale, "hero.title")}
    </h1>

    <h2 class="text-lg md:text-2xl text-[#FFFFFA]/70 max-w-2xl mx-auto">
      {t($activeLocale, "hero.subtitle")}
    </h2>

    <div class="pt-8 flex justify-center">
      <button
        onclick={handleExplore}
        class="relative flex flex-col items-center gap-4 group focus:outline-none"
      >
        <span
          class="text-[#FF312E] font-bold tracking-[0.2em] text-sm uppercase transition-all group-hover:tracking-[0.4em]"
        >
          {t($activeLocale, "hero.cta")}
        </span>

        <div class="relative w-16 h-16 flex items-center justify-center">
          <!-- Animated SVG Circle -->
          <svg
            class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 40 40"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="white"
              stroke-width="0.5"
              class="opacity-10"
            />
            <circle
              bind:this={svgCircle}
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="#FF312E"
              stroke-width="1"
              pathLength="100"
              stroke-linecap="round"
            />
          </svg>

          <!-- Inner Icon -->
          <div bind:this={iconContainer}>
            <ChevronsDown
              class="w-6 h-6 text-white group-hover:text-[#FF312E] transition-colors"
            />
          </div>

          <!-- Pulsing Glow -->
          <div
            class="absolute inset-0 bg-[#FF312E]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"
          ></div>
        </div>
      </button>
    </div>
  </div>
</section>
