import { LanguageType } from '../types';

export interface LanguageInfo {
  code: LanguageType;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Record<LanguageType, LanguageInfo> = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  fil: { code: 'fil', name: 'Tagalog', nativeName: 'Filipino/Tagalog' },
  ceb: { code: 'ceb', name: 'Cebuano', nativeName: 'Bisaya/Sinugboanon' },
};

export const DEFAULT_LANGUAGE: LanguageType = 'en';
