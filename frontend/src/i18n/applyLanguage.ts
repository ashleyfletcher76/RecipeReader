import i18n, { loadResources } from './index';
import { type SupportedLang } from './supported';

/**
 * Lazy-load JSON for lang, register with i18n and switch language
 *
 */

export const loadAndApplyLanguage = async (lang: SupportedLang) => {
	const mod = await loadResources(lang);
	const dict = mod.default;
	i18n.addResourceBundle(lang, 'translation', dict, true, true);
	await i18n.changeLanguage(lang);
};
