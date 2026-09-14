import React, { useState, useEffect } from 'react';
import { ResourceItem } from './ResourcesSection';
import {
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  CheckSquare,
  Square,
  Check,
  Globe,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { generateRealPdf } from '../utils/generatePdfs';

interface PdfReaderModalProps {
  item: ResourceItem | null;
  onClose: () => void;
  initialLang?: 'AR' | 'EN';
}

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({ item, onClose, initialLang }) => {
  const { language } = useLanguage();
  const [readerLang, setReaderLang] = useState<'AR' | 'EN'>(initialLang || (language === 'AR' ? 'AR' : 'EN'));
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [downloadingLang, setDownloadingLang] = useState<'AR' | 'EN' | null>(null);
  const [downloadSuccessLang, setDownloadSuccessLang] = useState<'AR' | 'EN' | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        if (readerLang === 'AR') {
          setCurrentPage((p) => Math.max(1, p - 1));
        } else {
          setCurrentPage((p) => Math.min(maxPages, p + 1));
        }
      }
      if (e.key === 'ArrowLeft') {
        if (readerLang === 'AR') {
          setCurrentPage((p) => Math.min(maxPages, p + 1));
        } else {
          setCurrentPage((p) => Math.max(1, p - 1));
        }
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, currentPage, readerLang]);

  if (!item) return null;

  const maxPages = item.id === 'social-media-kit-figma' ? 3 : 4;

  const getPageLabel = (pNum: number): string => {
    if (item.id === 'startup-brand-guide-pdf') {
      if (readerLang === 'AR') {
        return pNum === 1 ? 'الغلاف' : pNum === 2 ? 'هوامش الشعار' : pNum === 3 ? 'الألوان والخطوط' : 'قائمة الفحص';
      }
      return pNum === 1 ? 'Cover' : pNum === 2 ? 'Logo Specs' : pNum === 3 ? 'Colors & Type' : 'Launch Audit';
    }
    if (item.id === 'social-media-kit-figma') {
      if (readerLang === 'AR') {
        return pNum === 1 ? 'الغلاف والمواصفات' : pNum === 2 ? 'الشرائح السبع' : 'أبعاد المكونات';
      }
      return pNum === 1 ? 'Cover & Specs' : pNum === 2 ? '7-Slide Method' : 'Auto-Layout';
    }
    if (item.id === 'print-ready-spec-pdf') {
      if (readerLang === 'AR') {
        return pNum === 1 ? 'الغلاف والإنتاج' : pNum === 2 ? 'التسييل والقص' : pNum === 3 ? 'الأسود والورق' : 'الورنيش والفويل';
      }
      return pNum === 1 ? 'Cover & Print' : pNum === 2 ? 'Bleed & Trim' : pNum === 3 ? 'Rich Black & GSM' : 'Spot UV & Foil';
    }
    return readerLang === 'AR' ? `صفحة ${pNum}` : `Page ${pNum}`;
  };

  const handleToggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownloadPdf = async (targetLang: 'AR' | 'EN') => {
    setDownloadingLang(targetLang);
    try {
      await generateRealPdf(item.id, targetLang);
      setDownloadSuccessLang(targetLang);
      setTimeout(() => setDownloadSuccessLang(null), 3000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setDownloadingLang(null);
    }
  };

  const isRtl = readerLang === 'AR';

  return (
    <div
      id="pdfReaderModalOverlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111409]/85 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] max-h-[950px] bg-[#202517] text-[#EDE1D1] rounded-2xl border-3 border-[#111409] shadow-2xl flex flex-col overflow-hidden select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top App Bar (Reader Controls) */}
        <header className="h-14 sm:h-16 shrink-0 bg-[#171B10] border-b-2 border-[#111409] px-4 sm:px-6 flex items-center justify-between gap-2 z-20">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-10 h-10 rounded-lg border-2 border-[#EE9007] flex items-center justify-center shrink-0 shadow-xs ${item.emojiBg || 'bg-[#EE9007]'} text-xl select-none`}>
              {item.emoji}
            </div>
            <div className="truncate">
              <h3 className="font-['Syne',sans-serif] text-sm sm:text-base font-bold text-[#EDE1D1] truncate">
                {readerLang === 'AR' ? item.titleAr : item.titleEn}
              </h3>
              <p className="font-['Geist_Mono',monospace] text-[10px] sm:text-xs text-[#EDE1D1]/60 truncate">
                {item.id.toUpperCase()} • {readerLang === 'AR' ? item.formatAr : item.formatEn} • {item.fileSize}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#252B1B] rounded-lg border border-[#EDE1D1]/20 p-0.5">
              <button
                type="button"
                onClick={() => setReaderLang('AR')}
                className={`px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                  readerLang === 'AR'
                    ? 'bg-[#EE9007] text-[#111409] shadow-xs'
                    : 'text-[#EDE1D1]/70 hover:text-[#EDE1D1]'
                }`}
              >
                <span>🇸🇦</span>
                <span>عربي</span>
              </button>
              <button
                type="button"
                onClick={() => setReaderLang('EN')}
                className={`px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                  readerLang === 'EN'
                    ? 'bg-[#EE9007] text-[#111409] shadow-xs'
                    : 'text-[#EDE1D1]/70 hover:text-[#EDE1D1]'
                }`}
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Page Navigation Controls */}
            <div className="flex items-center bg-[#252B1B] rounded-lg border border-[#EDE1D1]/20 px-1 py-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded text-[#EDE1D1] hover:bg-[#EE9007] hover:text-[#111409] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title={readerLang === 'AR' ? 'الصفحة السابقة' : 'Previous page'}
              >
                <ChevronLeft size={16} />
              </button>

              <span className="font-['Geist_Mono',monospace] text-xs font-bold px-2 text-[#EDE1D1]">
                {currentPage} / {maxPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(maxPages, p + 1))}
                disabled={currentPage === maxPages}
                className="p-1 rounded text-[#EDE1D1] hover:bg-[#EE9007] hover:text-[#111409] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title={readerLang === 'AR' ? 'الصفحة التالية' : 'Next page'}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden lg:flex items-center bg-[#252B1B] rounded-lg border border-[#EDE1D1]/20 px-1 py-1">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1 rounded text-[#EDE1D1] hover:bg-[#EE9007] hover:text-[#111409] transition-colors cursor-pointer"
                title="Zoom out"
              >
                <ZoomOut size={15} />
              </button>
              <span className="font-['Geist_Mono',monospace] text-[11px] font-bold px-1.5 text-[#EDE1D1]/80">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="p-1 rounded text-[#EDE1D1] hover:bg-[#EE9007] hover:text-[#111409] transition-colors cursor-pointer"
                title="Zoom in"
              >
                <ZoomIn size={15} />
              </button>
            </div>

            {/* Download Twin Action */}
            <div className="flex items-center gap-1">
              {/* Primary Download for Current Edition */}
              <button
                type="button"
                onClick={() => handleDownloadPdf(readerLang)}
                disabled={downloadingLang !== null}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-[#EE9007] hover:bg-[#d98104] text-[#111409] font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
                title={readerLang === 'AR' ? 'تحميل النسخة العربية' : 'Download English Edition'}
              >
                {downloadingLang === readerLang ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span className="hidden sm:inline">{readerLang === 'AR' ? 'جاري التجهيز...' : 'Creating...'}</span>
                  </>
                ) : downloadSuccessLang === readerLang ? (
                  <>
                    <Check size={15} strokeWidth={3} />
                    <span className="hidden sm:inline">{readerLang === 'AR' ? 'تم الحفظ!' : 'Saved!'}</span>
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    <span>{readerLang === 'AR' ? 'تحميل PDF (عربي)' : 'Download PDF (EN)'}</span>
                  </>
                )}
              </button>

              {/* Alternate Language Download Pill */}
              <button
                type="button"
                onClick={() => handleDownloadPdf(readerLang === 'AR' ? 'EN' : 'AR')}
                disabled={downloadingLang !== null}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 sm:py-2 rounded-lg bg-[#252B1B] hover:bg-[#EE9007] hover:text-[#111409] text-[#EDE1D1] border border-[#EDE1D1]/20 font-['Geist_Mono',monospace] text-xs font-bold uppercase transition-all cursor-pointer disabled:opacity-50"
                title={readerLang === 'AR' ? 'Download English PDF' : 'تحميل النسخة العربية PDF'}
              >
                {downloadingLang === (readerLang === 'AR' ? 'EN' : 'AR') ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Download size={13} />
                )}
                <span>{readerLang === 'AR' ? 'PDF (EN)' : 'PDF (عربي)'}</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#EDE1D1]/30 flex items-center justify-center text-[#EDE1D1] hover:bg-[#EE9007] hover:text-[#111409] transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>
        </header>

        {/* Reader Workspace */}
        <div className="flex-1 flex overflow-hidden bg-[#2c3321]">
          {/* Left Thumbnail Drawer */}
          <aside className="w-20 sm:w-28 shrink-0 bg-[#1c2214] border-r border-[#111409] p-2 sm:p-3 overflow-y-auto space-y-3 hidden sm:block">
            <span className="font-['Geist_Mono',monospace] text-[9px] uppercase font-bold text-[#EDE1D1]/60 block text-center mb-2">
              {readerLang === 'AR' ? 'الصفحات' : 'PAGES'}
            </span>
            {Array.from({ length: maxPages }, (_, i) => i + 1).map((pNum) => (
              <button
                key={pNum}
                type="button"
                onClick={() => setCurrentPage(pNum)}
                className={`w-full aspect-[1/1.414] rounded border-2 transition-all p-1.5 flex flex-col justify-between text-left cursor-pointer ${
                  currentPage === pNum
                    ? 'border-[#EE9007] bg-[#EDE1D1] text-[#111409] shadow-md scale-105'
                    : 'border-[#EDE1D1]/20 bg-[#EDE1D1]/20 text-[#EDE1D1]/80 hover:bg-[#EDE1D1]/40'
                }`}
              >
                <span className="font-['Geist_Mono',monospace] text-[9px] font-bold">
                  {readerLang === 'AR' ? `ص.${pNum}` : `P.${pNum}`}
                </span>
                {pNum === 1 ? (
                  <div className="my-0.5 w-full h-8 rounded-xs border border-current/30 flex items-center justify-center text-sm bg-current/10 select-none">
                    {item.emoji}
                  </div>
                ) : (
                  <div className="space-y-0.5 opacity-60">
                    <div className="h-1 bg-current rounded-xs w-full" />
                    <div className="h-1 bg-current rounded-xs w-3/4" />
                    <div className="h-1 bg-current rounded-xs w-1/2" />
                  </div>
                )}
                <span className="text-[8px] font-bold truncate">
                  {getPageLabel(pNum)}
                </span>
              </button>
            ))}
          </aside>

          {/* Center Document Viewport */}
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto flex items-start justify-center">
            {/* The Realistic A4 Sheet */}
            <div
              dir={isRtl ? 'rtl' : 'ltr'}
              className="w-full max-w-[700px] min-h-[880px] bg-[#EDE1D1] text-[#111409] shadow-2xl rounded-sm border border-[#111409]/30 p-8 sm:p-12 relative flex flex-col justify-between transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {/* Top Accent Band */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#EE9007]" />

              {/* Running Header */}
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#111409]/30">
                <span className="font-['Geist_Mono',monospace] text-[10px] font-bold uppercase tracking-wider text-[#111409]">
                  {readerLang === 'AR'
                    ? `استوديو براش مونكي // مورد ${item.type} [النسخة العربية]`
                    : `BRUSH MONKEY STUDIO // ${item.type} RESOURCE [EN EDITION]`}
                </span>
                <span className="font-['Geist_Mono',monospace] text-[10px] font-semibold text-[#111409]/60">
                  {readerLang === 'AR'
                    ? `الصفحة ${currentPage} من ${maxPages}`
                    : `PAGE ${currentPage} OF ${maxPages}`}
                </span>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* ARABIC OR ENGLISH CONTENT DISPATCHER                          */}
              {/* ------------------------------------------------------------- */}
              <div className="flex-1 flex flex-col">
                {/* ========================================================= */}
                {/* 1. STARTUP BRAND GUIDE                                     */}
                {/* ========================================================= */}
                {item.id === 'startup-brand-guide-pdf' && (
                  <>
                    {/* ARABIC VERSION */}
                    {readerLang === 'AR' ? (
                      <>
                        {currentPage === 1 && (
                          <div className="space-y-6 flex-1 flex flex-col justify-between py-2">
                            <div>
                              <span className="inline-block px-3 py-1 rounded bg-[#EE9007] text-[#111409] font-bold text-xs border border-[#111409] mb-4">
                                حقيبة الاستوديو المجانية #01
                              </span>
                              <h1 className="font-['Cairo',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#111409] leading-tight mb-3">
                                دليل وقائمة إطلاق
                                <br />
                                <span className="text-[#EE9007]">الهوية البصرية للمشاريع الناشئة</span>
                              </h1>
                              <p className="text-sm text-[#111409]/80 font-medium max-w-md leading-relaxed">
                                الدليل الشامل لرواد الأعمال، فرق التصميم، والمشاريع الصاعدة لإدارة أصول الهوية بدقة واحترافية.
                              </p>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border-2 border-[#111409] bg-[#EDE1D1] p-4 sm:p-5 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[#111409] bg-[#EE9007] flex items-center justify-center text-2xl sm:text-3xl shadow-xs select-none shrink-0">
                                  🎨
                                </div>
                                <div>
                                  <span className="font-['Geist_Mono',monospace] text-[10px] uppercase font-bold text-[#111409]/60 block">
                                    أصول الهوية البصرية • BRAND ASSETS
                                  </span>
                                  <span className="font-bold text-sm sm:text-base text-[#111409] block">
                                    نظام الشعارات ومعايير النفاذية والخطوط ✦
                                  </span>
                                  <span className="text-[11px] text-[#111409]/75 font-mono block">
                                    SVG • PDF • PNG • WCAG AA • CMYK
                                  </span>
                                </div>
                              </div>
                              <span className="text-3xl opacity-20 hidden sm:block select-none">
                                📐
                              </span>
                            </div>

                            <div className="border-2 border-[#111409] bg-white p-5 rounded-lg shadow-sm">
                              <h4 className="font-bold text-xs uppercase text-[#EE9007] mb-3">
                                أهم الأهداف والمحاور في هذا الدليل:
                              </h4>
                              <ul className="text-xs space-y-2 text-[#111409]/90 font-medium">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007] font-bold">✦</span>
                                  <span>تحديد هوامش الأمان والمساحات العازلة للشعار (قاعدة 1.5X) والحد الأدنى للقياسات.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007] font-bold">✦</span>
                                  <span>تثبيت شفرات الألوان الرقمية والطباعية (HEX / RGB / CMYK) بمعايير تباين WCAG AA.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007] font-bold">✦</span>
                                  <span>بناء التسلسل الهرمي للخطوط العربية والإنجليزية بنسب تباعد متناسقة.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007] font-bold">✦</span>
                                  <span>قائمة الفحص الشاملة من 16 بنداً للتحقق قبل الإعلان الرسمي عن إطلاق المشروع.</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-[#111409] text-[#EDE1D1] p-4 rounded-lg flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-[#EE9007] block font-bold">إعداد وتطوير</span>
                                <span className="font-bold text-sm">قسم أنظمة التصميم — استوديو براش مونكي</span>
                              </div>
                              <span className="text-xs font-bold text-[#EDE1D1]/70 border border-[#EDE1D1]/30 px-2 py-1 rounded">
                                نسخة 2026
                              </span>
                            </div>
                          </div>
                        )}

                        {currentPage === 2 && (
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs text-[#EE9007] font-bold block">القسم 01 // المعايير الهندسية</span>
                              <h2 className="text-2xl font-bold text-[#111409]">
                                هوامش أمان الشعار والقياسات المعتمدة
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                للحفاظ على هيبة وقوة الشعار وسهولة قراءته في مختلف التطبيقات الرقمية والطباعية.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="border border-[#111409] p-4 rounded bg-white">
                                <h4 className="text-[11px] font-bold uppercase text-[#111409] mb-1">
                                  قاعدة مسافة الأمان (1.5X Clearspace)
                                </h4>
                                <p className="text-xs text-[#111409]/80 leading-relaxed mb-3">
                                  يمنع منعاً باتاً وضع أي نص أو عنصر تصميمي ضمن نطاق 1.5 ضعف ارتفاع الحرف الأساسي للشعار.
                                </p>
                                <div className="aspect-video bg-[#EDE1D1] border border-dashed border-[#EE9007] flex items-center justify-center relative p-3 text-center">
                                  <span className="font-bold text-base text-[#111409]">[ مساحة الشعار الأساسي ]</span>
                                  <span className="absolute top-1 left-2 text-[9px] font-mono text-[#EE9007]">
                                    هامش 1.5X
                                  </span>
                                </div>
                              </div>

                              <div className="border border-[#111409] p-4 rounded bg-white">
                                <h4 className="text-[11px] font-bold uppercase text-[#111409] mb-1">
                                  الحدود الدنيا لقياسات الشعار
                                </h4>
                                <div className="text-xs space-y-1.5 text-[#111409]/90 pt-1 leading-relaxed">
                                  <div>• أيقونة الموقع (Favicon): <strong>32 × 32 بكسل</strong></div>
                                  <div>• ترويسة الموقع (Header): <strong>بارتفاع 36 بكسل</strong></div>
                                  <div>• أيقونة التطبيقات (App Icon): <strong>1024 × 1024 بكسل</strong></div>
                                  <div>• كروت الأعمال (Cards): <strong>عرض 24 مم</strong></div>
                                  <div>• التطريز والملابس: <strong>عرض 35 مم</strong></div>
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#111409] rounded overflow-hidden">
                              <div className="bg-[#111409] text-[#EDE1D1] px-3 py-1.5 text-xs font-bold">
                                مصفوفة صيغ تصدير ملفات الشعار الموصى بها
                              </div>
                              <div className="divide-y divide-[#111409]/20 text-xs bg-white">
                                <div className="p-2.5 flex justify-between">
                                  <span className="font-bold font-mono">.SVG</span>
                                  <span className="text-[#111409]/80">متجهات فائقة الدقة للشاشات وتطبيقات الويب بدون بكسلة</span>
                                </div>
                                <div className="p-2.5 flex justify-between bg-[#EDE1D1]/30">
                                  <span className="font-bold font-mono">.PDF / .EPS</span>
                                  <span className="text-[#111409]/80">متجهات جاهزة لخطوط إنتاج المطابع واللوحات بنظام CMYK</span>
                                </div>
                                <div className="p-2.5 flex justify-between">
                                  <span className="font-bold font-mono">.PNG (3X)</span>
                                  <span className="text-[#111409]/80">خلفيات شفافة للعروض التقديمية والملفات التعريفية</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentPage === 3 && (
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs text-[#EE9007] font-bold block">القسم 02 // الألوان والخطوط</span>
                              <h2 className="text-2xl font-bold text-[#111409]">
                                لوحة الألوان المعتمدة والتسلسل الهرمي للخطوط
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                تمت معايرة جميع الألوان لتحقيق أعلى تباين بصري وفق معايير إمكانية الوصول (WCAG AA).
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="border border-[#111409] p-3 rounded bg-white flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-[#EE9007] border border-[#111409] shrink-0" />
                                <div className="text-xs">
                                  <span className="font-bold block">برتقالي تانجرين (Tangerine)</span>
                                  <span className="font-mono text-[10px] text-[#111409]/70">#EE9007 • لون التمييز والتفاعل</span>
                                </div>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-[#111409] border border-[#111409] shrink-0" />
                                <div className="text-xs">
                                  <span className="font-bold block">الأسود الغابي (Deep Forest)</span>
                                  <span className="font-mono text-[10px] text-[#111409]/70">#111409 • لون النصوص والحدود</span>
                                </div>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-[#EDE1D1] border border-[#111409] shrink-0" />
                                <div className="text-xs">
                                  <span className="font-bold block">الكريمي الدافئ (Warm Cream)</span>
                                  <span className="font-mono text-[10px] text-[#111409]/70">#EDE1D1 • مساحة الخلفية المريحة</span>
                                </div>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-[#C7F36B] border border-[#111409] shrink-0" />
                                <div className="text-xs">
                                  <span className="font-bold block">الليموني الحيوي (Acid Lime)</span>
                                  <span className="font-mono text-[10px] text-[#111409]/70">#C7F36B • شارات التنبيه والوسوم</span>
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#111409] p-4 rounded bg-white space-y-3">
                              <h4 className="text-xs font-bold uppercase text-[#111409]">
                                التسلسل الهرمي للخطوط العربية واللاتينية
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-baseline justify-between border-b border-[#111409]/10 pb-1">
                                  <span className="font-bold text-lg">العناوين البارزة الكبرى</span>
                                  <span className="font-mono text-xs text-[#111409]/60">Cairo Bold / 44px</span>
                                </div>
                                <div className="flex items-baseline justify-between border-b border-[#111409]/10 pb-1">
                                  <span className="font-bold text-sm">عناوين الأقسام والمواضيع</span>
                                  <span className="font-mono text-xs text-[#111409]/60">Cairo SemiBold / 26px</span>
                                </div>
                                <div className="flex items-baseline justify-between">
                                  <span className="text-xs">نصوص الفقرات والمقالات</span>
                                  <span className="font-mono text-xs text-[#111409]/60">Cairo Regular / 16px</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentPage === 4 && (
                          <div className="space-y-5">
                            <div>
                              <span className="text-xs text-[#EE9007] font-bold block">القسم 03 // الفحص النهائي</span>
                              <h2 className="text-2xl font-bold text-[#111409]">
                                قائمة تدقيق إطلاق الهوية البصرية (16 بنداً)
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                انقر للتحقق من كل بند قبل إطلاق المشروع والقنوات العامة:
                              </p>
                            </div>

                            <div className="space-y-2">
                              {[
                                { id: 'ar_fav', text: 'رفع أيقونات المتصفح والشاشات الذكية بكافة المقاسات (32, 180, 512 بكسل)' },
                                { id: 'ar_og', text: 'ربط بطاقة المشاركة لمواقع التواصل (Open Graph Image Card 1200x630px)' },
                                { id: 'ar_svg', text: 'اختبار الشعار المتجهي (.SVG) وتأكيد وضوحه على الخلفيات الفاتحة والداكنة' },
                                { id: 'ar_social', text: 'التأكد من توسط الشعار داخل الإطار الدائري لحسابات إنستغرام وتويتر ولينكد إن' },
                                { id: 'ar_type', text: 'ترخيص خطوط الويب للشركات ودعمها الكامل لعلامات التشكيل العربية' },
                                { id: 'ar_press', text: 'تجهيز ملف الحزمة الإعلامية (Press Kit) بالشعارات المفرغة ونبذة المؤسسين' },
                                { id: 'ar_doc', text: 'توحيد نماذج عروض الأسعار، الفواتير، ومستندات العمل بنفس طابع الهوية' },
                              ].map((chk) => (
                                <button
                                  key={chk.id}
                                  type="button"
                                  onClick={() => handleToggleCheck(chk.id)}
                                  className="w-full flex items-center gap-3 p-2.5 rounded border border-[#111409] bg-white hover:bg-[#EE9007]/15 transition-colors text-right cursor-pointer"
                                >
                                  {checkedItems[chk.id] ? (
                                    <CheckSquare size={18} className="text-[#EE9007] shrink-0" />
                                  ) : (
                                    <Square size={18} className="text-[#111409]/40 shrink-0" />
                                  )}
                                  <span
                                    className={`text-xs font-medium text-[#111409] ${
                                      checkedItems[chk.id] ? 'line-through opacity-60' : ''
                                    }`}
                                  >
                                    {chk.text}
                                  </span>
                                </button>
                              ))}
                            </div>

                            <div className="bg-[#EE9007] p-3.5 rounded border border-[#111409] flex items-center justify-between">
                              <span className="font-bold text-xs text-[#111409]">
                                هل ترغب في حفظ نسخة PDF عربية مطبوعة؟
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDownloadPdf('AR')}
                                disabled={downloadingLang !== null}
                                className="px-3 py-1.5 bg-[#111409] text-[#EDE1D1] text-xs font-bold rounded cursor-pointer hover:bg-black transition-colors"
                              >
                                تحميل PDF (عربي)
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* ENGLISH VERSION */
                      <>
                        {currentPage === 1 && (
                          <div className="space-y-6 flex-1 flex flex-col justify-between py-2">
                            <div>
                              <span className="inline-block px-3 py-1 rounded bg-[#EE9007] text-[#111409] font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider border border-[#111409] mb-4">
                                FREE STUDIO TOOLKIT #01
                              </span>
                              <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold uppercase text-[#111409] leading-tight tracking-tight mb-2">
                                BRAND LAUNCH
                                <br />
                                STARTER GUIDE
                              </h1>
                              <p className="text-sm text-[#111409]/80 font-medium max-w-md">
                                The essential handbook for emerging startups, creative teams & founders navigating identity launch.
                              </p>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border-2 border-[#111409] bg-[#EDE1D1] p-4 sm:p-5 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[#111409] bg-[#EE9007] flex items-center justify-center text-2xl sm:text-3xl shadow-xs select-none shrink-0">
                                  🎨
                                </div>
                                <div>
                                  <span className="font-['Geist_Mono',monospace] text-[10px] uppercase font-bold text-[#111409]/60 block">
                                    BRAND IDENTITY SYSTEM • ASSETS SPEC
                                  </span>
                                  <span className="font-bold text-sm sm:text-base text-[#111409] block">
                                    Logo Clearspace, Color Tokens & Type ✦
                                  </span>
                                  <span className="text-[11px] text-[#111409]/75 font-mono block">
                                    SVG • PDF • PNG • WCAG AA • CMYK
                                  </span>
                                </div>
                              </div>
                              <span className="text-3xl opacity-20 hidden sm:block select-none">
                                📐
                              </span>
                            </div>

                            <div className="border-2 border-[#111409] bg-white p-5 rounded-lg shadow-sm">
                              <h4 className="font-['Geist_Mono',monospace] text-xs font-bold uppercase text-[#EE9007] mb-2">
                                CORE OBJECTIVES IN THIS GUIDE
                              </h4>
                              <ul className="text-xs space-y-2 text-[#111409]/90 font-medium">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007]">✦</span>
                                  <span>Establish strict logo exclusion clearspace zones and minimum size thresholds.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007]">✦</span>
                                  <span>Lock in high-contrast color tokens with HEX, RGB, and CMYK print formulations.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007]">✦</span>
                                  <span>Pair display and body typography with mathematical line-height step ratios.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007]">✦</span>
                                  <span>Complete 16-point launch day pre-flight digital asset checklist.</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-[#111409] text-[#EDE1D1] p-4 rounded-lg flex items-center justify-between">
                              <div>
                                <span className="font-['Geist_Mono',monospace] text-[10px] text-[#EE9007] uppercase block font-bold">
                                  PREPARED BY
                                </span>
                                <span className="font-bold text-sm">Brush Monkey Design Systems Division</span>
                              </div>
                              <span className="font-['Geist_Mono',monospace] text-xs font-bold text-[#EDE1D1]/70">
                                2026 EDITION
                              </span>
                            </div>
                          </div>
                        )}

                        {currentPage === 2 && (
                          <div className="space-y-6">
                            <div>
                              <span className="font-['Geist_Mono',monospace] text-xs text-[#EE9007] font-bold uppercase block">
                                SECTION 01 // GEOMETRY
                              </span>
                              <h2 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-[#111409]">
                                Logo Clearspace & Safe Zones
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                Preserve the integrity of official brand marks across digital screens and print.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="border border-[#111409] p-4 rounded bg-white">
                                <h4 className="font-['Geist_Mono',monospace] text-[11px] font-bold uppercase text-[#111409] mb-1">
                                  THE "1.5X" CLEARSPACE RULE
                                </h4>
                                <p className="text-xs text-[#111409]/80 leading-relaxed mb-3">
                                  Never allow typography or UI elements to intrude within 1.5 times the cap-height of the primary mark.
                                </p>
                                <div className="aspect-video bg-[#EDE1D1] border border-dashed border-[#EE9007] flex items-center justify-center relative p-3">
                                  <span className="font-bold text-lg text-[#111409]">[ LOGO MARK ]</span>
                                  <span className="absolute top-1 right-2 text-[9px] font-['Geist_Mono',monospace] text-[#EE9007]">
                                    1.5X MARGIN
                                  </span>
                                </div>
                              </div>

                              <div className="border border-[#111409] p-4 rounded bg-white">
                                <h4 className="font-['Geist_Mono',monospace] text-[11px] font-bold uppercase text-[#111409] mb-1">
                                  MINIMUM DIGITAL SIZES
                                </h4>
                                <div className="text-xs space-y-1.5 text-[#111409]/90 font-mono pt-1">
                                  <div>• Favicon: 32 x 32 px</div>
                                  <div>• App Icon: 1024 x 1024 px</div>
                                  <div>• Web Header: 36px height</div>
                                  <div>• Print Card: 22mm width</div>
                                  <div>• Garment Print: 35mm width</div>
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#111409] rounded overflow-hidden">
                              <div className="bg-[#111409] text-[#EDE1D1] px-3 py-1.5 font-['Geist_Mono',monospace] text-xs font-bold uppercase">
                                Recommended Export Formats
                              </div>
                              <div className="divide-y divide-[#111409]/20 text-xs bg-white">
                                <div className="p-2.5 flex justify-between">
                                  <span className="font-bold font-mono">.SVG</span>
                                  <span className="text-[#111409]/80">Lossless Vector for Web UI, Apps & Dashboards</span>
                                </div>
                                <div className="p-2.5 flex justify-between bg-[#EDE1D1]/30">
                                  <span className="font-bold font-mono">.PDF / .EPS</span>
                                  <span className="text-[#111409]/80">CMYK Press-ready vector files for signage & print</span>
                                </div>
                                <div className="p-2.5 flex justify-between">
                                  <span className="font-bold font-mono">.PNG (3X)</span>
                                  <span className="text-[#111409]/80">Transparent rasters for slides and social profiles</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentPage === 3 && (
                          <div className="space-y-6">
                            <div>
                              <span className="font-['Geist_Mono',monospace] text-xs text-[#EE9007] font-bold uppercase block">
                                SECTION 02 // PALETTE & TYPE
                              </span>
                              <h2 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-[#111409]">
                                Color Tokens & Typography Scale
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                Strict accessibility standards adhering to WCAG AA 4.5:1 minimum contrast.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="border border-[#111409] p-3 rounded bg-white flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-[#EE9007] border border-[#111409] shrink-0" />
                                <div className="text-xs">
                                  <span className="font-bold block">Tangerine Sun</span>
                                  <span className="font-mono text-[10px] text-[#111409]/70">#EE9007 • Primary Accent</span>
                                </div>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-[#111409] border border-[#111409] shrink-0" />
                                <div className="text-xs">
                                  <span className="font-bold block">Deep Forest</span>
                                  <span className="font-mono text-[10px] text-[#111409]/70">#111409 • Deep Type Ink</span>
                                </div>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-[#EDE1D1] border border-[#111409] shrink-0" />
                                <div className="text-xs">
                                  <span className="font-bold block">Warm Cream</span>
                                  <span className="font-mono text-[10px] text-[#111409]/70">#EDE1D1 • Natural Canvas</span>
                                </div>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-[#C7F36B] border border-[#111409] shrink-0" />
                                <div className="text-xs">
                                  <span className="font-bold block">Acid Lime</span>
                                  <span className="font-mono text-[10px] text-[#111409]/70">#C7F36B • Highlight Badge</span>
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#111409] p-4 rounded bg-white space-y-3">
                              <h4 className="font-['Geist_Mono',monospace] text-xs font-bold uppercase text-[#111409]">
                                TYPOGRAPHIC STEP RATIO
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-baseline justify-between border-b border-[#111409]/10 pb-1">
                                  <span className="font-['Syne',sans-serif] font-bold text-xl">Display Headline</span>
                                  <span className="font-mono text-xs text-[#111409]/60">Syne Bold / 48px</span>
                                </div>
                                <div className="flex items-baseline justify-between border-b border-[#111409]/10 pb-1">
                                  <span className="font-['Syne',sans-serif] font-bold text-base">Section Subheading</span>
                                  <span className="font-mono text-xs text-[#111409]/60">Syne SemiBold / 28px</span>
                                </div>
                                <div className="flex items-baseline justify-between">
                                  <span className="text-xs">Regular Body Text & Paragraphs</span>
                                  <span className="font-mono text-xs text-[#111409]/60">Plus Jakarta Sans / 16px</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentPage === 4 && (
                          <div className="space-y-5">
                            <div>
                              <span className="font-['Geist_Mono',monospace] text-xs text-[#EE9007] font-bold uppercase block">
                                SECTION 03 // LAUNCH AUDIT
                              </span>
                              <h2 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-[#111409]">
                                Interactive Launch Checklist
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                Click to check off verified items before opening public channels.
                              </p>
                            </div>

                            <div className="space-y-2">
                              {[
                                { id: 'fav', text: 'Favicon and touch icons uploaded in all resolutions (32, 180, 512px)' },
                                { id: 'og', text: 'Social Open Graph image card (1200x630px, <300KB) linked in metadata' },
                                { id: 'svg', text: 'Master vector logo (.SVG) tested in light and dark mode viewports' },
                                { id: 'social', text: 'Circular avatar safe zones tested on Instagram, X, and LinkedIn' },
                                { id: 'type', text: 'Commercial web font licenses secured and local subsetting verified' },
                                { id: 'press', text: 'Press kit ZIP archive created with bio, high-res photos and logos' },
                                { id: 'doc', text: 'Company proposal, contract, and invoice templates branded in Notion' },
                              ].map((chk) => (
                                <button
                                  key={chk.id}
                                  type="button"
                                  onClick={() => handleToggleCheck(chk.id)}
                                  className="w-full flex items-center gap-3 p-2.5 rounded border border-[#111409] bg-white hover:bg-[#EE9007]/15 transition-colors text-left cursor-pointer"
                                >
                                  {checkedItems[chk.id] ? (
                                    <CheckSquare size={18} className="text-[#EE9007] shrink-0" />
                                  ) : (
                                    <Square size={18} className="text-[#111409]/40 shrink-0" />
                                  )}
                                  <span
                                    className={`text-xs font-medium text-[#111409] ${
                                      checkedItems[chk.id] ? 'line-through opacity-60' : ''
                                    }`}
                                  >
                                    {chk.text}
                                  </span>
                                </button>
                              ))}
                            </div>

                            <div className="bg-[#EE9007] p-3.5 rounded border border-[#111409] flex items-center justify-between">
                              <span className="font-bold text-xs text-[#111409]">
                                Ready to download this official PDF?
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDownloadPdf('EN')}
                                disabled={downloadingLang !== null}
                                className="px-3 py-1 bg-[#111409] text-[#EDE1D1] text-xs font-bold uppercase rounded cursor-pointer"
                              >
                                Save A4 Copy
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* ========================================================= */}
                {/* 2. SOCIAL CAROUSEL KIT                                    */}
                {/* ========================================================= */}
                {item.id === 'social-media-kit-figma' && (
                  <>
                    {/* ARABIC VERSION */}
                    {readerLang === 'AR' ? (
                      <>
                        {currentPage === 1 && (
                          <div className="space-y-6 flex-1 flex flex-col justify-between py-2">
                            <div>
                              <span className="inline-block px-3 py-1 rounded bg-[#111409] text-[#EDE1D1] font-bold text-xs border border-[#111409] mb-4">
                                مواصفات فيغما وكانفا #02
                              </span>
                              <h1 className="font-['Cairo',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#111409] leading-tight mb-3">
                                حقيبة قوالب
                                <br />
                                <span className="text-[#EE9007]">الكاروسيل الجاهزة للنشر</span>
                              </h1>
                              <p className="text-sm text-[#111409]/80 font-medium max-w-md leading-relaxed">
                                قوالب فيغما وكانفا مبنية بنظام Auto-Layout لزيادة التفاعل وبناء تسلسل سردي جذاب على منصات التواصل.
                              </p>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border-2 border-[#111409] bg-[#EDE1D1] p-4 sm:p-5 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[#111409] bg-[#111409] text-white flex items-center justify-center text-2xl sm:text-3xl shadow-xs select-none shrink-0">
                                  📱
                                </div>
                                <div>
                                  <span className="font-['Geist_Mono',monospace] text-[10px] uppercase font-bold text-[#111409]/60 block">
                                    قوالب فيغما وكانفا • SOCIAL BLUEPRINT
                                  </span>
                                  <span className="font-bold text-sm sm:text-base text-[#111409] block">
                                    معادلة الشرائح السبع للكاروسيل والستوري ⚡
                                  </span>
                                  <span className="text-[11px] text-[#111409]/75 font-mono block">
                                    1080×1350 (4:5) • 1080×1920 • Auto-Layout
                                  </span>
                                </div>
                              </div>
                              <span className="text-3xl opacity-20 hidden sm:block select-none">
                                🎠
                              </span>
                            </div>

                            <div className="border-2 border-[#111409] bg-white p-5 rounded-lg shadow-sm">
                              <h4 className="font-bold text-xs uppercase text-[#EE9007] mb-3">
                                مواصفات الحقيبة ومحتوياتها:
                              </h4>
                              <ul className="text-xs space-y-2 text-[#111409]/90 font-medium">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007] font-bold">✦</span>
                                  <span>24 لوحة عمل بمقاس 1080 × 1350 بكسل (النسبة العمودية المثالية 4:5).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007] font-bold">✦</span>
                                  <span>12 قالباً للريلز والقصص اليومية بمقاس 1080 × 1920 بكسل (نسبة 9:16).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007] font-bold">✦</span>
                                  <span>مكونات فيغما مرنة تدعم التخطيط التلقائي وهوامش الحاويات الذكية.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007] font-bold">✦</span>
                                  <span>إصداران بصريان: النمط التحريري الفاتح ونمط الأوبسيديان الداكن الفاخر.</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-[#EE9007] text-[#111409] p-4 rounded-lg flex items-center justify-between border border-[#111409]">
                              <div>
                                <span className="text-[10px] uppercase block font-bold">ترخيص مفتوح</span>
                                <span className="font-bold text-sm">مجاني للاستخدام التجاري للمشاريع والعملاء</span>
                              </div>
                              <span className="text-xs font-bold border border-[#111409] px-2 py-1 rounded">
                                الإصدار 3.0
                              </span>
                            </div>
                          </div>
                        )}

                        {currentPage === 2 && (
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs text-[#EE9007] font-bold block">الهيكل البصري // استراتيجية التفاعل</span>
                              <h2 className="text-2xl font-bold text-[#111409]">
                                معادلة الشرائح السبع (7-Slide Framework)
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                مصممة لرفع معدل إكمال القراءة وزيادة عمليات الحفظ وإعادة الإرسال.
                              </p>
                            </div>

                            <div className="space-y-2.5">
                              {[
                                { num: '01', title: 'شريحة خطاف التمرير (The Hook)', desc: 'عنوان صادم أو يطرح فجوة فضول، لا يتجاوز 7 كلمات بخط ضخم ومتباين.' },
                                { num: '02', title: 'شريحة الاحتكاك والألم المشترك', desc: 'تسمية المعاناة اليومية التي يواجهها جمهورك بوضوح تام.' },
                                { num: '03-05', title: 'شرائح القيمة المركزة', desc: 'فكرة واحدة محددة وقابلة للتطبيق في كل شريحة مع إبراز الكلمات المحورية.' },
                                { num: '06', title: 'شريحة الملخص الشامل (Cheat-Sheet)', desc: 'تلخيص الدرس بالكامل في نقاط سريعة، مسؤولة عن 80% من حفظ المنشور.' },
                                { num: '07', title: 'شريحة الدعوة لاتخاذ إجراء (CTA)', desc: 'طلب إجراء محدد وواضح: "احفظ المنشور للرجوع إليه" أو "شارك رأيك".' },
                              ].map((s) => (
                                <div key={s.num} className="p-3 rounded border border-[#111409] bg-white flex items-center gap-3">
                                  <span className="w-10 h-10 rounded bg-[#EE9007] text-[#111409] text-xs font-bold flex items-center justify-center shrink-0">
                                    {s.num}
                                  </span>
                                  <div>
                                    <h4 className="text-xs font-bold text-[#111409]">{s.title}</h4>
                                    <p className="text-[11px] text-[#111409]/75">{s.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="border border-[#111409] p-3.5 rounded bg-[#EDE1D1] text-xs">
                              <span className="font-bold block mb-1 text-[#EE9007]">نصيحة لمنصتي إنستغرام ولينكد إن:</span>
                              النسبة الرأسية 4:5 (1080 × 1350) تشغل مساحة أكبر بنسبة 35% على شاشات الجوالات مقارنة بالمربع التقليدي.
                            </div>
                          </div>
                        )}

                        {currentPage === 3 && (
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs text-[#EE9007] font-bold block">هندسة فيغما // الرموز والمتغيرات</span>
                              <h2 className="text-2xl font-bold text-[#111409]">
                                معايير مكونات فيغما والتباعدات
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                تم ضبط القياسات لتسهيل تعديل النصوص دون حدوث انكسار في التنسيق البصري.
                              </p>
                            </div>

                            <div className="border border-[#111409] rounded overflow-hidden">
                              <div className="bg-[#111409] text-[#EDE1D1] px-3 py-1.5 text-xs font-bold">
                                قيم التباعد واستدارة الحواف
                              </div>
                              <div className="divide-y divide-[#111409]/20 text-xs bg-white">
                                <div className="p-2.5 flex justify-between">
                                  <span className="font-bold">الهوامش الخارجية للوحة العمل</span>
                                  <span className="font-bold text-[#EE9007]">48 بكسل أفقياً • 64 بكسل رأسياً</span>
                                </div>
                                <div className="p-2.5 flex justify-between bg-[#EDE1D1]/30">
                                  <span className="font-bold">استدارة حواف البطاقات</span>
                                  <span className="font-bold text-[#111409]">16 بكسل حواف ناعمة</span>
                                </div>
                                <div className="p-2.5 flex justify-between">
                                  <span className="font-bold">سماكة حدود البروزاليزم</span>
                                  <span className="font-bold text-[#111409]">1.5 بكسل أسود صلب</span>
                                </div>
                                <div className="p-2.5 flex justify-between bg-[#EDE1D1]/30">
                                  <span className="font-bold">مؤشر تسلسل الشرائح</span>
                                  <span className="font-bold text-[#EE9007]">كبسولة عائمة بأرقام 11 بكسل</span>
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#111409] p-4 rounded bg-white space-y-2">
                              <h4 className="text-xs font-bold uppercase text-[#111409]">
                                كيفية استيراد القوالب وتخصيصها:
                              </h4>
                              <p className="text-xs text-[#111409]/80 leading-relaxed">
                                1. حمّل ملف مواصفات القوالب أدناه.<br />
                                2. افتح فيغما أو كانفا واستورد لوحات العمل المتجهية.<br />
                                3. اربط خطوط وألوان علامتك التجارية عبر متغيرات فيغما المحلية.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDownloadPdf('AR')}
                              disabled={downloadingLang !== null}
                              className="w-full py-3 rounded bg-[#111409] text-[#EDE1D1] hover:bg-[#EE9007] hover:text-[#111409] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Download size={15} />
                              <span>تحميل ملف مواصفات القوالب (عربي)</span>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      /* ENGLISH VERSION */
                      <>
                        {currentPage === 1 && (
                          <div className="space-y-6 flex-1 flex flex-col justify-between py-2">
                            <div>
                              <span className="inline-block px-3 py-1 rounded bg-[#111409] text-[#EDE1D1] font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider border border-[#111409] mb-4">
                                FIGMA & CANVA SPEC #02
                              </span>
                              <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold uppercase text-[#111409] leading-tight tracking-tight mb-2">
                                PLUG & PLAY
                                <br />
                                CAROUSEL KIT
                              </h1>
                              <p className="text-sm text-[#111409]/80 font-medium max-w-md">
                                Ready-to-publish Figma & Canva templates built with auto-layout for organic engagement.
                              </p>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border-2 border-[#111409] bg-[#EDE1D1] p-4 sm:p-5 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[#111409] bg-[#111409] text-white flex items-center justify-center text-2xl sm:text-3xl shadow-xs select-none shrink-0">
                                  📱
                                </div>
                                <div>
                                  <span className="font-['Geist_Mono',monospace] text-[10px] uppercase font-bold text-[#111409]/60 block">
                                    FIGMA & CANVA BLUEPRINTS • EDITORIAL
                                  </span>
                                  <span className="font-bold text-sm sm:text-base text-[#111409] block">
                                    7-Slide Storytelling Carousel Framework ⚡
                                  </span>
                                  <span className="text-[11px] text-[#111409]/75 font-mono block">
                                    1080x1350 (4:5) • 1080x1920 • Auto-Layout
                                  </span>
                                </div>
                              </div>
                              <span className="text-3xl opacity-20 hidden sm:block select-none">
                                🎠
                              </span>
                            </div>

                            <div className="border-2 border-[#111409] bg-white p-5 rounded-lg shadow-sm">
                              <h4 className="font-['Geist_Mono',monospace] text-xs font-bold uppercase text-[#EE9007] mb-2">
                                KIT SPECIFICATIONS & FILE CONTENTS
                              </h4>
                              <ul className="text-xs space-y-2 text-[#111409]/90 font-medium">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007]">✦</span>
                                  <span>24 Artboards tailored to 1080 x 1350px (4:5 optimal vertical portrait format).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007]">✦</span>
                                  <span>12 Story & Reel typography title overlays (1080 x 1920px 9:16 canvas).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007]">✦</span>
                                  <span>Figma Auto-Layout components with tokenized padding & responsive cards.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#EE9007]">✦</span>
                                  <span>Light Editorial (#EDE1D1) and Dark Obsidian (#111409) dual theme versions.</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-[#EE9007] text-[#111409] p-4 rounded-lg flex items-center justify-between border border-[#111409]">
                              <div>
                                <span className="font-['Geist_Mono',monospace] text-[10px] uppercase block font-bold">
                                  OPEN SOURCE LICENSE
                                </span>
                                <span className="font-bold text-sm">Free for Commercial Client Projects</span>
                              </div>
                              <span className="font-['Geist_Mono',monospace] text-xs font-bold">
                                VERSION 3.0
                              </span>
                            </div>
                          </div>
                        )}

                        {currentPage === 2 && (
                          <div className="space-y-6">
                            <div>
                              <span className="font-['Geist_Mono',monospace] text-xs text-[#EE9007] font-bold uppercase block">
                                FRAMEWORK // RETENTION
                              </span>
                              <h2 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-[#111409]">
                                The 7-Slide Viral Carousel Formula
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                Engineered for high completion rate and maximum bookmarks / shares.
                              </p>
                            </div>

                            <div className="space-y-2.5">
                              {[
                                { num: '01', title: 'The Scroll-Stopper Hook', desc: 'Punchy headline (<8 words), high contrast typography, curiosity gap.' },
                                { num: '02', title: 'The Agitation / Friction', desc: 'Call out the exact pain-point your audience feels daily in 2 sentences.' },
                                { num: '03-05', title: 'Value Density Cards', desc: '1 concrete tip per slide. Bold key phrases for visual skimming.' },
                                { num: '06', title: 'The Summary Cheat-Sheet', desc: 'Consolidate the entire lesson onto one slide. Drives 80% of bookmarks.' },
                                { num: '07', title: 'Call to Action (CTA)', desc: 'Clear single instruction: Save, share, or follow for next drop.' },
                              ].map((s) => (
                                <div key={s.num} className="p-3 rounded border border-[#111409] bg-white flex items-center gap-3">
                                  <span className="w-10 h-10 rounded bg-[#EE9007] text-[#111409] font-['Geist_Mono',monospace] text-xs font-bold flex items-center justify-center shrink-0">
                                    {s.num}
                                  </span>
                                  <div>
                                    <h4 className="text-xs font-bold text-[#111409]">{s.title}</h4>
                                    <p className="text-[11px] text-[#111409]/75">{s.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="border border-[#111409] p-3.5 rounded bg-[#EDE1D1] text-xs">
                              <span className="font-mono font-bold block mb-1">PRO TIP FOR INSTAGRAM & LINKEDIN:</span>
                              4:5 ratio (1080x1350) takes up 35% more vertical feed area than 1:1 square cards, directly increasing dwell time.
                            </div>
                          </div>
                        )}

                        {currentPage === 3 && (
                          <div className="space-y-6">
                            <div>
                              <span className="font-['Geist_Mono',monospace] text-xs text-[#EE9007] font-bold uppercase block">
                                AUTO-LAYOUT // FIGMA TOKENS
                              </span>
                              <h2 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-[#111409]">
                                Figma Component Architecture
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                Pre-configured constraints and variables for fast editorial production.
                              </p>
                            </div>

                            <div className="border border-[#111409] rounded overflow-hidden">
                              <div className="bg-[#111409] text-[#EDE1D1] px-3 py-1.5 font-['Geist_Mono',monospace] text-xs font-bold">
                                COMPONENT TOKENS & PADDING
                              </div>
                              <div className="divide-y divide-[#111409]/20 text-xs bg-white">
                                <div className="p-2.5 flex justify-between">
                                  <span className="font-bold">Outer Canvas Margins</span>
                                  <span className="font-mono text-[#EE9007] font-bold">48px horizontal, 64px vertical</span>
                                </div>
                                <div className="p-2.5 flex justify-between bg-[#EDE1D1]/30">
                                  <span className="font-bold">Card Squircle Radius</span>
                                  <span className="font-mono text-[#111409] font-bold">16px smooth corners</span>
                                </div>
                                <div className="p-2.5 flex justify-between">
                                  <span className="font-bold">Stroke Border Weight</span>
                                  <span className="font-mono text-[#111409] font-bold">1.5px solid brutal line</span>
                                </div>
                                <div className="p-2.5 flex justify-between bg-[#EDE1D1]/30">
                                  <span className="font-bold">Slide Index Indicator</span>
                                  <span className="font-mono text-[#EE9007] font-bold">Space Mono 11px Pill</span>
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#111409] p-4 rounded bg-white space-y-2">
                              <h4 className="font-['Geist_Mono',monospace] text-xs font-bold uppercase text-[#111409]">
                                HOW TO DUPLICATE TEMPLATES
                              </h4>
                              <p className="text-xs text-[#111409]/80 leading-relaxed">
                                1. Download the PDF spec sheet below.<br />
                                2. Open Figma or Canva and import the vector artboards.<br />
                                3. Connect your brand typography and colors using Figma Local Variables.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDownloadPdf('EN')}
                              disabled={downloadingLang !== null}
                              className="w-full py-3 rounded bg-[#111409] text-[#EDE1D1] hover:bg-[#EE9007] hover:text-[#111409] font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Download size={15} />
                              <span>Save PDF Template Spec Sheet</span>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* ========================================================= */}
                {/* 3. SMALL BUSINESS PRINT SPEC SHEET                        */}
                {/* ========================================================= */}
                {item.id === 'print-ready-spec-pdf' && (
                  <>
                    {/* ARABIC VERSION */}
                    {readerLang === 'AR' ? (
                      <>
                        {currentPage === 1 && (
                          <div className="space-y-6 flex-1 flex flex-col justify-between py-2">
                            <div>
                              <span className="inline-block px-3 py-1 rounded bg-[#C86D3B] text-white font-bold text-xs border border-[#111409] mb-4">
                                ورقة غش الإنتاج الطباعي #03
                              </span>
                              <h1 className="font-['Cairo',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#111409] leading-tight mb-3">
                                ورقة المواصفات والمعايير الطباعية
                                <br />
                                <span className="text-[#C86D3B]">للمتاجر والمقاهي الناشئة</span>
                              </h1>
                              <p className="text-sm text-[#111409]/80 font-medium max-w-md leading-relaxed">
                                المعايير الصناعية للمطابع: هوامش التسييل، أوزان الورق، معادلة الأسود الغني، وتشطيبات السبوت يوفي والفويل.
                              </p>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border-2 border-[#111409] bg-[#EDE1D1] p-4 sm:p-5 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[#111409] bg-[#C86D3B] text-white flex items-center justify-center text-2xl sm:text-3xl shadow-xs select-none shrink-0">
                                  🖨️
                                </div>
                                <div>
                                  <span className="font-['Geist_Mono',monospace] text-[10px] uppercase font-bold text-[#111409]/60 block">
                                    مرجع ما قبل الطباعة • COMMERCIAL PRINT
                                  </span>
                                  <span className="font-bold text-sm sm:text-base text-[#111409] block">
                                    التسييل والأمان والأسود الغني والورنيش 📦
                                  </span>
                                  <span className="text-[11px] text-[#111409]/75 font-mono block">
                                    +3mm Bleed • Rich Black • Spot UV • Foil
                                  </span>
                                </div>
                              </div>
                              <span className="text-3xl opacity-20 hidden sm:block select-none">
                                📄
                              </span>
                            </div>

                            <div className="border-2 border-[#111409] bg-white p-5 rounded-lg shadow-sm">
                              <h4 className="font-bold text-xs uppercase text-[#C86D3B] mb-3">
                                محاور ما قبل الطباعة الحاسمة:
                              </h4>
                              <ul className="text-xs space-y-2 text-[#111409]/90 font-medium">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#C86D3B] font-bold">✦</span>
                                  <span>هوامش التسييل والقص والأمان (Bleed / Trim / Safety) لتفادي الخطوط البيضاء.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#C86D3B] font-bold">✦</span>
                                  <span>معادلة الأسود الغني (Rich Black) مقابل الأسود الخالص 100% K للنصوص الصغيرة.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#C86D3B] font-bold">✦</span>
                                  <span>دليل أوزان وسماكات الورق (GSM) لقوائم الطعام، كروت الولاء، وأكياس البن.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#C86D3B] font-bold">✦</span>
                                  <span>إعداد طبقات التشطيبات الخاصة: الورنيش اللامع الموضعي والختم الحراري.</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-[#241812] text-[#EDE1D1] p-4 rounded-lg flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-[#C86D3B] font-bold block">نصيحة ذهبية لرواد الأعمال</span>
                                <span className="font-bold text-sm">اطلب دائماً بروفة ورقية ملونة (Wet Proof) قبل سحب الكميات</span>
                              </div>
                              <span className="text-xs font-bold text-[#EDE1D1]/70 border border-[#EDE1D1]/30 px-2 py-1 rounded">
                                معايير المطابع
                              </span>
                            </div>
                          </div>
                        )}

                        {currentPage === 2 && (
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs text-[#C86D3B] font-bold block">القسم 01 // هندسة ما قبل الطباعة</span>
                              <h2 className="text-2xl font-bold text-[#111409]">
                                هوامش التسييل ومعادلة الأسود الغني
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                تجنب الأخطاء الشائعة وإعادة الطباعة المكلفة باتباع هذه الأصول الفنية.
                              </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="border border-[#111409] p-3 rounded bg-white">
                                <span className="text-[10px] text-[#C86D3B] font-bold block mb-1">
                                  التسييل (+3 مم)
                                </span>
                                <p className="text-[11px] text-[#111409]/80 leading-snug">
                                  تمديد خلفيات الصور 3 مم خارج خط القص لمنع الحواف البيضاء.
                                </p>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white">
                                <span className="text-[10px] text-[#241812] font-bold block mb-1">
                                  خط القص (0 مم)
                                </span>
                                <p className="text-[11px] text-[#111409]/80 leading-snug">
                                  المقاس النهائي للمطبوعة حيث تسقط شفرة المقصلة في المطبعة.
                                </p>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white">
                                <span className="text-[10px] text-[#606C38] font-bold block mb-1">
                                  الأمان (-4 مم)
                                </span>
                                <p className="text-[11px] text-[#111409]/80 leading-snug">
                                  إبقاء النصوص والشعارات بعيدة 4 مم على الأقل عن حافة القص.
                                </p>
                              </div>
                            </div>

                            <div className="border border-[#111409] p-4 rounded bg-white space-y-3">
                              <h4 className="text-xs font-bold uppercase text-[#111409]">
                                معادلة الأسود الغني (CMYK Rich Black Formula)
                              </h4>
                              <div className="p-3 rounded bg-[#241812] text-[#EDE1D1] font-mono text-xs flex justify-between items-center">
                                <span>RICH BLACK: C:60 M:40 Y:40 K:100</span>
                                <span className="text-[#C86D3B] font-bold">تغطية: 240%</span>
                              </div>
                              <p className="text-xs text-[#111409]/80 leading-relaxed">
                                • استخدم الأسود الغني للخلفيات والكتل الكبيرة للحصول على لون داكن وفخم.<br />
                                • استخدم الأسود الخالص (100% K) للنصوص الدقيقة لمنع تشتت ألوان الحبر.
                              </p>
                            </div>
                          </div>
                        )}

                        {currentPage === 3 && (
                          <div className="space-y-6">
                            <div>
                              <span className="text-xs text-[#C86D3B] font-bold block">القسم 02 // الخامات والأوزان</span>
                              <h2 className="text-2xl font-bold text-[#111409]">
                                دليل أوزان وسماكات الورق (GSM Selector)
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                اختيار وزن الورق يحدد الإحساس الملمسي الفاخر الذي يشعر به عميل متجرك.
                              </p>
                            </div>

                            <div className="border border-[#111409] rounded overflow-hidden">
                              <div className="bg-[#241812] text-[#EDE1D1] px-3 py-1.5 text-xs font-bold">
                                الأوزان الموصى بها لكل مطبوعة
                              </div>
                              <div className="divide-y divide-[#111409]/20 text-xs bg-white">
                                <div className="p-2.5 flex justify-between items-center">
                                  <span className="font-bold font-mono">80 - 100 GSM</span>
                                  <span className="text-[#111409]/75">الفواتير، ورق الخطابات والمراسلات الرسمية</span>
                                </div>
                                <div className="p-2.5 flex justify-between items-center bg-[#EDE1D1]/30">
                                  <span className="font-bold font-mono">130 - 170 GSM</span>
                                  <span className="text-[#111409]/75">قوائم الطعام المطوية، البروشورات والملصقات</span>
                                </div>
                                <div className="p-2.5 flex justify-between items-center">
                                  <span className="font-bold font-mono">300 - 350 GSM</span>
                                  <span className="text-[#111409]/75">بطاقات الولاء بالأختام، كروت الطاولات، وبطاقات الأعمال</span>
                                </div>
                                <div className="p-2.5 flex justify-between items-center bg-[#EDE1D1]/30">
                                  <span className="font-bold font-mono">ورق الكرافت الطبيعي</span>
                                  <span className="text-[#C86D3B] font-bold">أكياس القهوة المختصة وأغلفة الأكواب العازلة</span>
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#111409] p-4 rounded bg-white space-y-2">
                              <h4 className="text-xs font-bold uppercase text-[#111409]">
                                إعداد طبقات التشطيبات الخاصة:
                              </h4>
                              <div className="text-xs space-y-2 text-[#111409]/80 leading-relaxed">
                                <div><strong>الورنيش الموضعي (Spot UV):</strong> إنشاء طبقة منفصلة بلون أسود 100% K للعناصر اللامعة.</div>
                                <div><strong>الختم الحراري (Foil):</strong> استخدام خطوط بسماكة 0.5pt على الأقل لمنع التقشر.</div>
                                <div><strong>قوالب القص (Die-Cuts):</strong> رسم مسار بلون ماجينتا 100% وتسميته "DieLine".</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentPage === 4 && (
                          <div className="space-y-5">
                            <div>
                              <span className="text-xs text-[#C86D3B] font-bold block">القسم 03 // فحص تسليم المطبعة</span>
                              <h2 className="text-2xl font-bold text-[#111409]">
                                قائمة فحص تسليم الملفات للمطبعة
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                تحقق من كل نقطة قبل إرسال الملفات النهائية للطباعة:
                              </p>
                            </div>

                            <div className="space-y-2">
                              {[
                                { id: 'ar_pr_cmyk', text: 'تحويل نظام الألوان كاملاً إلى CMYK والتأكد من عدم وجود صور RGB' },
                                { id: 'ar_pr_dpi', text: 'دقة ووضوح الصور: جميع الصور النقطية بدقة لا تقل عن 300 DPI' },
                                { id: 'ar_pr_outlines', text: 'تحويل النصوص إلى خطوط متجهات (Create Outlines) لتفادي فقدان الخطوط' },
                                { id: 'ar_pr_bleed', text: 'إضافة مسافة تسييل 3 مم على جميع أطراف الملف مع علامات القص' },
                                { id: 'ar_pr_black', text: 'تفعيل خيار Overprint للنصوص السوداء لمنع حدوث فراغات بيضاء' },
                                { id: 'ar_pr_pdf', text: 'تصدير الملف بصيغة PDF/X-1a:2001 أو PDF/X-4 المعتمدة للمطابع' },
                                { id: 'ar_pr_proof', text: 'المراجعة والتوقيع على بروفة ورقية ملونة (Wet Proof) قبل سحب الكميات' },
                              ].map((chk) => (
                                <button
                                  key={chk.id}
                                  type="button"
                                  onClick={() => handleToggleCheck(chk.id)}
                                  className="w-full flex items-center gap-3 p-2.5 rounded border border-[#111409] bg-white hover:bg-[#C86D3B]/15 transition-colors text-right cursor-pointer"
                                >
                                  {checkedItems[chk.id] ? (
                                    <CheckSquare size={18} className="text-[#C86D3B] shrink-0" />
                                  ) : (
                                    <Square size={18} className="text-[#111409]/40 shrink-0" />
                                  )}
                                  <span
                                    className={`text-xs font-medium text-[#111409] ${
                                      checkedItems[chk.id] ? 'line-through opacity-60' : ''
                                    }`}
                                  >
                                    {chk.text}
                                  </span>
                                </button>
                              ))}
                            </div>

                            <div className="bg-[#241812] text-[#EDE1D1] p-3.5 rounded border border-[#111409] flex items-center justify-between">
                              <span className="font-bold text-xs">
                                هل ترغب في حفظ ورقة المواصفات بصيغة PDF؟
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDownloadPdf('AR')}
                                disabled={downloadingLang !== null}
                                className="px-3 py-1.5 bg-[#C86D3B] text-[#EDE1D1] text-xs font-bold uppercase rounded cursor-pointer hover:bg-[#b05d2e] transition-colors"
                              >
                                تحميل PDF (عربي)
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* ENGLISH VERSION */
                      <>
                        {currentPage === 1 && (
                          <div className="space-y-6 flex-1 flex flex-col justify-between py-2">
                            <div>
                              <span className="inline-block px-3 py-1 rounded bg-[#C86D3B] text-white font-['Geist_Mono',monospace] text-xs font-bold uppercase tracking-wider border border-[#111409] mb-4">
                                PRINT PRODUCTION CHEAT SHEET #03
                              </span>
                              <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-bold uppercase text-[#111409] leading-tight tracking-tight mb-2">
                                SMALL BUSINESS
                                <br />
                                PRINT SPEC SHEET
                              </h1>
                              <p className="text-sm text-[#111409]/80 font-medium max-w-md">
                                Commercial press standards, paper stock selection, bleed & finishing guidelines.
                              </p>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border-2 border-[#111409] bg-[#EDE1D1] p-4 sm:p-5 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[#111409] bg-[#C86D3B] text-white flex items-center justify-center text-2xl sm:text-3xl shadow-xs select-none shrink-0">
                                  🖨️
                                </div>
                                <div>
                                  <span className="font-['Geist_Mono',monospace] text-[10px] uppercase font-bold text-[#111409]/60 block">
                                    COMMERCIAL PRINT STANDARDS • PRE-PRESS
                                  </span>
                                  <span className="font-bold text-sm sm:text-base text-[#111409] block">
                                    Bleed, Rich Black, Paper GSM & Foil 📦
                                  </span>
                                  <span className="text-[11px] text-[#111409]/75 font-mono block">
                                    +3mm Bleed • Rich Black • Spot UV • Foil
                                  </span>
                                </div>
                              </div>
                              <span className="text-3xl opacity-20 hidden sm:block select-none">
                                📄
                              </span>
                            </div>

                            <div className="border-2 border-[#111409] bg-white p-5 rounded-lg shadow-sm">
                              <h4 className="font-['Geist_Mono',monospace] text-xs font-bold uppercase text-[#C86D3B] mb-2">
                                CRITICAL PRE-PRESS RULES
                              </h4>
                              <ul className="text-xs space-y-2 text-[#111409]/90 font-medium">
                                <li className="flex items-start gap-2">
                                  <span className="text-[#C86D3B]">✦</span>
                                  <span>Bleed, Trim, and Safety margins: How to prevent white hairline blade slips.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#C86D3B]">✦</span>
                                  <span>Rich Black vs 100% K Black: The exact CMYK formula to prevent muddy grey solids.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#C86D3B]">✦</span>
                                  <span>Paper stock GSM guide: Choosing between 120gsm, 170gsm, 350gsm, and kraft board.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-[#C86D3B]">✦</span>
                                  <span>Finishing setups: Spot UV varnish, gold/copper foil, and die-cut paths.</span>
                                </li>
                              </ul>
                            </div>

                            <div className="bg-[#241812] text-[#EDE1D1] p-4 rounded-lg flex items-center justify-between">
                              <div>
                                <span className="font-['Geist_Mono',monospace] text-[10px] text-[#C86D3B] uppercase block font-bold">
                                  PRINT EXPERT ADVICE
                                </span>
                                <span className="font-bold text-sm">Always request 1 physical wet proof</span>
                              </div>
                              <span className="font-['Geist_Mono',monospace] text-xs font-bold text-[#EDE1D1]/70">
                                PRESS CERTIFIED
                              </span>
                            </div>
                          </div>
                        )}

                        {currentPage === 2 && (
                          <div className="space-y-6">
                            <div>
                              <span className="font-['Geist_Mono',monospace] text-xs text-[#C86D3B] font-bold uppercase block">
                                SECTION 01 // PRE-PRESS GEOMETRY
                              </span>
                              <h2 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-[#111409]">
                                Bleed, Trim & Ink Formulas
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                Avoid costly reprint mistakes with these industrial press standards.
                              </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              <div className="border border-[#111409] p-3 rounded bg-white">
                                <span className="font-['Geist_Mono',monospace] text-[10px] text-[#C86D3B] font-bold block mb-1">
                                  BLEED (+3mm)
                                </span>
                                <p className="text-[11px] text-[#111409]/80 leading-snug">
                                  Extend background art 3mm beyond the trim box on all 4 sides.
                                </p>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white">
                                <span className="font-['Geist_Mono',monospace] text-[10px] text-[#241812] font-bold block mb-1">
                                  TRIM (0mm)
                                </span>
                                <p className="text-[11px] text-[#111409]/80 leading-snug">
                                  Finished dimension of card/menu where blade cuts.
                                </p>
                              </div>

                              <div className="border border-[#111409] p-3 rounded bg-white">
                                <span className="font-['Geist_Mono',monospace] text-[10px] text-[#606C38] font-bold block mb-1">
                                  SAFETY (-4mm)
                                </span>
                                <p className="text-[11px] text-[#111409]/80 leading-snug">
                                  Keep all text at least 4mm inside the trim line.
                                </p>
                              </div>
                            </div>

                            <div className="border border-[#111409] p-4 rounded bg-white space-y-3">
                              <h4 className="font-['Geist_Mono',monospace] text-xs font-bold uppercase text-[#111409]">
                                CMYK RICH BLACK FORMULA
                              </h4>
                              <div className="p-3 rounded bg-[#241812] text-[#EDE1D1] font-mono text-xs flex justify-between items-center">
                                <span>RICH BLACK: C:60 M:40 Y:40 K:100</span>
                                <span className="text-[#C86D3B] font-bold">TAC: 240%</span>
                              </div>
                              <p className="text-xs text-[#111409]/80 leading-relaxed">
                                • Use Rich Black for large backgrounds, posters, and heavy headers.<br />
                                • Use standard 100% K (C:0 M:0 Y:0 K:100) for body text below 14pt to prevent mis-registration halos.
                              </p>
                            </div>
                          </div>
                        )}

                        {currentPage === 3 && (
                          <div className="space-y-6">
                            <div>
                              <span className="font-['Geist_Mono',monospace] text-xs text-[#C86D3B] font-bold uppercase block">
                                SECTION 02 // SUBSTRATES
                              </span>
                              <h2 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-[#111409]">
                                Paper Stock (GSM) Selector
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                Tactile thickness and weights for retail collateral.
                              </p>
                            </div>

                            <div className="border border-[#111409] rounded overflow-hidden">
                              <div className="bg-[#241812] text-[#EDE1D1] px-3 py-1.5 font-['Geist_Mono',monospace] text-xs font-bold">
                                RECOMMENDED WEIGHTS
                              </div>
                              <div className="divide-y divide-[#111409]/20 text-xs bg-white">
                                <div className="p-2.5 flex justify-between items-center">
                                  <span className="font-bold font-mono">80 - 100 GSM</span>
                                  <span className="text-[#111409]/75">Receipts, invoices, stationery copy paper</span>
                                </div>
                                <div className="p-2.5 flex justify-between items-center bg-[#EDE1D1]/30">
                                  <span className="font-bold font-mono">130 - 170 GSM</span>
                                  <span className="text-[#111409]/75">Folded takeaway menus, event flyers, brochures</span>
                                </div>
                                <div className="p-2.5 flex justify-between items-center">
                                  <span className="font-bold font-mono">300 - 350 GSM</span>
                                  <span className="text-[#111409]/75">Table tent cards, loyalty punchcards, hang tags</span>
                                </div>
                                <div className="p-2.5 flex justify-between items-center bg-[#EDE1D1]/30">
                                  <span className="font-bold font-mono">Natural Brown Kraft</span>
                                  <span className="text-[#C86D3B] font-bold">Specialty coffee bean bags & takeaway sleeves</span>
                                </div>
                              </div>
                            </div>

                            <div className="border border-[#111409] p-4 rounded bg-white space-y-2">
                              <h4 className="font-['Geist_Mono',monospace] text-xs font-bold uppercase text-[#111409]">
                                FINISHING TOUCHES
                              </h4>
                              <div className="text-xs space-y-2 text-[#111409]/80">
                                <div><strong>Spot UV:</strong> Create a separate layer in 100% Black (K) for high-gloss clear varnish.</div>
                                <div><strong>Foil Stamping:</strong> Use minimum 0.5pt stroke to avoid flaking on metallic foil dies.</div>
                                <div><strong>Die-Cuts:</strong> Vector outlines in 100% Magenta named "DieLine" set to Overprint Stroke.</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentPage === 4 && (
                          <div className="space-y-5">
                            <div>
                              <span className="font-['Geist_Mono',monospace] text-xs text-[#C86D3B] font-bold uppercase block">
                                SECTION 03 // PRE-FLIGHT
                              </span>
                              <h2 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-[#111409]">
                                Printer Handover Checklist
                              </h2>
                              <p className="text-xs text-[#111409]/80">
                                Verify each point before signing print production approvals.
                              </p>
                            </div>

                            <div className="space-y-2">
                              {[
                                { id: 'cmyk', text: 'Color mode: Converted to CMYK (ISO Coated v2). Zero RGB images.' },
                                { id: 'dpi', text: 'Raster resolution: All images at 300 DPI minimum at 100% final size.' },
                                { id: 'outlines', text: 'Typography outlines: All fonts converted to vector paths (Ctrl+Shift+O).' },
                                { id: 'bleed_check', text: 'Bleed: 3mm bleed added with standard crop/trim marks included.' },
                                { id: 'black_overprint', text: 'Overprint: 100% Black text set to Overprint to eliminate white gaps.' },
                                { id: 'pdf_preset', text: 'Export preset: Saved as standard PDF/X-1a:2001 or PDF/X-4.' },
                                { id: 'proof', text: 'Signed off on 1 physical hardcopy press proof before volume run.' },
                              ].map((chk) => (
                                <button
                                  key={chk.id}
                                  type="button"
                                  onClick={() => handleToggleCheck(chk.id)}
                                  className="w-full flex items-center gap-3 p-2.5 rounded border border-[#111409] bg-white hover:bg-[#C86D3B]/15 transition-colors text-left cursor-pointer"
                                >
                                  {checkedItems[chk.id] ? (
                                    <CheckSquare size={18} className="text-[#C86D3B] shrink-0" />
                                  ) : (
                                    <Square size={18} className="text-[#111409]/40 shrink-0" />
                                  )}
                                  <span
                                    className={`text-xs font-medium text-[#111409] ${
                                      checkedItems[chk.id] ? 'line-through opacity-60' : ''
                                    }`}
                                  >
                                    {chk.text}
                                  </span>
                                </button>
                              ))}
                            </div>

                            <div className="bg-[#241812] text-[#EDE1D1] p-3.5 rounded border border-[#111409] flex items-center justify-between">
                              <span className="font-bold text-xs">
                                Ready to download this print spec cheat sheet?
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDownloadPdf('EN')}
                                disabled={downloadingLang !== null}
                                className="px-3 py-1 bg-[#C86D3B] text-[#EDE1D1] text-xs font-bold uppercase rounded cursor-pointer"
                              >
                                Save PDF Sheet
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Running Footer */}
              <div className="flex items-center justify-between pt-3 mt-6 border-t border-[#111409]/30 text-[10px] font-['Geist_Mono',monospace] text-[#111409]/70">
                <span>BRUSH MONKEY STUDIO © 2026</span>
                <span>{readerLang === 'AR' ? 'مورد مفتوح من الاستوديو' : 'OPEN STUDIO RESOURCE'}</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
