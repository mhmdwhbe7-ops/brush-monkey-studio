import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, Images, ArrowRight, Sparkles, FileText, Check, ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OrbitVariationModalProps {
  project: Project;
  onClose: () => void;
  onInquire: (projectName: string) => void;
  onViewImages?: (project: Project) => void;
}

export const OrbitVariationModal: React.FC<OrbitVariationModalProps> = ({
  project,
  onClose,
  onInquire,
  onViewImages,
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'showcase' | 'details'>('showcase');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

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

  const currentDesc = language === 'AR' && project.fullDescAr ? project.fullDescAr : project.fullDesc;
  const deliverables = language === 'AR' && project.deliverablesAr ? project.deliverablesAr : project.deliverables;

  return (
    <div
      id="orbitVariationModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111322]/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full min-h-screen lg:h-screen lg:min-h-0 bg-[#111322] text-[#F4F3EE] overflow-y-auto lg:overflow-hidden flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Global CSS for font and orbital rotation */}
        <style>{`
          .font-oswald { font-family: 'Oswald', sans-serif; }
          .font-space-mono { font-family: 'Space Mono', monospace; }
          @keyframes orbitRotateSlow {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes orbitRotateReverse {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(-360deg); }
          }
          .orbit-anim-1 {
            animation: orbitRotateSlow 60s linear infinite;
          }
          .orbit-anim-2 {
            animation: orbitRotateReverse 45s linear infinite;
          }
        `}</style>

        {/* Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 w-[85vw] h-[85vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(81, 70, 229, 0.12) 0%, transparent 70%)',
          }}
        />

        {/* Abstract Symbol Integration / Orbit Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] pointer-events-none opacity-40 z-0 hidden md:block">
          <div
            className="absolute top-1/2 left-1/2 w-full h-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(201,197,255,0.18)] orbit-anim-1"
          />
          <div
            className="absolute top-1/2 left-1/2 w-[52%] h-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(81,70,229,0.35)] orbit-anim-2"
          />
        </div>

        {/* Top Control Bar */}
        <header className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-[rgba(244,243,238,0.12)] bg-[#111322]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-space-mono text-xs uppercase tracking-[0.25em] text-[#C7F36B] font-bold px-2.5 py-1 rounded bg-[#C7F36B]/10 border border-[#C7F36B]/30">
              VARIATION 9
            </span>
            <span className="text-xs font-space-mono text-[#C9C5FF]/80 hidden sm:inline-block tracking-wider">
              ORBIT_AI_CASE_ST / 24
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View switcher */}
            <div className="flex items-center bg-[#111322] border border-[rgba(244,243,238,0.2)] rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('showcase')}
                className={`px-3 py-1.5 text-xs font-space-mono uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                  activeTab === 'showcase'
                    ? 'bg-[#5146E5] text-white font-bold'
                    : 'text-[rgba(244,243,238,0.6)] hover:text-white'
                }`}
              >
                {language === 'AR' ? 'عرض التصميم' : 'Design View'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1.5 text-xs font-space-mono uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-[#5146E5] text-white font-bold'
                    : 'text-[rgba(244,243,238,0.6)] hover:text-white'
                }`}
              >
                {language === 'AR' ? 'تفاصيل المشروع' : 'Case Specs'}
              </button>
            </div>

            {/* View Full Gallery */}
            {onViewImages && project.images && project.images.length > 0 && (
              <button
                type="button"
                onClick={() => onViewImages(project)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C7F36B]/40 text-[#C7F36B] hover:bg-[#C7F36B]/10 font-space-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Images size={14} />
                <span>{language === 'AR' ? 'دليل الهوية' : 'Identity System'}</span>
              </button>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 rounded-lg bg-[rgba(244,243,238,0.08)] hover:bg-[#EE9007] hover:text-[#111409] text-[#F4F3EE] border border-[rgba(244,243,238,0.15)] flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        {activeTab === 'showcase' ? (
          /* 3-Column Variation 9 Canvas Layout */
          <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[350px_1fr_350px] w-full min-h-0">
            {/* Left Side Panel */}
            <aside className="p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(244,243,238,0.12)] bg-[#111322]/60 backdrop-blur-xl">
              <div className="top">
                <div className="w-16 h-16 mb-6 sm:mb-8">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#F4F3EE]">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#C9C5FF"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                      opacity="0.8"
                    />
                    <path d="M50 10 A40 40 0 0 1 90 50" stroke="#C7F36B" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M50 90 A40 40 0 0 1 10 50" stroke="#5146E5" strokeWidth="3.5" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="3.5" fill="#F4F3EE" />
                    <circle cx="85" cy="35" r="4.5" fill="#EE9007" />
                  </svg>
                </div>
                <div className="font-space-mono text-xs tracking-[0.3em] text-[#C7F36B] uppercase font-bold">
                  ORBIT_AI_CASE_ST / 24
                </div>
              </div>

              <div className="bottom space-y-6 mt-8 lg:mt-0">
                <div className="meta-group">
                  <span className="font-space-mono text-[0.65rem] text-[rgba(244,243,238,0.5)] uppercase tracking-[0.2em] block mb-1.5">
                    {language === 'AR' ? 'العميل' : 'CLIENT'}
                  </span>
                  <span className="text-xl font-light tracking-wide text-[#F4F3EE]">
                    ORBIT AI LABS
                  </span>
                </div>
                <div className="meta-group">
                  <span className="font-space-mono text-[0.65rem] text-[rgba(244,243,238,0.5)] uppercase tracking-[0.2em] block mb-1.5">
                    {language === 'AR' ? 'القطاع' : 'SECTOR'}
                  </span>
                  <span className="text-xl font-light tracking-wide text-[#F4F3EE]">
                    CORE INTELLIGENCE
                  </span>
                </div>
                <div className="meta-group">
                  <span className="font-space-mono text-[0.65rem] text-[rgba(244,243,238,0.5)] uppercase tracking-[0.2em] block mb-1.5">
                    {language === 'AR' ? 'المشروع' : 'PROJECT'}
                  </span>
                  <span className="text-xl font-light tracking-wide text-[#F4F3EE]">
                    STARTUP STARTER KIT
                  </span>
                </div>
              </div>
            </aside>

            {/* Main Center Content */}
            <main className="flex flex-col justify-center items-center text-center p-8 sm:p-12 lg:p-16 relative z-10 min-h-[360px] lg:min-h-0">
              <h1 className="font-oswald text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.84] m-0 uppercase tracking-[-0.02em] text-[#F4F3EE] select-none font-bold">
                ORBIT AI
              </h1>
              <h1 className="font-oswald text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.84] m-0 uppercase tracking-[-0.02em] text-[#F4F3EE] select-none font-bold">
                LABS
              </h1>

              <div className="mt-8 sm:mt-10 px-6 sm:px-10 py-3.5 sm:py-4 border border-[#C9C5FF] font-space-mono uppercase tracking-[0.4em] sm:tracking-[0.5em] text-xs sm:text-sm text-[#C9C5FF] bg-[#111322]/40 backdrop-blur-xs">
                Intelligence in Motion.
              </div>

              {/* Action shortcuts */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {onViewImages && project.images && project.images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onViewImages(project)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#5146E5] hover:bg-[#6357fc] text-white font-space-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
                  >
                    <Images size={15} />
                    <span>{language === 'AR' ? 'عرض التطبيقات الرقمية ونظام الهوية (3:2)' : 'View Digital Applications System (3:2)'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[rgba(244,243,238,0.08)] hover:bg-[rgba(244,243,238,0.15)] text-[#F4F3EE] font-space-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all border border-[rgba(244,243,238,0.15)] cursor-pointer"
                >
                  <FileText size={15} />
                  <span>{language === 'AR' ? 'المخرجات والمواصفات' : 'Project Deliverables'}</span>
                </button>
              </div>
            </main>

            {/* Right Side Panel */}
            <aside className="p-6 sm:p-10 lg:p-14 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[rgba(244,243,238,0.12)] bg-[#111322]/60 backdrop-blur-xl">
              <div className="top space-y-6">
                {/* Step 01 */}
                <div className="relative py-4 border-b border-[rgba(244,243,238,0.12)]">
                  <span className="font-oswald text-5xl font-bold text-[rgba(244,243,238,0.06)] absolute -left-3 -top-2 select-none">
                    01
                  </span>
                  <div className="font-space-mono text-[0.65rem] text-[rgba(244,243,238,0.5)] uppercase tracking-[0.2em] mb-1">
                    PHASE 01
                  </div>
                  <div className="font-oswald text-2xl font-bold uppercase tracking-[0.1em] text-[#F4F3EE]">
                    {language === 'AR' ? 'الاستراتيجية' : 'STRATEGY'}
                  </div>
                </div>

                {/* Step 02 */}
                <div className="relative py-4 border-b border-[rgba(244,243,238,0.12)]">
                  <span className="font-oswald text-5xl font-bold text-[rgba(244,243,238,0.06)] absolute -left-3 -top-2 select-none">
                    02
                  </span>
                  <div className="font-space-mono text-[0.65rem] text-[rgba(244,243,238,0.5)] uppercase tracking-[0.2em] mb-1">
                    PHASE 02
                  </div>
                  <div className="font-oswald text-2xl font-bold uppercase tracking-[0.1em] text-[#F4F3EE]">
                    {language === 'AR' ? 'الهوية البصرية' : 'IDENTITY'}
                  </div>
                </div>

                {/* Step 03 */}
                <div className="relative py-4 border-b border-[rgba(244,243,238,0.12)]">
                  <span className="font-oswald text-5xl font-bold text-[rgba(244,243,238,0.06)] absolute -left-3 -top-2 select-none">
                    03
                  </span>
                  <div className="font-space-mono text-[0.65rem] text-[rgba(244,243,238,0.5)] uppercase tracking-[0.2em] mb-1">
                    PHASE 03
                  </div>
                  <div className="font-oswald text-2xl font-bold uppercase tracking-[0.1em] text-[#F4F3EE]">
                    {language === 'AR' ? 'الإطلاق' : 'LAUNCH'}
                  </div>
                </div>
              </div>

              <div className="bottom mt-8 lg:mt-0">
                <div
                  onClick={() => {
                    onInquire(project.title);
                    onClose();
                  }}
                  className="bg-[#C7F36B] hover:bg-[#b5e755] text-[#111322] p-5 font-space-mono font-bold text-xs uppercase tracking-[0.1em] leading-snug cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-between group"
                >
                  <div>
                    <div className="text-[0.7rem] opacity-75 font-semibold">OUTCOME</div>
                    SECURED $1.8M SEED ROUND<br />
                    3 WEEKS POST-LAUNCH
                  </div>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Case Specs & Narrative View (Integrated Dark Theme) */
          <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full p-6 sm:p-12 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left 2 Cols: Story & Deliverables */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <span className="font-space-mono text-xs text-[#C7F36B] tracking-widest uppercase block mb-2 font-bold">
                    ABOUT THE PROJECT
                  </span>
                  <h2 className="font-oswald text-4xl sm:text-5xl uppercase font-bold text-[#F4F3EE] tracking-tight mb-4">
                    Orbit AI Labs — 7-Day Sprint
                  </h2>
                  <p className="text-[rgba(244,243,238,0.85)] text-base sm:text-lg leading-relaxed font-normal">
                    {currentDesc}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div>
                  <h3 className="font-space-mono text-xs uppercase tracking-wider text-[#C9C5FF] font-bold mb-4">
                    {language === 'AR' ? 'المخرجات المنفذة' : 'KEY DELIVERABLES'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-lg bg-[rgba(244,243,238,0.05)] border border-[rgba(244,243,238,0.12)] text-xs font-semibold text-[#F4F3EE]"
                      >
                        <Check size={16} className="text-[#C7F36B] shrink-0" strokeWidth={3} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote if available */}
                {project.quote && (
                  <div className="p-5 rounded-xl border border-[rgba(201,197,255,0.25)] bg-[#5146E5]/10">
                    <p className="italic text-sm sm:text-base text-[#F4F3EE] mb-2">
                      "{project.quote.text}"
                    </p>
                    <div className="font-space-mono text-xs text-[#C7F36B] font-bold">
                      — {project.quote.author}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Col: Color Architecture & Gallery */}
              <div className="space-y-6">
                {/* Brand Case Study Gallery (3:2) */}
                {project.images && project.images.length > 0 && (
                  <div className="p-4 rounded-xl border border-[rgba(244,243,238,0.15)] bg-[rgba(244,243,238,0.04)] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C7F36B] animate-pulse" />
                        <span className="font-space-mono text-xs font-bold text-[#C7F36B] uppercase tracking-wider">
                          {language === 'AR' ? 'معرض دراسة الحالة (3:2)' : 'CASE STUDY GALLERY (3:2)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-space-mono text-[rgba(244,243,238,0.6)] font-bold">
                          0{activeGalleryIndex + 1} / 0{project.images.length}
                        </span>
                        {onViewImages && (
                          <button
                            type="button"
                            onClick={() => onViewImages(project)}
                            title={language === 'AR' ? 'تكبير ملء الشاشة' : 'Expand full screen'}
                            className="p-1 rounded bg-[rgba(244,243,238,0.08)] hover:bg-[#5146E5] text-[#F4F3EE] transition-colors cursor-pointer"
                          >
                            <Maximize2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Active Main Slide */}
                    <div
                      className="relative rounded-lg overflow-hidden border border-[rgba(244,243,238,0.2)] bg-[#111409] aspect-[3/2] group cursor-pointer"
                      onClick={() => onViewImages && onViewImages(project)}
                    >
                      <img
                        src={project.images[activeGalleryIndex]?.url}
                        alt={project.images[activeGalleryIndex]?.alt}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />

                      {/* Slide Tag badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#111322]/85 backdrop-blur-xs border border-white/20 font-space-mono text-[9px] font-bold text-[#C7F36B]">
                        {activeGalleryIndex === 0 && (language === 'AR' ? '01 الافتتاحية والهوية' : '01 HERO / INTRO')}
                        {activeGalleryIndex === 1 && (language === 'AR' ? '02 نظام الشعار' : '02 LOGO SYSTEM')}
                        {activeGalleryIndex === 2 && (language === 'AR' ? '03 لغة الهوية' : '03 BRAND SYSTEM')}
                        {activeGalleryIndex === 3 && (language === 'AR' ? '04 التطبيقات الرقمية' : '04 DIGITAL APPS')}
                      </div>

                      {/* Navigation Overlay Arrows */}
                      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : project.images!.length - 1));
                          }}
                          className="w-7 h-7 rounded-full bg-[#111322]/90 hover:bg-[#5146E5] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveGalleryIndex((prev) => (prev < project.images!.length - 1 ? prev + 1 : 0));
                          }}
                          className="w-7 h-7 rounded-full bg-[#111322]/90 hover:bg-[#5146E5] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Active Caption */}
                    <div className="text-[11px] leading-relaxed text-[rgba(244,243,238,0.7)] font-medium line-clamp-2">
                      {language === 'AR' && project.images[activeGalleryIndex]?.captionAr
                        ? project.images[activeGalleryIndex]?.captionAr
                        : project.images[activeGalleryIndex]?.caption}
                    </div>

                    {/* 4 Thumbnails Selector Strip */}
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {project.images.slice(0, 4).map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={`group/thumb relative rounded-md overflow-hidden aspect-[3/2] border transition-all cursor-pointer ${
                            activeGalleryIndex === idx
                              ? 'border-[#C7F36B] ring-2 ring-[#C7F36B]/40 scale-[1.03]'
                              : 'border-[rgba(244,243,238,0.2)] opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-[#111322]/85 text-[8px] font-space-mono text-[#F4F3EE] py-0.5 text-center font-bold">
                            0{idx + 1}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Palette */}
                <div className="p-4 rounded-xl border border-[rgba(244,243,238,0.15)] bg-[rgba(244,243,238,0.04)]">
                  <span className="font-space-mono text-xs font-bold text-[#C9C5FF] uppercase tracking-wider block mb-3">
                    PALETTE SYSTEM
                  </span>
                  <div className="space-y-2">
                    {project.palette.map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center justify-between px-3 py-2 rounded border border-black/30 text-xs font-bold"
                        style={{
                          backgroundColor: c.hex,
                          color: c.isDarkText ? '#111409' : '#F4F3EE',
                        }}
                      >
                        <span>{c.name}</span>
                        <span className="font-mono text-[10px] opacity-80">{c.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquire CTA */}
                <button
                  type="button"
                  onClick={() => {
                    onInquire(project.title);
                    onClose();
                  }}
                  className="w-full py-3.5 px-4 bg-[#C7F36B] hover:bg-[#b5e755] text-[#111322] font-space-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{language === 'AR' ? 'طلب حزمة مماثلة' : 'INQUIRE ABOUT STARTER KIT'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Footer Info */}
        <footer className="relative z-30 px-6 py-3 border-t border-[rgba(244,243,238,0.1)] flex items-center justify-between text-[0.65rem] font-space-mono text-[rgba(244,243,238,0.4)] uppercase tracking-wider bg-[#111322]/90">
          <span>BRUSH MONKEY STUDIO © 2024</span>
          <span>ORBIT AI LABS BRAND SYSTEM — VARIATION 9</span>
          <span className="hidden sm:inline">ESC TO CLOSE</span>
        </footer>
      </div>
    </div>
  );
};
