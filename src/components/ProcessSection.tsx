import React from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProcessSectionProps {
  onStartProject: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartProject }) => {
  const { language } = useLanguage();

  return (
    <section id="process" className="py-16 sm:py-24 border-b-2 border-[#111409] bg-[#EDE1D1] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <span
            data-en="HOW WE WORK"
            data-ar="طريقة عملنا"
            className="inline-block px-4 py-1 rounded-full bg-[#EE9007] text-[#111409] font-bold text-xs uppercase tracking-widest border-2 border-[#111409] shadow-brutal-sm mb-3"
          >
            {language === 'AR' ? 'طريقة عملنا' : 'HOW WE WORK'}
          </span>
          <h2
            data-en="The Banana Process"
            data-ar="خطوات رحلة التصميم"
            className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111409]"
          >
            {language === 'AR' ? 'خطوات رحلة التصميم' : 'The Banana Process'}
          </h2>
          <p
            data-en="A simple, battle-tested four-stage journey from blurry brainstorm to launch-ready brand excellence."
            data-ar="رحلة واضحة ومجربة من 4 مراحل تحول الأفكار الأولية إلى علامات تجارية جاهزة للانطلاق والتفوق."
            className="mt-3 text-[#111409]/80 max-w-xl mx-auto font-medium"
          >
            {language === 'AR'
              ? 'رحلة واضحة ومجربة من 4 مراحل تحول الأفكار الأولية إلى علامات تجارية جاهزة للانطلاق والتفوق.'
              : 'A simple, battle-tested four-stage journey from blurry brainstorm to launch-ready brand excellence.'}
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => {
            const currentTagline = language === 'AR' && step.taglineAr ? step.taglineAr : step.tagline;
            const currentTitle = language === 'AR' && step.titleAr ? step.titleAr : step.title;
            const currentDesc = language === 'AR' && step.descriptionAr ? step.descriptionAr : step.description;
            const currentDeliverable =
              language === 'AR' && step.deliverableAr ? step.deliverableAr : step.deliverable;

            return (
              <div
                key={step.step}
                className="border-3 border-[#111409] rounded-2xl p-6 sm:p-7 shadow-brutal bg-[#EDE1D1] flex flex-col justify-between hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-brutal-lg transition-all group"
              >
                <div>
                  {/* Number Badge & Emoji */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-full bg-[#EE9007] text-[#111409] font-display font-bold text-xl flex items-center justify-center border-2 border-[#111409] shadow-brutal-sm group-hover:scale-110 transition-transform">
                      {step.step}
                    </div>
                    <span className="text-3xl">{step.emoji}</span>
                  </div>

                  <div
                    data-en={step.tagline}
                    data-ar={step.taglineAr || step.tagline}
                    className="text-[11px] font-extrabold uppercase text-[#EE9007] tracking-wider mb-1"
                  >
                    {currentTagline}
                  </div>

                  <h3
                    data-en={step.title}
                    data-ar={step.titleAr || step.title}
                    className="font-display text-2xl font-bold uppercase text-[#111409] mb-3"
                  >
                    {currentTitle}
                  </h3>

                  <p
                    data-en={step.description}
                    data-ar={step.descriptionAr || step.description}
                    className="text-sm font-medium text-[#111409]/80 leading-relaxed mb-6"
                  >
                    {currentDesc}
                  </p>
                </div>

                {/* Deliverable Capsule */}
                <div className="pt-4 border-t-2 border-dashed border-[#111409]/20">
                  <div
                    data-en="Milestone Deliverable:"
                    data-ar="مخرجات المرحلة:"
                    className="text-[10px] uppercase font-bold text-[#111409]/60 tracking-wider"
                  >
                    {language === 'AR' ? 'مخرجات المرحلة:' : 'Milestone Deliverable:'}
                  </div>
                  <div
                    data-en={step.deliverable}
                    data-ar={step.deliverableAr || step.deliverable}
                    className="text-xs font-bold text-[#111409] mt-0.5"
                  >
                    {currentDeliverable}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Guarantee Note */}
        <div className="mt-12 bg-[#EE9007]/20 border-2 border-[#111409] rounded-2xl p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-brutal-sm text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤝</span>
            <div>
              <div
                data-en="Clear Timelines & No Surprise Invoices"
                data-ar="جداول زمنية واضحة وبدون فواتير مفاجئة"
                className="font-display font-bold text-base text-[#111409]"
              >
                {language === 'AR'
                  ? 'جداول زمنية واضحة وبدون فواتير مفاجئة'
                  : 'Clear Timelines & No Surprise Invoices'}
              </div>
              <div
                data-en="Fixed milestone pricing with defined delivery dates and transparent revisions."
                data-ar="أسعار ثابتة للمراحل مع مواعيد تسليم محددة وتعديلات شفافة."
                className="text-xs text-[#111409]/75 font-medium"
              >
                {language === 'AR'
                  ? 'أسعار ثابتة للمراحل مع مواعيد تسليم محددة وتعديلات شفافة.'
                  : 'Fixed milestone pricing with defined delivery dates and transparent revisions.'}
              </div>
            </div>
          </div>
          <button
            onClick={onStartProject}
            data-en="START STEP 1"
            data-ar="ابدأ المرحلة الأولى"
            className="bg-[#111409] text-[#EDE1D1] px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#EE9007] hover:text-[#111409] transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>{language === 'AR' ? 'ابدأ المرحلة الأولى' : 'START STEP 1'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
