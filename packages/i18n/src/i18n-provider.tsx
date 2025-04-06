'use client';

import type { InitOptions, i18n } from 'i18next';
import { useState, useEffect } from 'react'; // Added import for useState and useEffect

import { initializeI18nClient } from './i18n.client';

let i18nInstance: i18n;

type Resolver = (
  lang: string,
  namespace: string,
) => Promise<Record<string, string>>;

export function I18nProvider({
  settings,
  children,
  resolver,
}: React.PropsWithChildren<{
  settings: InitOptions;
  resolver: Resolver;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for i18next initialization.  Note: this assumes i18next is globally available.  If not, adjust accordingly.
    const i18next = (window as any).i18n; // Access i18next instance from the window object.  Potentially needs adjustment based on your i18n setup.
    if(i18next){
        i18next.on('initialized', () => {
          setIsLoading(false);
        });
    }

  }, []);

  if (isLoading) {
    return null;
  }

  useI18nClient(settings, resolver);

  return children;
}

/**
 * @name useI18nClient
 * @description A hook that initializes the i18n client.
 * @param settings
 * @param resolver
 */
function useI18nClient(settings: InitOptions, resolver: Resolver) {
  if (
    !i18nInstance ||
    i18nInstance.language !== settings.lng ||
    i18nInstance.options.ns?.length !== settings.ns?.length
  ) {
    throw loadI18nInstance(settings, resolver);
  }

  return i18nInstance;
}

async function loadI18nInstance(settings: InitOptions, resolver: Resolver) {
  i18nInstance = await initializeI18nClient(settings, resolver);
}