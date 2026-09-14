import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/images/regenerated_image_1789328810046.png';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const navLinks = [
    { name: 'HOME', en: 'HOME', ar: 'الرئيسية', href: '#home' },
    { name: 'RESOURCES', en: 'PDF & GUIDES', ar: 'أدلة PDF', href: '#resources' },
    { name: 'ABOUT', en: 'ABOUT', ar: 'من نحن', href: '#about' },
    { name: 'SERVICES', en: 'SERVICES', ar: 'خدماتنا', href: '#services' },
    { name: 'WORK', en: 'WORK', ar: 'أعمالنا', href: '#work' },
    { name: 'PROCESS', en: 'PROCESS', ar: 'طريقة عملنا', href: '#process' },
    { name: 'CONTACT', en: 'CONTACT', ar: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full bg-[#EDE1D1]/95 backdrop-blur-md border-b-2 border-[#111409] z-50 transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="nav-logo"
          className="flex items-center gap-2.5 text-[#111409] font-display font-bold text-xl md:text-2xl tracking-tight group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EDE1D1] border-2 border-[#111409] flex items-center justify-center p-0.5 overflow-hidden transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105 shadow-brutal-sm">
            <img
              src={logoImg}
              alt="Brush Monkey Studio Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="flex items-center gap-1.5">
            <span data-en="BRUSH MONKEY" data-ar="بروش مونكي">
              {language === 'AR' ? 'بروش مونكي' : 'BRUSH MONKEY'}
            </span>
            <span
              data-en="STUDIO"
              data-ar="استوديو"
              className="hidden sm:inline-block text-xs font-body font-bold px-2.5 py-0.5 rounded-full bg-[#EE9007] text-[#111409] border border-[#111409]"
            >
              {language === 'AR' ? 'استوديو' : 'STUDIO'}
            </span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  data-en={link.en}
                  data-ar={link.ar}
                  className="font-bold text-sm text-[#111409] hover:text-[#EE9007] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#EE9007] hover:after:w-full after:transition-all"
                >
                  {language === 'AR' ? link.ar : link.en}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA Action & Language Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle Button: Shows "AR" in English, "EN" in Arabic */}
          <button
            onClick={toggleLanguage}
            id="nav-lang-toggle"
            data-lang-toggle="true"
            aria-label="Toggle language between English and Arabic"
            title={language === 'EN' ? 'التحويل إلى العربية' : 'Switch to English'}
            className="bg-[#111409] text-[#EDE1D1] px-3.5 py-2 rounded-full font-bold text-sm border-2 border-[#111409] shadow-brutal-sm hover:bg-[#EE9007] hover:text-[#111409] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center cursor-pointer min-w-[44px]"
          >
            {language === 'EN' ? 'AR' : 'EN'}
          </button>

          <button
            onClick={onOpenContact}
            id="nav-btn-talk"
            data-en="LET'S TALK →"
            data-ar="تحدث معنا →"
            className="bg-[#EE9007] text-[#111409] px-5 py-2.5 rounded-full font-bold text-sm border-2 border-[#111409] shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {language === 'AR' ? 'تحدث معنا →' : "LET'S TALK →"}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            data-lang-toggle="true"
            aria-label="Toggle language"
            className="bg-[#111409] text-[#EDE1D1] px-3 py-1.5 rounded-full font-bold text-xs border-2 border-[#111409] shadow-brutal-sm active:translate-x-0 active:translate-y-0 transition-all cursor-pointer min-w-[36px]"
          >
            {language === 'EN' ? 'AR' : 'EN'}
          </button>
          <button
            onClick={onOpenContact}
            data-en="TALK →"
            data-ar="تحدث →"
            className="bg-[#EE9007] text-[#111409] text-xs font-bold px-3 py-1.5 rounded-full border-2 border-[#111409] shadow-brutal-sm"
          >
            {language === 'AR' ? 'تحدث →' : 'TALK →'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
            className="p-2 border-2 border-[#111409] rounded-xl bg-white shadow-brutal-sm active:translate-x-[1px] active:translate-y-[1px]"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dropdown"
          className="md:hidden bg-[#EDE1D1] border-t-2 border-[#111409] px-6 py-5 shadow-brutal-lg animate-in slide-in-from-top duration-200"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  data-en={link.en}
                  data-ar={link.ar}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-bold text-lg text-[#111409] hover:text-[#EE9007] py-1 border-b border-[#111409]/10"
                >
                  {language === 'AR' ? link.ar : link.en}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-3 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              data-en="START A PROJECT"
              data-ar="ابدأ مشروعك"
              className="w-full bg-[#EE9007] text-[#111409] py-3 rounded-xl font-bold border-2 border-[#111409] shadow-brutal text-center flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              {language === 'AR' ? 'ابدأ مشروعك' : 'START A PROJECT'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
