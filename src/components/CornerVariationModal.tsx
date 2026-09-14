import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, ArrowRight, Images, Sparkles, ChevronLeft, ChevronRight, Maximize2, Coffee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CornerVariationModalProps {
  project: Project;
  onClose: () => void;
  onInquire: (projectName: string) => void;
  onViewImages?: (project: Project) => void;
}

export const CornerVariationModal: React.FC<CornerVariationModalProps> = ({
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
    { en: 'Tactile Menus & Table Collateral', ar: 'قوائم طعام ملموسة وبطاقات الطاولات' },
    { en: 'Silkscreen Cultural Event Posters', ar: 'ملصقات فعاليات وحفلات حية مطبوعة' },
    { en: 'Specialty Coffee Bag Packaging & Labels', ar: 'ملصقات أكياس حبوب القهوة المقصوصة' },
    { en: 'Loyalty Stamp Cards & Takeaway Sleeves', ar: 'بطاقات ولاء بالأختام وأغلفة الأكواب' },
  ];

  const colorPalette = [
    { name: 'Dark Roast', hex: '#241812', desc: 'Espresso Ink' },
    { name: 'Terracotta', hex: '#C86D3B', desc: 'Warm Clay Accent' },
    { name: 'Warm Cream', hex: '#EDE1D1', desc: 'Natural Paper Canvas' },
    { name: 'Kraft Amber', hex: '#D4A373', desc: 'Artisan Paperboard' },
    { name: 'Matcha Sage', hex: '#606C38', desc: 'Botanical Organic' },
  ];

  const images = project.images && project.images.length > 0 ? project.images : [];
  const currentImg = images[activeImgIndex] || images[0];

  const handlePrevImg = () => {
    if (images.length === 0) return;
    setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    if (images.length === 0) return;
    setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      id="cornerVariationModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#241812]/85 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full min-h-screen lg:h-screen lg:min-h-0 bg-[#EDE1D1] text-[#241812] font-['Geist',sans-serif] overflow-y-auto lg:overflow-hidden flex flex-col justify-between select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navigation Bar */}
        <nav className="h-16 sm:h-20 shrink-0 border-b-[1.5px] border-[#241812] px-5 sm:px-10 flex items-center justify-between bg-[#EDE1D1] z-20">
          <div className="flex items-center gap-3">
            <span className="font-['Geist_Mono',monospace] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#241812] flex items-center gap-2">
              <Coffee size={16} className="text-[#C86D3B]" />
              {language === 'AR' ? 'محمصة ذا كورنر // دراسة حالة تجريبية افتراضية' : 'The Corner Roastery // Concept Case Study'}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#C86D3B] text-[#EDE1D1] border-[1.5px] border-[#241812] font-['Geist_Mono',monospace] text-[10px] font-bold uppercase">
              VARIATION 9
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <span className="font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider text-[rgba(36,24,18,0.7)] hidden md:inline">
              2025 Edition
            </span>

            {onViewImages && images.length > 0 && (
              <button
                type="button"
                onClick={() => onViewImages(project)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C86D3B] hover:bg-[#b55c2d] text-[#EDE1D1] font-['Geist_Mono',monospace] text-xs font-bold uppercase rounded border-[1.5px] border-[#241812] shadow-sm transition-all cursor-pointer"
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#241812] hover:bg-[#3d291e] text-[#EDE1D1] font-['Geist_Mono',monospace] text-xs font-bold uppercase rounded border-[1.5px] border-[#241812] shadow-sm transition-all cursor-pointer"
            >
              <span>{language === 'AR' ? 'طلب الحزمة' : 'Inquire'}</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 flex items-center justify-center rounded-full border-[1.5px] border-[#241812] bg-[#EDE1D1] hover:bg-[#C86D3B] hover:text-[#EDE1D1] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </nav>

        {/* Main 3-Column Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr_380px] xl:grid-cols-[400px_1fr_400px] overflow-y-auto lg:overflow-hidden bg-[#EDE1D1]">
          
          {/* Left Column: Project Context & Deliverables */}
          <aside className="p-6 sm:p-10 lg:border-r-[1.5px] border-[#241812] overflow-y-auto space-y-10 bg-[#EDE1D1]">
            {/* Block 1: Context */}
            <div className="space-y-3">
              <span className="font-['Geist_Mono',monospace] text-[11px] uppercase tracking-[0.1em] text-[#C86D3B] font-bold block">
                {language === 'AR' ? 'سياق المشروع' : 'PROJECT CONTEXT'}
              </span>
              <div className="grid gap-5">
                <div>
                  <h4 className="font-['Geist_Mono',monospace] text-[10px] uppercase text-[rgba(36,24,18,0.55)] font-bold mb-1">
                    {language === 'AR' ? 'العميل' : 'CLIENT'}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-[#241812]">
                    {language === 'AR' ? 'محمصة ذا كورنر الحرفية' : 'The Corner Artisan Roasters'}
                  </p>
                </div>

                <div>
                  <h4 className="font-['Geist_Mono',monospace] text-[10px] uppercase text-[rgba(36,24,18,0.55)] font-bold mb-1">
                    {language === 'AR' ? 'التصنيف' : 'CATEGORY'}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-[#241812]">
                    {language === 'AR' ? 'مطبوعات مقاهي / هوية ورق كرافت' : 'Artisan Coffee Print Design'}
                  </p>
                </div>

                <div>
                  <h4 className="font-['Geist_Mono',monospace] text-[10px] uppercase text-[rgba(36,24,18,0.55)] font-bold mb-1">
                    {language === 'AR' ? 'السنة' : 'YEAR'}
                  </h4>
                  <p className="text-sm sm:text-base font-semibold text-[#241812]">2025</p>
                </div>
              </div>
            </div>

            {/* Block 2: Key Deliverables */}
            <div className="space-y-3">
              <span className="font-['Geist_Mono',monospace] text-[11px] uppercase tracking-[0.1em] text-[#C86D3B] font-bold block">
                {language === 'AR' ? 'المخرجات الأساسية' : 'KEY DELIVERABLES'}
              </span>
              <div className="grid gap-2.5">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-[#241812] px-3.5 py-2.5 rounded-full text-xs font-semibold text-[#241812] flex items-center gap-2 bg-[#EDE1D1]/60 hover:bg-white transition-colors"
                  >
                    <span className="text-[#C86D3B]">✦</span>
                    <span>{language === 'AR' ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 3: Color Architecture */}
            <div className="space-y-3">
              <span className="font-['Geist_Mono',monospace] text-[11px] uppercase tracking-[0.1em] text-[#C86D3B] font-bold block">
                {language === 'AR' ? 'هندسة الألوان' : 'COLOR ARCHITECTURE'}
              </span>
              <div className="grid grid-cols-5 gap-2 pt-1">
                {colorPalette.map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-1.5 group">
                    <div
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-[1.5px] border-[#241812] shadow-xs group-hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} (${color.hex})`}
                    />
                    <span className="font-['Geist_Mono',monospace] text-[9px] uppercase font-bold text-[rgba(36,24,18,0.7)] text-center leading-tight">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Middle Column: Hero & Story */}
          <main className="p-8 sm:p-14 lg:p-16 flex flex-col items-center justify-center text-center bg-white border-b-[1.5px] lg:border-b-0 border-[#241812]">
            {/* Stat Badge */}
            <div className="inline-block bg-[#C86D3B] text-[#EDE1D1] border-[1.5px] border-[#241812] px-5 sm:px-7 py-2 sm:py-3 font-['Geist_Mono',monospace] font-bold text-xs sm:text-base rotate-[-2deg] shadow-sm mb-8 sm:mb-12 hover:rotate-0 transition-transform">
              {language === 'AR' ? '✦ +85% زيادة حضور الفعاليات بالمطبوعات' : '✦ +85% LOCAL EVENT ATTENDANCE'}
            </div>

            {/* Giant Heading */}
            <h1 className="font-['Oswald',sans-serif] text-6xl sm:text-8xl xl:text-9xl font-bold uppercase leading-[0.84] text-[#241812] tracking-[-0.02em] mb-8">
              THE CORNER
              <br />
              ROASTERY
            </h1>

            {/* Description Text */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-[580px] text-[rgba(36,24,18,0.8)] font-normal text-start mx-auto border-l-2 border-[#C86D3B] pl-4 sm:pl-6 my-2">
              {language === 'AR'
                ? 'ساعدنا محمصة قهوة مختصة محلية على لفت انتباه رواد الحي عبر تصاميم مطبوعة ملموسة وعالية الجاذبية. من قوائم المشروبات المطبوعة على ورق الكرافت الفاخر، وبطاقات الولاء بالأختام، إلى ملصقات الفعاليات الموسمية التي احتفظ بها الزبائن وعلقوها في منازلهم.'
                : 'We helped a local specialty coffee roastery command their neighborhood space through tactile print design. From heavy kraft paper drink menus and stamp loyalty cards to seasonal gig posters, we turned physical print into their highest-converting asset.'}
            </p>

            {/* Action Buttons inside Hero */}
            <div className="mt-8 flex items-center gap-3 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => {
                  onInquire(project.title);
                  onClose();
                }}
                className="px-6 py-3 bg-[#241812] hover:bg-[#C86D3B] text-[#EDE1D1] font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'AR' ? 'بدء مشروع مماثل' : 'START SIMILAR PROJECT'}</span>
                <ArrowRight size={14} />
              </button>

              {onViewImages && images.length > 0 && (
                <button
                  type="button"
                  onClick={() => onViewImages(project)}
                  className="px-5 py-3 bg-[#EDE1D1] hover:bg-[#e2d5c2] text-[#241812] border-[1.5px] border-[#241812] font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Images size={14} />
                  <span>{language === 'AR' ? 'عرض صور التصميم' : 'VIEW DESIGN ASSETS'}</span>
                </button>
              )}
            </div>
          </main>

          {/* Right Column: Visuals & Production */}
          <aside className="p-6 sm:p-10 lg:border-l-[1.5px] border-[#241812] overflow-y-auto space-y-5 bg-[#EDE1D1]">
            <div className="flex items-center justify-between">
              <span className="font-['Geist_Mono',monospace] text-[11px] uppercase tracking-[0.1em] text-[#C86D3B] font-bold block">
                {language === 'AR' ? 'المرئيات والإنتاج' : 'VISUALS & PRODUCTION'}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-['Geist_Mono',monospace] text-[10px] text-[rgba(36,24,18,0.7)] font-bold">
                  0{activeImgIndex + 1} / 0{images.length || 4}
                </span>
                {onViewImages && (
                  <button
                    type="button"
                    onClick={() => onViewImages(project)}
                    title={language === 'AR' ? 'تكبير ملء الشاشة' : 'Expand full screen'}
                    className="p-1 rounded border border-[#241812] bg-white hover:bg-[#C86D3B] hover:text-[#EDE1D1] text-[#241812] transition-colors cursor-pointer"
                  >
                    <Maximize2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Featured Image Viewer */}
            {currentImg && (
              <div className="border-[1.5px] border-[#241812] rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="relative aspect-[3/2] bg-[#EDE1D1] overflow-hidden group">
                  <img
                    src={currentImg.url}
                    alt={currentImg.alt || 'The Corner Roastery Print Artwork'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImg();
                        }}
                        className="pointer-events-auto p-1.5 rounded-full bg-[#EDE1D1]/90 text-[#241812] border border-[#241812] hover:bg-[#C86D3B] hover:text-[#EDE1D1] transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImg();
                        }}
                        className="pointer-events-auto p-1.5 rounded-full bg-[#EDE1D1]/90 text-[#241812] border border-[#241812] hover:bg-[#C86D3B] hover:text-[#EDE1D1] transition-colors cursor-pointer"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-white border-t border-[#241812]/20">
                  <p className="font-['Geist_Mono',monospace] text-xs text-[#241812] font-medium leading-snug">
                    {language === 'AR' && currentImg.captionAr ? currentImg.captionAr : currentImg.caption}
                  </p>
                </div>
              </div>
            )}

            {/* Thumbnails grid */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIndex(idx)}
                  className={`aspect-[3/2] rounded overflow-hidden border-[1.5px] transition-all cursor-pointer ${
                    activeImgIndex === idx
                      ? 'border-[#C86D3B] ring-2 ring-[#C86D3B]/40 scale-105 shadow-sm'
                      : 'border-[#241812]/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt || `Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Production Quote Callout */}
            <div className="border-[1.5px] border-[#241812] p-4 rounded-lg bg-white/70 mt-6">
              <span className="font-['Geist_Mono',monospace] text-[10px] text-[#C86D3B] font-bold uppercase block mb-1">
                {language === 'AR' ? 'أثر الطباعة والمخرجات' : 'PRINT IMPACT'}
              </span>
              <p className="text-xs italic text-[rgba(36,24,18,0.85)] font-medium leading-relaxed">
                {language === 'AR'
                  ? '«الزبائن يطلبون شراء بوستراتنا المعلقة على الجدران! المطبوعات منحتنا حضوراً محلياً استثنائياً.»'
                  : '"Our local customers literally ask to buy our posters off the wall. Print gives us an unbeatable neighborhood identity."'}
              </p>
              <span className="font-['Geist_Mono',monospace] text-[10px] font-bold text-[#241812] block mt-2">
                — {language === 'AR' ? 'خالد وليلى، المؤسسان' : 'Khalid & Layla, Founders'}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
