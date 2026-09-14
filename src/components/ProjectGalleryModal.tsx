import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight, Images, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectGalleryModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenCaseStudy?: (project: Project) => void;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({
  project,
  onClose,
  onOpenCaseStudy,
}) => {
  const { language } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, activeImageIndex]);

  if (!project || !project.images || project.images.length === 0) return null;

  const images = project.images;
  const currentImage = images[activeImageIndex] || images[0];

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentTitle = language === 'AR' && project.titleAr ? project.titleAr : project.title;
  const currentCatLabel =
    language === 'AR' && project.categoryLabelAr ? project.categoryLabelAr : project.categoryLabel;
  const currentCaption =
    language === 'AR' && currentImage.captionAr ? currentImage.captionAr : currentImage.caption;

  return (
    <div
      id="projectGalleryModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111409]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#EDE1D1] border-4 border-[#111409] rounded-2xl w-full max-w-4xl shadow-brutal-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b-3 border-[#111409] bg-[#EDE1D1] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-[#EE9007] border-2 border-[#111409] flex items-center justify-center text-[#111409] shrink-0 shadow-xs">
              <Images size={18} strokeWidth={2.5} />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#111409] text-[#EDE1D1] tracking-wider">
                  {currentCatLabel}
                </span>
                <span className="text-xs font-semibold text-[#111409]/70">
                  {project.year}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#111409] truncate leading-tight mt-0.5">
                {currentTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenCaseStudy && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCaseStudy(project);
                }}
                data-en="FULL CASE STUDY"
                data-ar="تفاصيل المشروع"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#EE9007] hover:bg-[#111409] text-[#111409] hover:text-[#EDE1D1] font-bold text-xs rounded-lg border-2 border-[#111409] shadow-brutal-sm cursor-pointer transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>{language === 'AR' ? 'تفاصيل المشروع' : 'FULL CASE STUDY'}</span>
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label={language === 'AR' ? 'إغلاق' : 'Close gallery'}
              className="w-9 h-9 rounded-full bg-[#EDE1D1] hover:bg-[#EE9007] border-2 border-[#111409] flex items-center justify-center shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5 transition-all text-[#111409] cursor-pointer"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Main Stage: Photo Viewer */}
        <div className="relative bg-[#111409] flex items-center justify-center min-h-[280px] sm:min-h-[440px] max-h-[60vh] overflow-hidden group select-none p-3 sm:p-5">
          <img
            key={currentImage.url}
            src={currentImage.url}
            alt={currentImage.alt || currentTitle}
            referrerPolicy="no-referrer"
            className="max-h-[56vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300 border border-white/15"
          />

          {/* Navigation Controls: Previous */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label={language === 'AR' ? 'الصورة السابقة' : 'Previous image'}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#EDE1D1] hover:bg-[#EE9007] text-[#111409] border-2 border-[#111409] shadow-brutal-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 z-20"
              >
                <ChevronLeft size={22} strokeWidth={3} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label={language === 'AR' ? 'الصورة التالية' : 'Next image'}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#EDE1D1] hover:bg-[#EE9007] text-[#111409] border-2 border-[#111409] shadow-brutal-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 z-20"
              >
                <ChevronRight size={22} strokeWidth={3} />
              </button>
            </>
          )}

          {/* Badge counter */}
          <div className="absolute bottom-3 right-3 bg-[#111409]/85 backdrop-blur-xs text-[#EDE1D1] border border-[#EDE1D1]/30 text-xs font-mono font-bold px-3 py-1 rounded-full pointer-events-none">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Caption & Thumbnails Footer */}
        <div className="p-4 sm:p-5 bg-[#EDE1D1] border-t-3 border-[#111409] flex flex-col gap-3">
          {/* Caption */}
          <div className="flex items-start justify-between gap-3">
            <p
              data-en={currentImage.caption}
              data-ar={currentImage.captionAr || currentImage.caption}
              className="text-xs sm:text-sm font-bold text-[#111409] leading-snug"
            >
              {currentCaption}
            </p>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 pt-1">
              {images.map((img, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Thumbnail ${idx + 1}`}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'border-[#EE9007] ring-3 ring-[#EE9007] scale-105 shadow-brutal-sm'
                        : 'border-[#111409] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
