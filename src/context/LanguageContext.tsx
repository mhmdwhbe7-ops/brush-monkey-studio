import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'EN' | 'AR';

// Global variable remembering the current language state
export let currentLanguage: Language = 'EN';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (en: string, ar: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Core JavaScript translation function that swaps visible text for every
 * element with [data-en] and [data-ar] in the DOM, updates toggle button labels,
 * and maintains container order.
 */
export function applyLanguageToDOM(targetLang: Language) {
  currentLanguage = targetLang;

  if (typeof document !== 'undefined') {
    // Set document-level attributes for CSS font selection and directional text
    document.documentElement.setAttribute('lang', targetLang.toLowerCase());
    document.documentElement.setAttribute('data-lang', targetLang.toLowerCase());
    document.body.setAttribute('data-current-lang', targetLang);

    // Swap text for every translatable element with data-en and data-ar
    const elements = document.querySelectorAll<HTMLElement>('[data-en][data-ar]');
    elements.forEach((el) => {
      const enText = el.getAttribute('data-en');
      const arText = el.getAttribute('data-ar');
      const targetText = targetLang === 'AR' ? arText : enText;

      if (targetText !== null) {
        // If element has no child elements, update textContent directly
        if (el.children.length === 0) {
          el.textContent = targetText;
        } else {
          // If element contains child tags (e.g. icons, inner tags), find and update text node
          let updated = false;
          for (let i = 0; i < el.childNodes.length; i++) {
            const node = el.childNodes[i];
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
              node.textContent = targetText;
              updated = true;
              break;
            }
          }
          // If no direct text node, update first text child
          if (!updated && el.firstChild && el.firstChild.nodeType === Node.TEXT_NODE) {
            el.firstChild.textContent = targetText;
          }
        }
      }
    });

    // Handle input and textarea placeholders
    const inputElements = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      '[data-en-placeholder][data-ar-placeholder]'
    );
    inputElements.forEach((input) => {
      const enPlaceholder = input.getAttribute('data-en-placeholder');
      const arPlaceholder = input.getAttribute('data-ar-placeholder');
      input.placeholder = targetLang === 'AR' ? arPlaceholder || '' : enPlaceholder || '';
    });

    // Update the language toggle button text:
    // "Shows 'AR' when the site is in English, and 'EN' when the site is in Arabic"
    const toggleButtons = document.querySelectorAll<HTMLElement>(
      '[data-lang-toggle], #nav-lang-toggle'
    );
    toggleButtons.forEach((btn) => {
      btn.textContent = targetLang === 'EN' ? 'AR' : 'EN';
    });
  }

  return targetLang;
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<Language>('EN');

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    applyLanguageToDOM(newLang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'EN' ? 'AR' : 'EN';
    setLanguage(nextLang);
  };

  const t = (en: string, ar: string) => {
    return language === 'AR' ? ar : en;
  };

  useEffect(() => {
    // Expose global functions and state on window for direct access
    if (typeof window !== 'undefined') {
      (window as any).currentLanguage = language;
      (window as any).toggleLanguage = toggleLanguage;
      (window as any).setLanguage = setLanguage;
      (window as any).applyLanguageToDOM = applyLanguageToDOM;
    }
  }, [language]);

  // Initial sync on mount
  useEffect(() => {
    applyLanguageToDOM('EN');
  }, []);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
