import React from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project, CardColorTheme } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const { language } = useLanguage();

  const getCardThemeClasses = (theme: CardColorTheme, projectId?: string) => {
    if (projectId === 'pulse-social-suite') {
      return 'bg-[#EDE1D1] text-[#111409]';
    }
    if (projectId === 'orbit-starter-kit') {
      return 'bg-[#000000] text-[#EDE1D1]';
    }
    switch (theme) {
      case 'tangerine':
        return 'bg-[#EE9007] text-[#111409]';
      case 'forest':
        return 'bg-[#111409] text-[#EDE1D1]';
      case 'cream':
      default:
        return 'bg-[#EDE1D1] text-[#111409]';
    }
  };

  return (
    <section id="work" className="py-16 sm:py-24 border-b-2 border-[#111409] bg-[#EDE1D1] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header Title */}
        <div className="text-center mb-12">
          <span
            data-en="CONCEPT PORTFOLIO"
            data-ar="نماذج تجريبية وافتراضية"
            className="inline-block px-4 py-1 rounded-full bg-[#EE9007] text-[#111409] font-bold text-xs uppercase tracking-widest border-2 border-[#111409] shadow-brutal-sm mb-3"
          >
            {language === 'AR' ? 'نماذج تجريبية وافتراضية' : 'CONCEPT PORTFOLIO'}
          </span>
          <h2
            data-en="Selected Concept Work"
            data-ar="أبرز النماذج والمشاريع التجريبية"
            className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111409]"
          >
            {language === 'AR' ? 'أبرز النماذج والمشاريع التجريبية' : 'Selected Concept Work'}
          </h2>
          <p
            data-en="Hypothetical concept studies & experimental design prototypes across our 3 core specializations: social media, startup identity, and local print."
            data-ar="دراسات حالة ونماذج تجريبية افتراضية تبرز منهجيتنا عبر مجالاتنا الثلاثة الأساسية: قوالب السوشال ميديا، حزم الهوية الأولية، وتصاميم المطبوعات."
            className="mt-2 text-[#111409]/80 font-medium max-w-xl mx-auto"
          >
            {language === 'AR'
              ? 'دراسات حالة ونماذج تجريبية افتراضية تبرز منهجيتنا عبر مجالاتنا الثلاثة الأساسية: قوالب السوشال ميديا، حزم الهوية الأولية، وتصاميم المطبوعات.'
              : 'Hypothetical concept studies & experimental design prototypes across our 3 core specializations: social media, startup identity, and local print.'}
          </p>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => {
            const currentCatLabel =
              language === 'AR' && project.categoryLabelAr ? project.categoryLabelAr : project.categoryLabel;
            const currentTitle = language === 'AR' && project.titleAr ? project.titleAr : project.title;
            const currentShortDesc =
              language === 'AR' && project.shortDescAr ? project.shortDescAr : project.shortDesc;
            const currentMetric =
              language === 'AR' && project.highlightMetricAr ? project.highlightMetricAr : project.highlightMetric;
            const currentClient = language === 'AR' && project.clientAr ? project.clientAr : project.client;

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => onSelectProject(project)}
                className={`border-3 border-[#111409] rounded-2xl p-7 sm:p-9 min-h-[360px] flex flex-col justify-between shadow-brutal cursor-pointer transition-all duration-200 group hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-brutal-lg relative overflow-hidden ${getCardThemeClasses(
                  project.colorTheme,
                  project.id
                )}`}
              >
                {/* Top Bar: Category & Year */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      data-en={project.categoryLabel}
                      data-ar={project.categoryLabelAr || project.categoryLabel}
                      className="text-xs font-extrabold uppercase tracking-wider py-1 px-3 rounded-md bg-black/10 backdrop-blur-xs border border-current/30"
                    >
                      {currentCatLabel}
                    </span>
                    <span className="text-[10px] font-['Geist_Mono',monospace] font-bold uppercase tracking-wider py-0.5 px-2 rounded bg-black/10 border border-current/25">
                      {language === 'AR' ? 'مشروع تجريبي' : 'CONCEPT SPEC'}
                    </span>
                    {project.id === 'pulse-social-suite' && (
                      <span className="text-[10px] font-['Geist_Mono',monospace] font-bold uppercase tracking-wider py-0.5 px-2 rounded bg-[#D8C95A] text-[#342538] border border-[#342538] shadow-xs animate-pulse">
                        VARIATION 9
                      </span>
                    )}
                    {project.id === 'orbit-starter-kit' && (
                      <span className="text-[10px] font-['Geist_Mono',monospace] font-bold uppercase tracking-wider py-0.5 px-2 rounded bg-[#C7F36B] text-[#111322] border border-[#111409] shadow-xs">
                        VARIATION 9
                      </span>
                    )}
                    {project.id === 'corner-roastery-print' && (
                      <span className="text-[10px] font-['Geist_Mono',monospace] font-bold uppercase tracking-wider py-0.5 px-2 rounded bg-[#C86D3B] text-[#EDE1D1] border border-[#111409] shadow-xs animate-pulse">
                        VARIATION 9
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold opacity-85">
                    {project.year}
                  </span>
                </div>

                {/* Middle: Big Title & Short Pitch */}
                <div className="my-6 z-10">
                  <h3
                    data-en={project.title}
                    data-ar={project.titleAr || project.title}
                    className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.08] mb-3 group-hover:scale-[1.01] transition-transform"
                  >
                    {currentTitle}
                  </h3>
                  <p
                    data-en={project.shortDesc}
                    data-ar={project.shortDescAr || project.shortDesc}
                    className="text-sm sm:text-base font-medium opacity-90 line-clamp-2 max-w-lg"
                  >
                    {currentShortDesc}
                  </p>

                  {/* Color swatches preview */}
                  <div className="flex items-center gap-2 mt-4">
                    {project.palette.map((c) => (
                      <span
                        key={c.name}
                        className="w-4 h-4 rounded-full border border-[#111409] shadow-xs"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    {currentMetric && (
                      <span
                        data-en={project.highlightMetric || ''}
                        data-ar={project.highlightMetricAr || project.highlightMetric || ''}
                        className="text-xs font-bold ml-2 opacity-85 italic"
                      >
                        ★ {currentMetric}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom: Action link */}
                <div className="flex items-center justify-between pt-4 border-t border-current/25 z-10">
                  <span className="font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-1.5 group-hover:underline">
                    <span data-en="VIEW CONCEPT CASE" data-ar="استعراض النموذج الافتراضي">
                      {language === 'AR' ? 'استعراض النموذج الافتراضي' : 'VIEW CONCEPT CASE'}
                    </span>
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </span>
                  <span
                    data-en={project.client}
                    data-ar={project.clientAr || project.client}
                    className="text-xs font-semibold opacity-75"
                  >
                    {currentClient}
                  </span>
                </div>

                {/* Subtle background giant watermark letter */}
                <div className="absolute -right-4 -bottom-8 font-display text-[150px] font-black opacity-10 select-none pointer-events-none">
                  {currentTitle.charAt(0)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
