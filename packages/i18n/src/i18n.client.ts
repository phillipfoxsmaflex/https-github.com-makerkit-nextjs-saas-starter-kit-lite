import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { InitOptions } from 'i18next';

const MAX_ITERATIONS = 20;
let iteration = 0;

export async function initializeI18nClient(settings: InitOptions) {
  if (!i18next.isInitialized) {
    await i18next
      .use(initReactI18next)
      .init({
        ...settings,
        lng: settings.lng || 'en',
        fallbackLng: 'en',
        load: 'languageOnly',
        interpolation: {
          escapeValue: false,
        },
      });
  }

  const loadedLanguages = i18next.languages || [];
  const loadedNamespaces = i18next.reportNamespaces?.getUsedNamespaces() || [];

  if (iteration >= MAX_ITERATIONS) {
    return i18next;
  }

  if (loadedLanguages.length === 0 || loadedNamespaces.length === 0) {
    iteration++;
    await new Promise(resolve => setTimeout(resolve, 50));
    return initializeI18nClient(settings);
  }

  return i18next;
}