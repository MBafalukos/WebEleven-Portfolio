<script lang="ts">
  import { t, type Locale } from "$lib/i18n/t";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import {
    User,
    Mail,
    MessageCircleMore,
    Send,
    CheckCircle2,
  } from "@lucide/svelte";
  import { activeLocale } from "$lib/i18n/store";

  let contactSection: HTMLElement;
  let name = $state("");
  let email = $state("");
  let message = $state("");
  let isSent = $state(false);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log({ name, email, message });
    isSent = true;
    setTimeout(() => {
      isSent = false;
      name = "";
      email = "";
      message = "";
    }, 5000);
  }

  $effect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      let ctx = gsap.context(() => {
        gsap.from(contactSection, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: contactSection,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }, contactSection);

      return () => ctx.revert();
    }
  });
</script>

<section id="contact" bind:this={contactSection} class="py-24 text-white px-6">
  <div class="max-w-7xl mx-auto space-y-16">
    <h2 class="text-4xl md:text-5xl font-bold text-center tracking-tight">
      {t($activeLocale, "form.title")}
    </h2>

    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- Illustration -->
      <div
        class="hidden lg:flex justify-center items-center p-24 relative overflow-hidden"
      >
        <img
          src="/social-contact-svgrepo-com.svg"
          alt="Contact Illustration"
          class="w-full max-w-md relative z-10 drop-shadow-[0_20px_50px_rgba(255,49,46,0.15)] hover:scale-105 transition-transform duration-700"
        />
      </div>

      <!-- Form -->
      <div class="space-y-8">
        <form class="space-y-6" onsubmit={handleSubmit}>
          <div class="space-y-4">
            <label
              for="name"
              class="flex items-center gap-2 text-sm font-medium"
            >
              <User class="w-4 h-4 text-white/60" />
              {t($activeLocale, "form.name")}
            </label>
            <input
              type="text"
              id="name"
              bind:value={name}
              class="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-4 focus:border-[#FF312E] outline-none transition-all focus:ring-1 focus:ring-[#FF312E]/50"
              placeholder={t($activeLocale, "form.name")}
            />
          </div>

          <div class="space-y-4">
            <label
              for="email"
              class="flex items-center gap-2 text-sm font-medium"
            >
              <Mail class="w-4 h-4 text-white/60" />
              {t($activeLocale, "form.email")}
            </label>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              class="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-4 focus:border-[#FF312E] outline-none transition-all focus:ring-1 focus:ring-[#FF312E]/50"
              placeholder={t($activeLocale, "form.email")}
            />
          </div>

          <div class="space-y-4">
            <label
              for="message"
              class="flex items-center gap-2 text-sm font-medium"
            >
              <MessageCircleMore class="w-4 h-4 text-white/60" />
              {t($activeLocale, "form.message")}
            </label>
            <textarea
              id="message"
              bind:value={message}
              rows="4"
              class="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-4 focus:border-[#FF312E] outline-none transition-all focus:ring-1 focus:ring-[#FF312E]/50 resize-none"
              placeholder={t($activeLocale, "form.message")}
            ></textarea>
          </div>

          <div class="flex flex-col gap-3">
            {#if isSent}
              <div
                class="w-full h-16 flex items-center justify-center gap-3 bg-green-500/10 text-green-500 border border-green-500/20 font-bold rounded-xl transition-all duration-300"
              >
                <CheckCircle2 class="w-5 h-5" />
                {t($activeLocale, "form.success")}
              </div>
            {:else}
              <button
                type="submit"
                class="w-full h-16 flex items-center justify-center gap-3 bg-[#FF312E] text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 shadow-[0_20px_40px_rgba(255,49,46,0.2)]"
              >
                <Send class="w-5 h-5" />
                {t($activeLocale, "form.submit")}
              </button>
            {/if}
            <p class="text-xs text-white/40 text-center">
              {t($activeLocale, "form.gdpr")}
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
