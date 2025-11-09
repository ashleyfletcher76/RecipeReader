// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Lazy-load the JSON bundle for a given language.
 * Returns an ES module; you'll use .default to access the JSON object.
 */
export const loadResources = async (lang: string) => {
  switch (lang) {
    case 'en':
      return import('./locales/en.json');
    case 'de':
      return import('./locales/de.json');
    default:
      // Safe fallback if we get an unsupported code
      return import('./locales/en.json');
  }
};

/**
 * Initialize i18next once. We don't preload any resources here—our
 * LanguageProvider decides which language to load and when.
 */
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  // A harmless default; the provider will override right after loading resources.
  lng: 'en',
  fallbackLng: 'en',
  resources: {}, // start empty; bundles are added at runtime
  interpolation: {
    escapeValue: false, // React escapes by default
  },
  react: {
    useSuspense: false, // we'll gate rendering with isReady in the provider
  },
});

export default i18n;
