// components/AdobeFontLoader.tsx
'use client';

import { useEffect } from 'react';

export default function AdobeFontLoader(): null {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = 'https://use.typekit.net/ucx1aaf.js';
    script.async = true;
    script.onload = (): void => {
      try {
        // @ts-expect-error: Typekit is a global object provided by the Adobe script
        Typekit.load();
      } catch (e) {
        console.error('Typekit load failed', e);
      }
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
