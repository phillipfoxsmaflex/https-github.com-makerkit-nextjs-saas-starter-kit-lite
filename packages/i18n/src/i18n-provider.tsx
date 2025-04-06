'use client';

import { useEffect, useState } from 'react';
import type { InitOptions } from 'i18next';
import { initializeI18nClient } from './i18n.client';

interface Props {
  children: React.ReactNode;
  settings: InitOptions;
}

export function I18nProvider({ children, settings }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    initializeI18nClient(settings).then(() => {
      setIsLoaded(true);
    });
  }, [settings]);

  if (!isLoaded) {
    return null;
  }

  return children;
}