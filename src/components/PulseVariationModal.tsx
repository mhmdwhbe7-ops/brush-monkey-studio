import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, ArrowRight, Images, Sparkles, ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PulseVariationModalProps {
  project: Project;
  onClose: () => void;
  onInquire: (projectName: string) => void;
  onViewImages?: (project: Project) => void;
}

export const PulseVariationModal: React.FC<PulseVariationModalProps> = ({
  project,
  onClose,
  onInquire,
  onViewImages,
}) => {
  const { language } = useLanguage();
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const deliverables = [
    { en: 'Instagram Feed & Carousel System', ar: 'نظام منشورات وإنفوجرافيك كاروسيل' },
    { en: 'Animated Story & Reel Cover Kits', ar: 'حزمة أغلفة متحركة للستوري والريلز' },
    { en: 'Figma & Master Component Files', ar: 'ملفات مكونات فيغما الرئيسية المفتوحة' },
    { en: 'Typography & Tone Cheat Sheet', ar: 'دليل أسلوب الخطوط والنبرة البصرية' },
  ];

  const colorPalette = [
    { name: 'Coral', hex: '#E86A5B', desc: 'Primary Accent' },
    { name: 'Sage', hex: '#9CAF88', desc: 'Secondary Organic' },
    { name: 'Plum', hex: '#342538', desc: 'Ink Deep Surface' },
    { name: 'Oat', hex: '#F3EBDD', desc: 'Canvas Background' },
    { name: 'Citrus', hex: '#D8C95A', desc: 'Highlight Energy' },
  ];

  return (
    <div
      id="pulseVariationModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#342538]/85 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full min-h-screen lg:h-screen lg:min-h-0 bg-[#F3EBDD] text-[#342538] font-['Geist',sans-serif] overflow-y-auto lg:overflow-hidden flex flex-col justify-between select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navigation Bar */}
        <nav className="h-16 sm:h-20 shrink-0 border-b-[1.5px] border-[#342538] px-5 sm:px-10 flex items-center justify-between bg-[#F3EBDD] z-20">
          <div className="flex items-center gap-3">
            <span className="font-['Geist_Mono',monospace] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#342538]">
              {language === 'AR' ? 'مشروبات بولس // دراسة حالة تجريبية افتراضية' : 'Pulse Drink Co. // Concept Case Study'}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#D8C95A] border-[1.5px] border-[#342538] font-['Geist_Mono',monospace] text-[10px] font-bold uppercase">
              VARIATION 9
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <span className="font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider text-[rgba(52,37,56,0.7)] hidden md:inline">
              2025 Edition
            </span>

            {onViewImages && project.images && project.images.length > 0 && (
              <button
                type="button"
                onClick={() => onViewImages(project)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E86A5B] hover:bg-[#d85848] text-[#F3EBDD] font-['Geist_Mono',monospace] text-xs font-bold uppercase rounded border-[1.5px] border-[#342538] shadow-sm transition-all cursor-pointer"
              >
                <Images size={14} />
                <span className="hidden sm:inline">{language === 'AR' ? 'المعرض' : 'Gallery'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onInquire(project.title);
                onClose();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#342538] hover:bg-[#46324b] text-[#F3EBDD] font-['Geist_Mono',monospace] text-xs font-bold uppercase rounded border-[1.5px] border-[#342538] shadow-sm transition-all cursor-pointer"
            >
              <span>{language === 'AR' ? 'طلب الحزمة' : 'Inquire'}</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 flex items-center justify-center rounded-full border-[1.5px] border-[#342538] bg-[#F3EBDD] hover:bg-[#E86A5B] hover:text-[#F3EBDD] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </nav>

        {/* Main 3-Column Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr_380px] xl:grid-cols-[400px_1fr_400px] overflow-y-auto lg:overflow-hidden bg-[#F3EBDD]">
          {/* Left Column: Project Context & Deliverables */}
          <aside className="p-6 sm:p-10 lg:border-r-[1.5px] border-[#342538] overflow-y-auto space-y-10 bg-[#F3EBDD]">
            {/* Block 1: Context */}
            <div className="space-y-3">
              <span className="font-['Geist_Mono',monospace] text-[11px] uppercase tracking-[0.1em] text-[#E86A5B] font-bold block">
                {language === 'AR' ? 'سياق المشروع' : 'PROJECT CONTEXT'}
              </span>
              <div className="grid gap-5">
                <div>
                  <h4 className="font-['Geist_Mono',monospace] text-[10px] uppercase text-[rgba(52,37,56,0.5)] font-bold mb-1">
                    {language === 'AR' ? 'العميل' : 'CLIENT'}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-[#342538]">
                    {language === 'AR' ? 'مشروبات بولس الحيوية' : 'Pulse Drink Co.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-['Geist_Mono',monospace] text-[10px] uppercase text-[rgba(52,37,56,0.5)] font-bold mb-1">
                    {language === 'AR' ? 'التصنيف' : 'CATEGORY'}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-[#342538]">
                    {language === 'AR' ? 'مشروبات نباتية / قوالب سوشال ميديا' : 'Botanical Beverage'}
                  </p>
                </div>

                <div>
                  <h4 className="font-['Geist_Mono',monospace] text-[10px] uppercase text-[rgba(52,37,56,0.5)] font-bold mb-1">
                    {language === 'AR' ? 'السنة' : 'YEAR'}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-[#342538]">2025</p>
                </div>
              </div>
            </div>

            {/* Block 2: Key Deliverables */}
            <div className="space-y-3">
              <span className="font-['Geist_Mono',monospace] text-[11px] uppercase tracking-[0.1em] text-[#E86A5B] font-bold block">
                {language === 'AR' ? 'المخرجات الأساسية' : 'KEY DELIVERABLES'}
              </span>
              <div className="grid gap-2.5">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-[#342538] px-3.5 py-2.5 rounded-full text-xs font-semibold text-[#342538] flex items-center gap-2 bg-[#F3EBDD]/60 hover:bg-white transition-colors"
                  >
                    <span className="text-[#E86A5B]">✦</span>
                    <span>{language === 'AR' ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 3: Color Architecture */}
            <div className="space-y-3">
              <span className="font-['Geist_Mono',monospace] text-[11px] uppercase tracking-[0.1em] text-[#E86A5B] font-bold block">
                {language === 'AR' ? 'هندسة الألوان' : 'COLOR ARCHITECTURE'}
              </span>
              <div className="grid grid-cols-5 gap-2 pt-1">
                {colorPalette.map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-1.5 group">
                    <div
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-[1.5px] border-[#342538] shadow-xs group-hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} (${color.hex})`}
                    />
                    <span className="font-['Geist_Mono',monospace] text-[9px] uppercase font-bold text-[rgba(52,37,56,0.7)]">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Middle Column: Hero & Story */}
          <main className="p-8 sm:p-14 lg:p-16 flex flex-col items-center justify-center text-center bg-white border-b-[1.5px] lg:border-b-0 border-[#342538]">
            {/* Stat Badge */}
            <div className="inline-block bg-[#D8C95A] border-[1.5px] border-[#342538] px-5 sm:px-7 py-2 sm:py-3 font-['Geist_Mono',monospace] font-bold text-xs sm:text-base text-[#342538] rotate-[-2deg] shadow-sm mb-8 sm:mb-12 hover:rotate-0 transition-transform">
              {language === 'AR' ? '✦ +320% نمو في التفاعل والوصول' : '✦ +320% REACH IMPROVEMENT'}
            </div>

            {/* Giant Heading */}
            <h1 className="font-['Oswald',sans-serif] text-6xl sm:text-8xl xl:text-9xl font-bold uppercase leading-[0.84] text-[#342538] tracking-[-0.02em] mb-8">
              PULSE
              <br />
              DRINK CO.
            </h1>

            {/* Description Text */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-[580px] text-[rgba(52,37,56,0.75)] font-normal text-start mx-auto border-l-2 border-[#E86A5B] pl-4 sm:pl-6 my-2">
              {language === 'AR'
                ? 'احتاجت بولس إلى حضور رقمي يومي متناسق ولافت للأنظار. قمنا ببناء نظام تفاعلي من قوالب الإنفوجرافيك الكاروسيل، إعلانات المنتجات، بطاقات أغلفة الريلز، وأبرز الستوريات المصممة للنشر السريع والمتناسق.'
                : 'Pulse needed an eye-catching, consistent visual rhythm for their daily social presence. We built an editable system of carousel infographics, announcement drops, reel title cards, and story highlights engineered for fast, consistent publishing.'}
            </p>

            {/* Action Buttons inside Hero */}
            <div className="mt-8 flex items-center gap-3 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => {
                  onInquire(project.title);
                  onClose();
                }}
                className="px-6 py-3 bg-[#342538] hover:bg-[#E86A5B] text-[#F3EBDD] font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'AR' ? 'بدء مشروع مماثل' : 'START SIMILAR PROJECT'}</span>
                <ArrowRight size={14} />
              </button>

              {onViewImages && (
                <button
                  type="button"
                  onClick={() => onViewImages(project)}
                  className="px-5 py-3 bg-[#F3EBDD] hover:bg-[#e4dac9] text-[#342538] border-[1.5px] border-[#342538] font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Images size={14} />
                  <span>{language === 'AR' ? 'عرض صور التصميم' : 'VIEW DESIGN ASSETS'}</span>
                </button>
              )}
            </div>
          </main>

          {/* Right Column: Visuals & Production */}
          <aside className="p-6 sm:p-10 lg:border-l-[1.5px] border-[#342538] overflow-y-auto space-y-5 bg-[#F3EBDD]">
            <div className="flex items-center justify-between">
              <span className="font-['Geist_Mono',monospace] text-[11px] uppercase tracking-[0.1em] text-[#E86A5B] font-bold block">
                {language === 'AR' ? 'المرئيات والإنتاج' : 'VISUALS & PRODUCTION'}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-['Geist_Mono',monospace] text-[10px] text-[rgba(52,37,56,0.7)] font-bold">
                  0{activeImgIndex + 1} / 0{project.images?.length || 4}
                </span>
                {onViewImages && (
                  <button
                    type="button"
                    onClick={() => onViewImages(project)}
                    title={language === 'AR' ? 'تكبير ملء الشاشة' : 'Expand full screen'}
                    className="p-1 rounded border border-[#342538] bg-white hover:bg-[#E86A5B] hover:text-[#F3EBDD] text-[#342538] transition-colors cursor-pointer"
                  >
                    <Maximize2 size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Active Featured Case-Study Visual (3:2) */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-3">
                <div
                  onClick={() => onViewImages && onViewImages(project)}
                  className="group relative aspect-[3/2] bg-[#F3EBDD] border-[1.5px] border-[#342538] rounded-xs overflow-hidden shadow-sm cursor-pointer"
                >
                  <img
                    src={project.images[activeImgIndex]?.url}
                    alt={project.images[activeImgIndex]?.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />

                  {/* Slide Label Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#342538]/90 text-[#F3EBDD] font-['Geist_Mono',monospace] text-[9px] font-bold uppercase rounded border border-[#F3EBDD]/30 backdrop-blur-xs">
                    {activeImgIndex === 0 && (language === 'AR' ? '01 — نظام إنفوجرافيك الكاروسيل' : '01 — CAROUSEL SYSTEM')}
                    {activeImgIndex === 1 && (language === 'AR' ? '02 — قوالب الستوري والإعلانات' : '02 — STORY & ANNOUNCEMENTS')}
                    {activeImgIndex === 2 && (language === 'AR' ? '03 — نظام مكونات فيغما' : '03 — FIGMA DESIGN SYSTEM')}
                    {activeImgIndex === 3 && (language === 'AR' ? '04 — حزمة أغلفة الريلز والحركة' : '04 — REELS & MOTION SUITE')}
                  </div>

                  {/* Prev / Next Navigation Arrows */}
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : project.images!.length - 1));
                      }}
                      className="w-7 h-7 rounded-full bg-[#342538]/90 hover:bg-[#E86A5B] text-[#F3EBDD] flex items-center justify-center border border-[#F3EBDD]/40 transition-colors shadow-sm cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) => (prev < project.images!.length - 1 ? prev + 1 : 0));
                      }}
                      className="w-7 h-7 rounded-full bg-[#342538]/90 hover:bg-[#E86A5B] text-[#F3EBDD] flex items-center justify-center border border-[#F3EBDD]/40 transition-colors shadow-sm cursor-pointer"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="text-[11px] leading-relaxed text-[rgba(52,37,56,0.8)] font-medium line-clamp-2 px-1">
                  {language === 'AR' && project.images[activeImgIndex]?.captionAr
                    ? project.images[activeImgIndex]?.captionAr
                    : project.images[activeImgIndex]?.caption}
                </div>

                {/* 4 Thumbnails Selector Strip */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {project.images.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative aspect-[3/2] border rounded-xs overflow-hidden transition-all cursor-pointer ${
                        activeImgIndex === idx
                          ? 'border-[1.5px] border-[#342538] ring-2 ring-[#E86A5B] scale-[1.02]'
                          : 'border-[#342538]/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-[#342538]/90 text-[8px] font-['Geist_Mono',monospace] text-[#F3EBDD] py-0.5 text-center font-bold">
                        0{idx + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Bottom Footer Bar */}
        <footer className="h-16 sm:h-20 shrink-0 border-t-[1.5px] border-[#342538] grid grid-cols-1 md:grid-cols-3 items-center bg-[#F3EBDD] z-20">
          <div className="px-6 sm:px-10 h-full flex items-center font-['Geist_Mono',monospace] text-[11px] font-bold uppercase text-[rgba(52,37,56,0.7)] border-b md:border-b-0 md:border-r-[1.5px] border-[#342538]">
            ARCHIVE — REF 8820
          </div>
          <div className="px-6 sm:px-10 h-full flex items-center justify-center text-center font-['Geist_Mono',monospace] text-[11px] font-bold uppercase text-[#342538] border-b md:border-b-0 md:border-r-[1.5px] border-[#342538]">
            PULSE FUNCTIONAL BOTANICALS: SOCIAL VISUAL SYSTEM
          </div>
          <div className="px-6 sm:px-10 h-full flex items-center justify-end font-['Geist_Mono',monospace] text-[11px] font-bold uppercase text-[rgba(52,37,56,0.7)]">
            NEW YORK / LONDON / 2025
          </div>
        </footer>
      </div>
    </div>
  );
};
