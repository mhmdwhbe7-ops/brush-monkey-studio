import React, { useState } from 'react';
import { Download, FileText, Layout, ExternalLink, Sparkles, Check, Eye, BookOpen, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { generateRealPdf } from '../utils/generatePdfs';
import { PdfReaderModal } from './PdfReaderModal';

export interface ResourceItem {
  id: string;
  type: 'PDF' | 'TEMPLATE';
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  formatEn: string;
  formatAr: string;
  pagesOrSlidesEn: string;
  pagesOrSlidesAr: string;
  fileSize: string;
  badgeEn: string;
  badgeAr: string;
  badgeBg: string;
  badgeColor: string;
  emoji: string;
  emojiBg: string;
  previewUrl?: string;
  featuresEn: string[];
  featuresAr: string[];
}

export const RESOURCES: ResourceItem[] = [
  {
    id: 'startup-brand-guide-pdf',
    type: 'PDF',
    titleEn: 'Brand Launch Checklist & Identity Starter Guide',
    titleAr: 'دليل وقائمة إطلاق الهوية البصرية للمشاريع الناشئة',
    descEn: 'A comprehensive 4-page A4 handbook detailing logo exclusion safe zones (1.5X rule), minimum size thresholds, calibrated color tokens (HEX/RGB/CMYK) with WCAG AA compliance, typography step ratios, and a 16-point launch-day pre-flight checklist.',
    descAr: 'دليل عملي شامل من 4 صفحات A4 عالية الدقة، يحدد هوامش أمان الشعار (قاعدة 1.5X)، الحدود الدنيا للقياسات، شفرات الألوان الرقمية والطباعية (HEX/RGB/CMYK) بمعايير تباين عالمية، التسلسل الهرمي للخطوط، وقائمة فحص تفاعلية من 16 بنداً قبل الإطلاق الرسمي.',
    formatEn: '4-Page A4 PDF Guidebook',
    formatAr: 'دليل رقمي 4 صفحات A4',
    pagesOrSlidesEn: '4 Pages',
    pagesOrSlidesAr: '4 صفحات',
    fileSize: '3.4 MB',
    badgeEn: 'FREE PDF GUIDE',
    badgeAr: 'دليل PDF مجاني',
    badgeBg: 'bg-[#EE9007]',
    badgeColor: 'text-[#111409]',
    emoji: '🎨',
    emojiBg: 'bg-[#EE9007] text-[#111409]',
    featuresEn: [
      'Logo 1.5X clearspace & export matrix (.SVG/.PDF/.PNG)',
      'Calibrated color tokens with WCAG AA compliance',
      'Arabic & Latin typographic step-ratio hierarchy',
      '16-point pre-flight launch & digital audit checklist'
    ],
    featuresAr: [
      'هوامش أمان الشعار (1.5X) ومصفوفة التصدير (.SVG/.PDF/.PNG)',
      'لوحة الألوان المعتمدة بمعايير النفاذية WCAG AA',
      'التسلسل الهرمي للخطوط العربية واللاتينية وتدرج الأحجام',
      'قائمة فحص تفاعلية من 16 بنداً للتدقيق قبل الإطلاق'
    ],
  },
  {
    id: 'social-media-kit-figma',
    type: 'TEMPLATE',
    titleEn: 'Social Carousel Kit & 7-Slide Framework',
    titleAr: 'حقيبة قوالب الكاروسيل واستراتيجية الشرائح السبع',
    descEn: 'A 3-page technical blueprint & layout guide covering 24 portrait 4:5 carousel boards (1080x1350), 12 Story/Reel layouts (1080x1920), the high-converting 7-Slide storytelling formula, and exact Figma Auto-Layout padding & corner-radius tokens.',
    descAr: 'دليل ومواصفات فنية من 3 صفحات تفصيلية، يوضح مواصفات 24 قالباً بنسبة 4:5 (1080×1350) و12 قالباً للستوري، مع شرح معادلة الشرائح السبع (7-Slide Framework) لزيادة الحفظ والمشاركات، وجداول تباعد Auto-Layout واستدارة الحواف في فيغما وكانفا.',
    formatEn: '3-Page A4 Spec & Guide',
    formatAr: 'مواصفات فيغما وكانفا A4',
    pagesOrSlidesEn: '3 Pages / 24 Layouts',
    pagesOrSlidesAr: '3 صفحات / 24 قالباً',
    fileSize: '18.2 MB',
    badgeEn: 'CAROUSEL BLUEPRINT',
    badgeAr: 'مخطط الكاروسيل',
    badgeBg: 'bg-[#111409]',
    badgeColor: 'text-[#EDE1D1]',
    emoji: '📱',
    emojiBg: 'bg-[#111409] text-[#EDE1D1]',
    featuresEn: [
      'The 7-Slide viral engagement & save-rate framework',
      '1080x1350 Portrait (4:5) and Story/Reel (9:16) specs',
      'Auto-Layout padding rules, 16px squircles & pill badges',
      'Dual aesthetic modes: Warm Editorial Cream & Obsidian Dark'
    ],
    featuresAr: [
      'معادلة الشرائح السبع لرفع معدل إكمال القراءة وعمليات الحفظ',
      'مقاسات النسبة العمودية 4:5 (1080×1350) وريلز (9:16)',
      'قيم التباعد وهوامش Auto-Layout واستدارة الحواف 16px',
      'نمطان للتصميم: التحريري الكريمي الفاتح والأوبسيديان الداكن'
    ],
  },
  {
    id: 'print-ready-spec-pdf',
    type: 'PDF',
    titleEn: 'Small Business Print Spec Sheet & Guide',
    titleAr: 'ورقة المعايير والمواصفات الطباعية للمتاجر والمقاهي',
    descEn: 'An indispensable 4-page production cheat sheet covering +3mm bleed lines, trim boundaries and safety margins to eliminate white borders, the optimal CMYK rich-black formula vs 100% K body text, paper stock GSM charts, and Spot UV & foil stamp mask setup.',
    descAr: 'مرجع طباعي عملي من 4 صفحات هندسية يحدد هوامش التسييل الخارجي (+3mm Bleed) وخط القص والأمان الداخلي لتفادي الحواف البيضاء، معادلة الأسود الغني (Rich Black)، جدول أوزان وسماكات الورق (GSM)، وضبط طبقات الورنيش الموضعي اللامع (Spot UV) والفويل الحراري.',
    formatEn: '4-Page A4 Print Spec',
    formatAr: 'مرجع طباعي هندسي A4',
    pagesOrSlidesEn: '4 Pages',
    pagesOrSlidesAr: '4 صفحات',
    fileSize: '2.1 MB',
    badgeEn: 'PRINT PRODUCTION CHEAT SHEET',
    badgeAr: 'مرجع الإنتاج الطباعي',
    badgeBg: 'bg-[#EE9007]',
    badgeColor: 'text-[#111409]',
    emoji: '🖨️',
    emojiBg: 'bg-[#C86D3B] text-white',
    featuresEn: [
      'Bleed (+3mm), trim lines, and interior safety boundaries',
      'Rich black formula (C60 M40 Y40 K100) vs 100% K text',
      'Paper stock GSM selector from 80gsm copy to 400gsm packaging',
      'Spot UV, foil stamp layer masks & PDF/X-1a handoff checklist'
    ],
    featuresAr: [
      'هوامش التسييل (+3mm Bleed) وخط القص وهامش الأمان الداخلي',
      'معادلة الأسود الغني (C60 M40 Y40 K100) مقابل نصوص 100% K',
      'جدول أوزان الورق (من 80gsm للأوراق حتى 400gsm للعلب والكروت)',
      'إعداد طبقات الورنيش الموضعي (Spot UV) والختم الحراري (Foil)'
    ],
  },
];

export const ResourcesSection: React.FC = () => {
  const { language } = useLanguage();
  const [downloadedKeys, setDownloadedKeys] = useState<string[]>([]);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<ResourceItem | null>(null);

  const handleDownload = async (id: string, lang: 'AR' | 'EN') => {
    const key = `${id}-${lang}`;
    setDownloadingKey(key);
    try {
      await generateRealPdf(id, lang);
      if (!downloadedKeys.includes(key)) {
        setDownloadedKeys((prev) => [...prev, key]);
      }
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setDownloadingKey(null);
    }
  };

  return (
    <section id="resources" className="py-20 sm:py-28 border-b-2 border-[#111409] bg-[#EDE1D1] relative overflow-hidden">
      {/* Playful background decorative accents */}
      <div className="absolute top-10 right-10 text-3xl opacity-20 pointer-events-none select-none">📐</div>
      <div className="absolute bottom-8 left-8 text-3xl opacity-20 pointer-events-none select-none">📑</div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 mb-12 border-b-2 border-[#111409]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EE9007]" />
              <span
                data-en="FREE TOOLKIT & ASSETS"
                data-ar="أدوات وقوالب مجانية"
                className="font-mono text-xs font-bold tracking-widest uppercase text-[#111409]"
              >
                {language === 'AR' ? 'أدوات وقوالب مجانية' : 'FREE TOOLKIT & ASSETS'}
              </span>
            </div>
            <h2
              data-en="PDF & Templates"
              data-ar="أدلة وقوالب الاستوديو"
              className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-[#111409]"
            >
              {language === 'AR' ? 'أدلة وقوالب الاستوديو' : 'PDF & Templates'}
            </h2>
          </div>

          <div className="max-w-md">
            <p
              data-en="Download our curated studio cheat-sheets, pitch guidelines, and editable design templates. Free tools crafted for founders and design-minded teams."
              data-ar="حمّل مجاناً أدلة الاستوديو التحريرية، قوالب السوشال ميديا المفتوحة، ودليل تجهيز المطبوعات لمساعدة رواد الأعمال والمصممين."
              className="text-sm sm:text-base text-[#111409]/80 font-medium leading-relaxed"
            >
              {language === 'AR'
                ? 'حمّل مجاناً أدلة الاستوديو التحريرية، قوالب السوشال ميديا المفتوحة، ودليل تجهيز المطبوعات لمساعدة رواد الأعمال والمصممين.'
                : 'Download our curated studio cheat-sheets, pitch guidelines, and editable design templates. Free tools crafted for founders and design-minded teams.'}
            </p>
          </div>
        </div>

        {/* 3 Editorial Horizontal Resource Rows */}
        <div className="divide-y-2 divide-[#111409]/20">
          {RESOURCES.map((item, index) => {
            const isDownloaded = downloadedKeys.includes(`${item.id}-AR`) || downloadedKeys.includes(`${item.id}-EN`);
            const currentTitle = language === 'AR' ? item.titleAr : item.titleEn;
            const currentDesc = language === 'AR' ? item.descAr : item.descEn;
            const currentFormat = language === 'AR' ? item.formatAr : item.formatEn;
            const currentPages = language === 'AR' ? item.pagesOrSlidesAr : item.pagesOrSlidesEn;
            const currentBadge = language === 'AR' ? item.badgeAr : item.badgeEn;
            const features = language === 'AR' ? item.featuresAr : item.featuresEn;

            return (
              <div
                key={item.id}
                id={`resource-row-${item.id}`}
                className="py-10 sm:py-12 group transition-colors duration-200 hover:bg-[#EE9007]/10 -mx-5 sm:-mx-8 px-5 sm:px-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Col 1: Number + Type Badge (3 cols) */}
                  <div className="lg:col-span-3 flex items-start gap-4">
                    <span className="font-display text-4xl sm:text-6xl font-bold text-[#111409] tracking-tighter leading-none select-none">
                      {`0${index + 1}`}
                    </span>
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase rounded border border-[#111409] shadow-2xs ${item.badgeBg} ${item.badgeColor} w-fit`}
                      >
                        {currentBadge}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#111409]/70">
                        {currentFormat} • {currentPages}
                      </span>
                    </div>
                  </div>

                  {/* Col 2: Title + Description (5 cols) */}
                  <div className="lg:col-span-5 pr-4 rtl:pr-0 rtl:pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      {item.type === 'PDF' ? (
                        <FileText size={18} className="text-[#EE9007]" />
                      ) : (
                        <Layout size={18} className="text-[#111409]" />
                      )}
                      <h3
                        data-en={item.titleEn}
                        data-ar={item.titleAr}
                        className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111409] leading-snug group-hover:text-[#EE9007] transition-colors"
                      >
                        {currentTitle}
                      </h3>
                    </div>
                    <p
                      data-en={item.descEn}
                      data-ar={item.descAr}
                      className="text-xs sm:text-sm text-[#111409]/80 font-medium leading-relaxed mb-4 max-w-xl"
                    >
                      {currentDesc}
                    </p>

                    {/* Meta highlights */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EDE1D1] border border-[#111409]/30 text-[11px] font-medium text-[#111409]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#111409]" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Quick Preview Thumbnail & Actions (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 lg:pt-1">
                    {/* Read & Preview Button */}
                    <button
                      type="button"
                      onClick={() => setPreviewItem(item)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl border-2 border-[#111409] bg-white hover:bg-[#EE9007]/20 transition-all shadow-brutal-sm cursor-pointer text-left rtl:text-right flex-1"
                    >
                      <div className={`w-12 h-12 rounded-lg border-2 border-[#111409] flex items-center justify-center shrink-0 shadow-xs ${item.emojiBg} text-2xl select-none`}>
                        {item.emoji}
                      </div>
                      <div className="pr-1 rtl:pr-0 rtl:pl-1 min-w-0 flex-1">
                        <span className="block font-mono text-[9px] uppercase font-bold text-[#EE9007]">
                          {language === 'AR' ? 'استعراض المستند' : 'READ & INSPECT'}
                        </span>
                        <span className="font-bold text-xs text-[#111409] flex items-center gap-1 truncate">
                          <BookOpen size={13} className="text-[#111409] shrink-0" />
                          <span className="truncate">{language === 'AR' ? 'قراءة الـ PDF' : 'Read PDF Spec'}</span>
                        </span>
                        <span className="text-[10px] text-[#111409]/60 font-mono block">
                          {item.fileSize} • {language === 'AR' ? item.pagesOrSlidesAr : item.pagesOrSlidesEn}
                        </span>
                      </div>
                    </button>

                    {/* Download Buttons: Arabic & English */}
                    <div className="flex flex-col sm:flex-row xl:flex-col gap-1.5 shrink-0 min-w-[170px]">
                      {/* Arabic Download Button */}
                      <button
                        type="button"
                        onClick={() => handleDownload(item.id, 'AR')}
                        disabled={downloadingKey === `${item.id}-AR`}
                        className={`px-3 py-2 rounded-lg border-2 border-[#111409] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-brutal-xs hover:translate-x-[-1px] hover:translate-y-[-1px] ${
                          downloadedKeys.includes(`${item.id}-AR`)
                            ? 'bg-[#EE9007] text-[#111409] border-[#111409]'
                            : 'bg-[#111409] text-[#EDE1D1] hover:bg-[#EE9007] hover:text-[#111409]'
                        }`}
                        title="تحميل النسخة العربية PDF"
                      >
                        {downloadingKey === `${item.id}-AR` ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>{language === 'AR' ? 'جاري تجهيز...' : 'Creating...'}</span>
                          </>
                        ) : downloadedKeys.includes(`${item.id}-AR`) ? (
                          <>
                            <Check size={13} strokeWidth={3} />
                            <span>{language === 'AR' ? 'تم الحفظ (عربي)' : 'Saved (AR)'}</span>
                          </>
                        ) : (
                          <>
                            <Download size={13} />
                            <span>{language === 'AR' ? 'تحميل (نسخة عربي)' : 'Download (Arabic)'}</span>
                          </>
                        )}
                      </button>

                      {/* English Download Button */}
                      <button
                        type="button"
                        onClick={() => handleDownload(item.id, 'EN')}
                        disabled={downloadingKey === `${item.id}-EN`}
                        className={`px-3 py-2 rounded-lg border-2 border-[#111409] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-brutal-xs hover:translate-x-[-1px] hover:translate-y-[-1px] ${
                          downloadedKeys.includes(`${item.id}-EN`)
                            ? 'bg-[#EE9007] text-[#111409] border-[#111409]'
                            : 'bg-white text-[#111409] hover:bg-[#111409] hover:text-[#EDE1D1]'
                        }`}
                        title="Download English PDF"
                      >
                        {downloadingKey === `${item.id}-EN` ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>{language === 'AR' ? 'Creating...' : 'Creating...'}</span>
                          </>
                        ) : downloadedKeys.includes(`${item.id}-EN`) ? (
                          <>
                            <Check size={13} strokeWidth={3} />
                            <span>{language === 'AR' ? 'تم الحفظ (EN)' : 'Saved (EN)'}</span>
                          </>
                        ) : (
                          <>
                            <Download size={13} />
                            <span>{language === 'AR' ? 'تحميل (English)' : 'Download (English)'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote callout banner */}
        <div className="mt-8 p-5 rounded-2xl border-2 border-[#111409] bg-[#EDE1D1] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-brutal-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p
              data-en="Need custom branded templates tailored exclusively for your internal marketing workflow?"
              data-ar="هل تحتاج إلى قوالب مخصصة مصممة خصيصاً لهوية وفريق عمل علامتك التجارية؟"
              className="text-xs sm:text-sm font-semibold text-[#111409]"
            >
              {language === 'AR'
                ? 'هل تحتاج إلى قوالب مخصصة مصممة خصيصاً لهوية وفريق عمل علامتك التجارية؟'
                : 'Need custom branded templates tailored exclusively for your internal marketing workflow?'}
            </p>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg bg-[#EE9007] text-[#111409] font-bold text-xs uppercase tracking-wider border border-[#111409] hover:bg-[#111409] hover:text-[#EDE1D1] transition-colors flex-shrink-0 shadow-2xs"
          >
            {language === 'AR' ? 'طلب قالب مخصص' : 'Inquire for Custom Kit'}
          </a>
        </div>
      </div>

      {/* Interactive In-App PDF Reader Modal */}
      {previewItem && (
        <PdfReaderModal
          item={previewItem}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </section>
  );
};
