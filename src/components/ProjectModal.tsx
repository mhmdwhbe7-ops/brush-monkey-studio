import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, Check, ArrowRight, Quote, Sparkles, Images, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OrbitVariationModal } from './OrbitVariationModal';
import { PulseVariationModal } from './PulseVariationModal';
import { CornerVariationModal } from './CornerVariationModal';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
  onViewImages?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire, onViewImages }) => {
  const { language } = useLanguage();
  const [useStandardModalForOrbit, setUseStandardModalForOrbit] = useState(false);

  useEffect(() => {
    // Reset view state when a new project opens
    setUseStandardModalForOrbit(false);
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // If this is Pulse Drink Co., render the dedicated Variation 9 design!
  if (project.id === 'pulse-social-suite') {
    return (
      <PulseVariationModal
        project={project}
        onClose={onClose}
        onInquire={onInquire}
        onViewImages={onViewImages}
      />
    );
  }

  // If this is the Orbit AI Labs project and standard modal isn't forced, render the dedicated modal!
  if (project.id === 'orbit-starter-kit' && !useStandardModalForOrbit) {
    return (
      <OrbitVariationModal
        project={project}
        onClose={onClose}
        onInquire={onInquire}
        onViewImages={onViewImages}
      />
    );
  }

  // If this is The Corner Roastery project, render the dedicated Variation 9 design!
  if (project.id === 'corner-roastery-print') {
    return (
      <CornerVariationModal
        project={project}
        onClose={onClose}
        onInquire={onInquire}
        onViewImages={onViewImages}
      />
    );
  }

  const currentCategory =
    language === 'AR' && project.categoryLabelAr ? project.categoryLabelAr : project.categoryLabel;
  const currentClient = language === 'AR' && project.clientAr ? project.clientAr : project.client;
  const currentTitle = language === 'AR' && project.titleAr ? project.titleAr : project.title;
  const currentMetric =
    language === 'AR' && project.highlightMetricAr ? project.highlightMetricAr : project.highlightMetric;
  const currentDesc = language === 'AR' && project.fullDescAr ? project.fullDescAr : project.fullDesc;
  const deliverables =
    language === 'AR' && project.deliverablesAr ? project.deliverablesAr : project.deliverables;

  return (
    <div
      id="projectModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111409]/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#EDE1D1] border-4 border-[#111409] rounded-2xl p-6 sm:p-10 max-w-2xl w-full shadow-brutal-xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={language === 'AR' ? 'إغلاق' : 'Close modal'}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-[#EDE1D1] hover:bg-[#EE9007] border-2 border-[#111409] flex items-center justify-center shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#111409] cursor-pointer"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            data-en={project.categoryLabel}
            data-ar={project.categoryLabelAr || project.categoryLabel}
            className="bg-[#EE9007] text-[#111409] font-bold text-xs px-3 py-1 rounded-full border border-[#111409] uppercase tracking-wider shadow-xs"
          >
            {currentCategory}
          </span>
          <span className="text-xs font-semibold text-[#111409]/70">
            •{' '}
            <span data-en={project.client} data-ar={project.clientAr || project.client}>
              {currentClient}
            </span>{' '}
            ({project.year})
          </span>
        </div>

        {/* Title */}
        <h2
          data-en={project.title}
          data-ar={project.titleAr || project.title}
          className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#111409] mb-4 leading-tight"
        >
          {currentTitle}
        </h2>

        {/* Highlight metric if present */}
        {currentMetric && (
          <div className="bg-[#EDE1D1] border-2 border-[#111409] rounded-xl p-3.5 mb-6 flex items-center gap-2.5 shadow-brutal-sm">
            <Sparkles size={18} className="text-[#EE9007]" />
            <span
              data-en={project.highlightMetric || ''}
              data-ar={project.highlightMetricAr || project.highlightMetric || ''}
              className="text-sm font-bold text-[#111409]"
            >
              {currentMetric}
            </span>
          </div>
        )}

        {/* Full Narrative */}
        <div className="prose text-[#111409]/90 text-base leading-relaxed mb-6 font-medium">
          <p data-en={project.fullDesc} data-ar={project.fullDescAr || project.fullDesc}>
            {currentDesc}
          </p>
        </div>

        {/* Deliverables Section */}
        <div className="mb-6">
          <h4
            data-en="Key Deliverables"
            data-ar="المخرجات الرئيسية"
            className="font-display text-sm font-bold uppercase tracking-wider text-[#111409] mb-3"
          >
            {language === 'AR' ? 'المخرجات الرئيسية' : 'Key Deliverables'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-[#EDE1D1] border border-[#111409] p-2.5 rounded-lg text-xs font-bold text-[#111409]"
              >
                <Check size={14} className="text-[#EE9007]" strokeWidth={3} />
                <span
                  data-en={project.deliverables[idx] || item}
                  data-ar={(project.deliverablesAr && project.deliverablesAr[idx]) || item}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Visual Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h4
                data-en="Project Visuals & Production"
                data-ar="صور ومخرجات المشروع"
                className="font-display text-sm font-bold uppercase tracking-wider text-[#111409]"
              >
                {language === 'AR' ? 'صور ومخرجات المشروع' : 'Project Visuals & Production'}
              </h4>
              {onViewImages && (
                <button
                  type="button"
                  onClick={() => onViewImages(project)}
                  data-en="OPEN FULL GALLERY"
                  data-ar="عرض معرض الصور بالكامل"
                  className="text-xs font-bold text-[#EE9007] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Images size={14} strokeWidth={2.5} />
                  <span>{language === 'AR' ? 'عرض معرض الصور بالكامل' : 'OPEN FULL GALLERY'}</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => onViewImages && onViewImages(project)}
                  className="group/img relative h-24 sm:h-28 rounded-xl overflow-hidden border-2 border-[#111409] bg-[#EDE1D1] cursor-pointer shadow-xs hover:shadow-brutal-sm transition-all"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-[#111409]/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-[#EDE1D1] text-xs font-bold gap-1">
                    <Images size={14} />
                    <span>{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Color Palette Specimen */}
        <div className="mb-6">
          <h4
            data-en="Brand Color Architecture"
            data-ar="الألوان والهوية البصرية"
            className="font-display text-sm font-bold uppercase tracking-wider text-[#111409] mb-3"
          >
            {language === 'AR' ? 'الألوان والهوية البصرية' : 'Brand Color Architecture'}
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {project.palette.map((color) => (
              <div
                key={color.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[#111409] shadow-xs"
                style={{ backgroundColor: color.hex }}
              >
                <span
                  className={`text-xs font-bold ${
                    color.isDarkText ? 'text-[#111409]' : 'text-[#EDE1D1]'
                  }`}
                >
                  {color.name}
                </span>
                <span
                  className={`text-[10px] font-mono opacity-80 ${
                    color.isDarkText ? 'text-[#111409]' : 'text-[#EDE1D1]'
                  }`}
                >
                  {color.hex}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Quote if available */}
        {project.quote && (
          <div className="bg-[#EE9007]/20 border-2 border-[#111409] rounded-xl p-4 mb-8 relative">
            <Quote size={20} className="text-[#EE9007] mb-1" />
            <p
              data-en={`"${project.quote.text}"`}
              data-ar={`«${project.quote.textAr || project.quote.text}»`}
              className="text-sm italic font-medium text-[#111409] mb-2"
            >
              {language === 'AR'
                ? `«${project.quote.textAr || project.quote.text}»`
                : `"${project.quote.text}"`}
            </p>
            <div
              data-en={`— ${project.quote.author}`}
              data-ar={`— ${project.quote.authorAr || project.quote.author}`}
              className="text-xs font-bold text-[#111409]"
            >
              — {language === 'AR' && project.quote.authorAr ? project.quote.authorAr : project.quote.author}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          {project.images && project.images.length > 0 && onViewImages && (
            <button
              type="button"
              onClick={() => onViewImages(project)}
              data-en="VIEW PROJECT IMAGES"
              data-ar="عرض صور المشروع"
              className="w-full sm:w-auto bg-[#EDE1D1] hover:bg-[#EE9007] text-[#111409] py-3.5 px-6 rounded-xl font-bold border-3 border-[#111409] shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Images size={18} strokeWidth={2.5} />
              <span>
                {language === 'AR' ? 'عرض صور المشروع' : 'VIEW PROJECT IMAGES'}
              </span>
              <span className="text-xs font-mono font-bold bg-[#111409] text-[#EDE1D1] px-2 py-0.5 rounded-md">
                {project.images.length}
              </span>
            </button>
          )}

          <button
            onClick={() => {
              onInquire(project.title);
              onClose();
            }}
            data-en="INQUIRE ABOUT A SIMILAR PROJECT"
            data-ar="استفسر عن مشروع مماثل"
            className="w-full sm:w-auto flex-1 bg-[#EE9007] hover:bg-[#111409] text-[#111409] hover:text-[#EDE1D1] py-3.5 px-6 rounded-xl font-bold border-3 border-[#111409] shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {language === 'AR' ? 'استفسر عن مشروع مماثل' : 'INQUIRE ABOUT A SIMILAR PROJECT'}
            </span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
