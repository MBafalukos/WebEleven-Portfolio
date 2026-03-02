<script lang="ts">
  import { t, type Locale } from "$lib/i18n/t";

  const { locale = "en", year = new Date().getFullYear() } = $props<{
    locale?: Locale;
    year?: number;
  }>();
</script>

<footer
  class="bg-neutral-950 border-t border-white/10 py-8 text-center text-white/60 text-sm"
>
  <div class="max-w-6xl mx-auto px-6">
    © {year} Michalis Bafalukos. {t(locale, "footer.rights")}
  </div>
</footer>
