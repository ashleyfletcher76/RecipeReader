export const SUPPORTED_LANGS = ['en', 'de'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const normalize = (langLike?: string | null): SupportedLang => {
  const base = (langLike ?? 'en').split('-')[0].toLocaleLowerCase();
  return base === 'de' ? 'de' : 'en';
};
