import { SupportedLang } from "./supported"

export type LanguageContextType = {
	language: SupportedLang;
	isReady: boolean;
	updateLanguage: (lang: SupportedLang | string) => Promise<void>;
};
