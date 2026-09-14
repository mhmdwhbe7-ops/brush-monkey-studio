import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/images/regenerated_image_1789328810046.png';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111409] text-[#EDE1D1] py-12 px-5 sm:px-8 border-t-2 border-[#111409]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EDE1D1] flex items-center justify-center p-0.5 overflow-hidden shadow-brutal-sm">
            <img
              src={logoImg}
              alt="Brush Monkey Studio Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div
              data-en="BRUSH MONKEY STUDIO"
              data-ar="استوديو بروش مونكي"
              className="font-display font-bold text-xl tracking-tight text-[#EDE1D1]"
            >
              {language === 'AR' ? 'استوديو بروش مونكي' : 'BRUSH MONKEY STUDIO'}
            </div>
            <div
              data-en="Playful graphic design & visual systems"
              data-ar="تصميم جرافيكي مرح وهويات بصرية حيوية"
              className="text-xs text-[#EDE1D1]/70 font-medium"
            >
              {language === 'AR'
                ? 'تصميم جرافيكي مرح وهويات بصرية حيوية'
                : 'Playful graphic design & visual systems'}
            </div>
          </div>
        </div>

        {/* Links */}
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold">
          <li>
            <a
              href="#home"
              data-en="HOME"
              data-ar="الرئيسية"
              className="hover:text-[#EE9007] transition-colors"
            >
              {language === 'AR' ? 'الرئيسية' : 'HOME'}
            </a>
          </li>
          <li>
            <a
              href="#resources"
              data-en="PDF & GUIDES"
              data-ar="أدلة PDF"
              className="hover:text-[#EE9007] transition-colors"
            >
              {language === 'AR' ? 'أدلة PDF' : 'PDF & GUIDES'}
            </a>
          </li>
          <li>
            <a
              href="#work"
              data-en="WORK"
              data-ar="الأعمال"
              className="hover:text-[#EE9007] transition-colors"
            >
              {language === 'AR' ? 'الأعمال' : 'WORK'}
            </a>
          </li>
          <li>
            <a
              href="#about"
              data-en="ABOUT"
              data-ar="من نحن"
              className="hover:text-[#EE9007] transition-colors"
            >
              {language === 'AR' ? 'من نحن' : 'ABOUT'}
            </a>
          </li>
          <li>
            <a
              href="#services"
              data-en="SERVICES"
              data-ar="الخدمات"
              className="hover:text-[#EE9007] transition-colors"
            >
              {language === 'AR' ? 'الخدمات' : 'SERVICES'}
            </a>
          </li>
          <li>
            <a
              href="#process"
              data-en="PROCESS"
              data-ar="خطوات العمل"
              className="hover:text-[#EE9007] transition-colors"
            >
              {language === 'AR' ? 'خطوات العمل' : 'PROCESS'}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              data-en="CONTACT"
              data-ar="تواصل معنا"
              className="hover:text-[#EE9007] transition-colors"
            >
              {language === 'AR' ? 'تواصل معنا' : 'CONTACT'}
            </a>
          </li>
        </ul>

        {/* Back to top & Copyright */}
        <div className="flex items-center gap-4">
          <span
            data-en="© 2026 Brush Monkey Studio. All rights reserved."
            data-ar="© 2026 استوديو بروش مونكي. جميع الحقوق محفوظة."
            className="text-xs text-[#EDE1D1]/70"
          >
            {language === 'AR'
              ? '© 2026 استوديو بروش مونكي. جميع الحقوق محفوظة.'
              : '© 2026 Brush Monkey Studio. All rights reserved.'}
          </span>
          <button
            onClick={scrollToTop}
            aria-label={language === 'AR' ? 'العودة للأعلى' : 'Back to top'}
            className="w-9 h-9 rounded-full bg-[#EE9007] text-[#111409] flex items-center justify-center font-bold border border-[#EE9007] hover:bg-[#EDE1D1] hover:border-[#111409] transition-colors cursor-pointer shadow-brutal-sm"
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </footer>
  );
};
