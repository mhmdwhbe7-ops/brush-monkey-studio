import React from 'react';
import { Mascot } from './Mascot';
import { STUDIO_FACTS } from '../data/portfolioData';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  const { language } = useLanguage();

  return (
    <section
      id="home"
      className="pt-28 md:pt-36 pb-16 md:pb-24 border-b-2 border-[#111409] bg-[#EDE1D1] relative overflow-hidden"
    >
      {/* Subtle Background Pattern Dots in Deep Forest */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#111409 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EE9007] text-[#111409] border-2 border-[#111409] shadow-brutal-sm mb-6 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111409] animate-ping" />
              <span
                data-en="Available for New Projects Q3/Q4"
                data-ar="متاح للمشاريع الإبداعية الجديدة"
              >
                {language === 'AR' ? 'متاح للمشاريع الإبداعية الجديدة' : 'Available for New Projects Q3/Q4'}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              data-en="Brands worth swinging for."
              data-ar="علامات تجارية تستحق أن تتألق بها."
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[1.04] tracking-tight text-[#111409] mb-6"
            >
              {language === 'AR' ? (
                <span>
                  علامات تجارية تستحق أن{' '}
                  <span className="relative inline-block text-[#EE9007] underline decoration-wavy decoration-[#111409]/40 decoration-4">
                    تتألق
                  </span>{' '}
                  بها.
                </span>
              ) : (
                <span>
                  Brands worth{' '}
                  <span className="relative inline-block text-[#EE9007] underline decoration-wavy decoration-[#111409]/40 decoration-4">
                    swinging
                  </span>{' '}
                  for.
                </span>
              )}
            </h1>

            {/* Sub-paragraph */}
            <p
              id="hero-subheadline"
              data-en="Contemporary graphic design studio crafting bold brand identities, bespoke visual systems, and thoughtful 2D illustrations with genuine character."
              data-ar="استوديو تصميم جرافيكي معاصر يبتكر هويات بصرية جريئة، وأنظمة تصميم متكاملة، ورسومًا توضيحية ثنائية الأبعاد تنبض بالحيوية والاحترافية."
              className="text-lg sm:text-xl text-[#111409]/85 font-medium leading-relaxed max-w-xl mb-8"
            >
              {language === 'AR'
                ? 'استوديو تصميم جرافيكي معاصر يبتكر هويات بصرية جريئة، وأنظمة تصميم متكاملة، ورسومًا توضيحية ثنائية الأبعاد تنبض بالحيوية والاحترافية.'
                : 'Contemporary graphic design studio crafting bold brand identities, bespoke visual systems, and thoughtful 2D illustrations with genuine character.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-10 w-full">
              <a
                href="#work"
                onClick={onExploreWork}
                id="hero-btn-work"
                data-en="VIEW OUR WORK"
                data-ar="استكشف أعمالنا"
                className="bg-[#EE9007] text-[#111409] px-7 py-4 rounded-2xl font-bold text-base border-2 border-[#111409] shadow-brutal hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-brutal-lg active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'AR' ? 'استكشف أعمالنا' : 'VIEW OUR WORK'}</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>

              <a
                href="#about"
                id="hero-link-about"
                data-en="ABOUT STUDIO"
                data-ar="عن الاستوديو"
                className="font-bold text-base text-[#111409] underline decoration-2 underline-offset-4 hover:text-[#EE9007] transition-colors py-2 px-3"
              >
                {language === 'AR' ? 'عن الاستوديو' : 'ABOUT STUDIO'}
              </a>

              <button
                onClick={onOpenContact}
                data-en="GET A QUOTE"
                data-ar="اطلب عرض سعر"
                className="bg-[#EDE1D1] text-[#111409] px-5 py-3.5 rounded-2xl font-bold text-sm border-2 border-[#111409] shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal active:translate-x-0 active:translate-y-0 transition-all flex items-center gap-2 ml-auto lg:ml-0 cursor-pointer"
              >
                <Sparkles size={16} className="text-[#EE9007]" />
                <span>{language === 'AR' ? 'اطلب عرض سعر' : 'GET A QUOTE'}</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4 border-t-2 border-dashed border-[#111409]/20">
              {STUDIO_FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-[#EDE1D1] border-2 border-[#111409] rounded-xl p-3 shadow-brutal-sm text-center"
                >
                  <div className="text-xl sm:text-2xl font-display font-bold text-[#111409]">
                    {fact.value}
                  </div>
                  <div
                    data-en={fact.label}
                    data-ar={fact.labelAr}
                    className="text-[11px] sm:text-xs font-semibold text-[#111409]/70 uppercase tracking-tight text-center"
                  >
                    {language === 'AR' ? fact.labelAr : fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Mascot Right */}
          <div className="lg:col-span-5 flex justify-center items-center py-4">
            <Mascot interactiveBubble={true} />
          </div>
        </div>
      </div>

      {/* Marquee Banner Strip */}
      <div className="mt-12 bg-[#111409] border-y-2 border-[#111409] py-3 overflow-hidden select-none">
        <div className="flex gap-8 whitespace-nowrap animate-none font-display font-bold text-sm sm:text-base uppercase tracking-wider text-[#EDE1D1] justify-around">
          <span data-en="⚡ 100% BOLD VISUAL IDENTITY" data-ar="⚡ هوية بصرية جريئة ١٠٠٪">
            {language === 'AR' ? '⚡ هوية بصرية جريئة ١٠٠٪' : '⚡ 100% BOLD VISUAL IDENTITY'}
          </span>
          <span className="text-[#EE9007]">✦</span>
          <span data-en="🎨 CONTEMPORARY BRAND SYSTEMS" data-ar="🎨 أنظمة علامات تجارية معاصرة">
            {language === 'AR' ? '🎨 أنظمة علامات تجارية معاصرة' : '🎨 CONTEMPORARY BRAND SYSTEMS'}
          </span>
          <span className="text-[#EE9007]">✦</span>
          <span data-en="✏️ HAND-CRAFTED 2D VECTORS" data-ar="✏️ رسوم فكتور مرسومة يدوياً">
            {language === 'AR' ? '✏️ رسوم فكتور مرسومة يدوياً' : '✏️ HAND-CRAFTED 2D VECTORS'}
          </span>
          <span className="text-[#EE9007]">✦</span>
          <span data-en="📦 PREMIUM PACKAGING DESIGN" data-ar="📦 تصميم تغليف مميز واستثنائي">
            {language === 'AR' ? '📦 تصميم تغليف مميز واستثنائي' : '📦 PREMIUM PACKAGING DESIGN'}
          </span>
        </div>
      </div>
    </section>
  );
};

