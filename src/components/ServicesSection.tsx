import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

interface EditorialServiceItem {
  num: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  deliverablesEn: string[];
  deliverablesAr: string[];
  accentColor: string; // hex
  accentBg: string;
  accentText: string;
  accentTagEn: string;
  accentTagAr: string;
  selectName: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { language } = useLanguage();

  const services: EditorialServiceItem[] = [
    {
      num: '01',
      titleEn: 'SOCIAL MEDIA DESIGN',
      titleAr: 'تصميم السوشال ميديا',
      descEn: 'High-engagement, scroll-stopping social templates that keep your visual identity consistent.',
      descAr: 'قوالب سوشال ميديا لافتة للأنظار وعالية التفاعل تُبقي الهوية البصرية لعلامتك حاضرة ومتناسقة دائمًا.',
      deliverablesEn: [
        'Instagram & LinkedIn Grid Templates',
        'Story & Reel Cover Layouts',
      ],
      deliverablesAr: [
        'قوالب شبكة منشورات إنستغرام ولينكدإن',
        'تصاميم وتنسيقات أغلفة الستوري والريلز',
      ],
      accentColor: '#EE9007',
      accentBg: 'bg-[#EE9007]',
      accentText: 'text-[#111409]',
      accentTagEn: 'TEMPLATES',
      accentTagAr: 'قوالب وتفاعل',
      selectName: 'Social Media Templates',
    },
    {
      num: '02',
      titleEn: 'STARTUP BRAND STARTER KIT',
      titleAr: 'حزمة هوية أولية للشركات الناشئة',
      descEn: 'A rapid, punchy foundational identity designed for early-stage startups ready to launch fast.',
      descAr: 'هوية بصرية أولية أساسية وسريعة الانطلاق صُممت خصيصاً للشركات الناشئة المستعدة للإطلاق السريع.',
      deliverablesEn: [
        'Primary & Responsive Logo Mark',
        'Core Color Palette & Typography',
      ],
      deliverablesAr: [
        'شعار رئيسي متجاوب لجميع المقاسات',
        'لوحة الألوان الجوهرية ونظام الخطوط',
      ],
      accentColor: '#111409',
      accentBg: 'bg-[#111409]',
      accentText: 'text-[#EDE1D1]',
      accentTagEn: 'FOUNDATIONAL',
      accentTagAr: 'تأسيس الهوية',
      selectName: 'Startup Starter Kit',
    },
    {
      num: '03',
      titleEn: 'SMALL BUSINESS PRINT DESIGN',
      titleAr: 'تصميم مطبوعات للأعمال والمتاجر',
      descEn: 'Tactile editorial layouts, event posters, and menus that capture attention in local physical spaces.',
      descAr: 'تصاميم تحريرية ملموسة، ملصقات فعاليات، وقوائم طعام تخطف الأنظار في المساحات والمتاجر الواقعية.',
      deliverablesEn: [
        'Event Posters & Art Prints',
        'Menus, Flyers & Postcards',
      ],
      deliverablesAr: [
        'ملصقات فعاليات ومطبوعات فنية جدارية',
        'قوائم طعام، بروشورات وبطاقات بريدية',
      ],
      accentColor: '#EE9007',
      accentBg: 'bg-[#EE9007]',
      accentText: 'text-[#111409]',
      accentTagEn: 'TACTILE PRINT',
      accentTagAr: 'مطبوعات ملموسة',
      selectName: 'Small Business Print Design',
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 border-b-2 border-[#111409] bg-[#EDE1D1] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 mb-12 border-b-2 border-[#111409]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#EE9007]" />
              <span
                data-en="STUDIO DISCIPLINES"
                data-ar="مجالات الاستوديو"
                className="font-mono text-xs font-bold tracking-widest uppercase text-[#111409]"
              >
                {language === 'AR' ? 'مجالات الاستوديو' : 'STUDIO DISCIPLINES'}
              </span>
            </div>
            <h2
              data-en="What We Do"
              data-ar="ما نقدمه"
              className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-[#111409]"
            >
              {language === 'AR' ? 'ما نقدمه' : 'What We Do'}
            </h2>
          </div>

          <div className="max-w-md">
            <p
              data-en="Three focused design disciplines. No bloated packages, no endless agency bureaucracy—just sharp, expressive craft executed with intent."
              data-ar="ثلاثة مجالات تصميمية محددة بدقة. دون حزم متضخمة أو بيروقراطية معقدة—بل مخرجات بصرية جريئة ومصقولة بعناية فائقة."
              className="text-sm sm:text-base text-[#111409]/75 font-medium leading-relaxed"
            >
              {language === 'AR'
                ? 'ثلاثة مجالات تصميمية محددة بدقة. دون حزم متضخمة أو بيروقراطية معقدة—بل مخرجات بصرية جريئة ومصقولة بعناية فائقة.'
                : 'Three focused design disciplines. No bloated packages, no endless agency bureaucracy—just sharp, expressive craft executed with intent.'}
            </p>
          </div>
        </div>

        {/* Editorial Service List (3 Horizontal Rows) */}
        <div className="divide-y divide-[#111409]/20">
          {services.map((service) => {
            const currentTitle = language === 'AR' ? service.titleAr : service.titleEn;
            const currentDesc = language === 'AR' ? service.descAr : service.descEn;
            const deliverables = language === 'AR' ? service.deliverablesAr : service.deliverablesEn;
            const currentTag = language === 'AR' ? service.accentTagAr : service.accentTagEn;

            return (
              <div
                key={service.num}
                id={`service-row-${service.num}`}
                className="group py-10 sm:py-14 transition-colors duration-200 hover:bg-[#EE9007]/10 relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Column 1: Big Number + Accent Graphic (3 cols) */}
                  <div className="lg:col-span-3 flex items-baseline gap-4">
                    <span className="font-display text-5xl sm:text-7xl font-bold text-[#111409] tracking-tighter leading-none select-none group-hover:translate-x-1 transition-transform">
                      {service.num}
                    </span>
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase rounded border border-[#111409] ${service.accentBg} ${service.accentText} w-fit`}
                      >
                        {currentTag}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-[#111409]/50 uppercase">
                        {language === 'AR' ? 'استوديو بروش مونكي' : 'BRUSH MONKEY'}
                      </span>
                    </div>
                  </div>

                  {/* Column 2: Service Title + Description (5 cols) */}
                  <div className="lg:col-span-5 pr-4 rtl:pr-0 rtl:pl-4">
                    <h3
                      data-en={service.titleEn}
                      data-ar={service.titleAr}
                      className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#111409] leading-tight mb-3 group-hover:text-[#EE9007] transition-colors"
                    >
                      {currentTitle}
                    </h3>
                    <p
                      data-en={service.descEn}
                      data-ar={service.descAr}
                      className="text-sm sm:text-base text-[#111409]/80 font-medium leading-relaxed max-w-xl"
                    >
                      {currentDesc}
                    </p>
                  </div>

                  {/* Column 3: Deliverables (3 cols) */}
                  <div className="lg:col-span-3 pt-1">
                    <span
                      data-en="Deliverables:"
                      data-ar="المخرجات:"
                      className="block font-mono text-xs font-bold uppercase tracking-widest text-[#111409] mb-3"
                    >
                      {language === 'AR' ? 'المخرجات:' : 'Deliverables:'}
                    </span>
                    <ul className="space-y-2">
                      {deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#111409]/85 font-medium leading-snug"
                        >
                          {/* Tiny playful geometric bullet colored with service accent */}
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 border border-[#111409]"
                            style={{ backgroundColor: service.accentColor }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 4: Subtle Action Link / Arrow (1 col) */}
                  <div className="lg:col-span-1 flex lg:justify-end items-center pt-2 lg:pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.selectName)}
                      aria-label={`Inquire about ${service.titleEn}`}
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#111409] bg-[#EDE1D1] text-[#111409] hover:bg-[#EE9007] hover:text-[#111409] transition-all duration-150 cursor-pointer shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    >
                      <ArrowUpRight size={20} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Footnote */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#111409]/70">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EE9007]" />
            <span data-en="Currently booking for Q2 / Limited client roster" data-ar="نستقبل المشاريع حالياً / حجوزات محددة">
              {language === 'AR' ? 'نستقبل المشاريع حالياً / حجوزات محددة' : 'Currently booking for Q2 / Limited client roster'}
            </span>
          </span>
          <span className="uppercase tracking-wider text-[#111409] font-bold">
            {language === 'AR' ? 'أقل تعقيداً • أكثر فناً وإتقاناً' : 'LESS UI • MORE ART DIRECTION'}
          </span>
        </div>
      </div>
    </section>
  );
};
