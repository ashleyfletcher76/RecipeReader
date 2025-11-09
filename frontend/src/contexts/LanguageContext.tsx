// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Localization from 'expo-localization';

import { normalize, type SupportedLang } from '../i18n/supported';
import { loadSavedLanguage, saveLanguage } from '../i18n/appStorage';
import { loadAndApplyLanguage } from '../i18n/applyLanguage';

type LanguageContextType = {
  language: SupportedLang;                 // 'en' | 'de'
  isReady: boolean;                        // i18n resources loaded and applied
  updateLanguage: (lang: SupportedLang | string) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  isReady: false,
  updateLanguage: async () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLang>('en');
  const [isReady, setIsReady] = useState(false);

  // Bootstrap: 1) storage → 2) device locale → load+apply → persist if first run
  useEffect(() => {
    (async () => {
      try {
        const saved = await loadSavedLanguage();
        const deviceLang = normalize(Localization.getLocales()?.[0]?.languageCode);
        const initial = saved ?? deviceLang;

        await loadAndApplyLanguage(initial);
        setLanguage(initial);
        setIsReady(true);

        if (!saved) {
          await saveLanguage(initial); // remember the fallback choice
        }
      } catch (err) {
        console.error('Language bootstrap failed:', err);
        // Fail-safe: load English so the app still renders sensibly
        try {
          await loadAndApplyLanguage('en');
        } catch {}
        setLanguage('en');
        setIsReady(true);
      }
    })();
  }, []);

  const updateLanguage = useMemo(
    () => async (next: SupportedLang | string) => {
      const normalized = normalize(next);
      try {
        await saveLanguage(normalized);
        await loadAndApplyLanguage(normalized);
        setLanguage(normalized);
      } catch (err) {
        console.error('Language update failed:', err);
      }
    },
    []
  );

  const value = useMemo(
    () => ({ language, isReady, updateLanguage }),
    [language, isReady, updateLanguage]
  );

  // Avoid flash of untranslated UI until resources are loaded
  if (!isReady) return null;

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
