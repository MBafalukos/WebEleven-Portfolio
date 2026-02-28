import en from "./locales/en.json";
import gr from "./locales/gr.json";

export type Locale = "en" | "gr";

const translations = {
  en,
  gr,
};

export function t(locale: Locale, key: string) {
  const keys = key.split(".");
  let result: any = translations[locale];

  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      return key;
    }
  }

  return result;
}
