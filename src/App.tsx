import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkSection } from './components/WorkSection';
import { ResourcesSection } from './components/ResourcesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectGalleryModal } from './components/ProjectGalleryModal';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [prefilledInquiry, setPrefilledInquiry] = useState<string>('');

  const handleOpenContact = (prefill?: string) => {
    setPrefilledInquiry(prefill || '');
    setIsContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactModalOpen(false);
    setPrefilledInquiry('');
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleOpenGallery = (project: Project) => {
    setGalleryProject(project);
  };

  const handleCloseGallery = () => {
    setGalleryProject(null);
  };

  const handleInquireFromProject = (projectName: string) => {
    setSelectedProject(null);
    handleOpenContact(projectName);
  };

  const handleSelectService = (serviceName: string) => {
    handleOpenContact(serviceName);
  };

  const handleExploreWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#EDE1D1] text-[#111409] flex flex-col font-sans selection:bg-[#EE9007] selection:text-[#111409]">
        {/* Navigation Header */}
        <Navbar onOpenContact={() => handleOpenContact()} />

        {/* Main Content Sections */}
        <main className="flex-grow">
          <Hero
            onExploreWork={handleExploreWork}
            onOpenContact={() => handleOpenContact()}
          />

          {/* PDF Guides & Resources Section at the top */}
          <ResourcesSection />

          <AboutSection />

          <ServicesSection onSelectService={handleSelectService} />

          <WorkSection onSelectProject={handleSelectProject} />

          <ProcessSection onStartProject={() => handleOpenContact()} />

          <ContactSection
            isModalOpen={isContactModalOpen}
            prefilledProject={prefilledInquiry}
            onOpenModal={() => handleOpenContact()}
            onCloseModal={handleCloseContact}
          />
        </main>

        {/* Footer */}
        <Footer />

        {/* Case Study Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseProject}
          onInquire={handleInquireFromProject}
          onViewImages={handleOpenGallery}
        />

        {/* Project Image Gallery Modal */}
        <ProjectGalleryModal
          project={galleryProject}
          onClose={handleCloseGallery}
          onOpenCaseStudy={(project) => {
            handleCloseGallery();
            handleSelectProject(project);
          }}
        />
      </div>
    </LanguageProvider>
  );
}
