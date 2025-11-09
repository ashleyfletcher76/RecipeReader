import AsyncStorage from '@react-native-async-storage/async-storage';
import { normalize, type SupportedLang } from './supported';

export const LANGUAGE_STORAGE_KEY = 'appLanguage';

export const loadSavedLanguage = async (): Promise<SupportedLang | null> => {
  const raw = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  return raw ? normalize(raw) : null;
};

export const saveLanguage = async (lang: string | SupportedLang): Promise<void> => {
  const normalized = normalize(lang);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
};
