import React, { useEffect } from 'react';
import { Project } from '../types';
import { ArrowLeft, Clock, User, Target, Lightbulb, MousePointerClick, ExternalLink } from 'lucide-react';
import { Button } from './Button';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <article className="relative animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Floating Back Button */}
      <div className="sticky top-20 z-40 pointer-events-none h-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <button 
            onClick={onBack}
            className="liquid-surface pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/80 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6B7C] focus-visible:ring-offset-2 active:scale-95"
            aria-label="Back to projects"
          >
            <ArrowLeft className="w-5 h-5 text-[#2B6B7C] group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-24 md:pt-32">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="mb-4">
            <span className="px-3 py-1 bg-[#F0F9FB]/50 backdrop-blur-sm text-[#2B6B7C] text-xs font-semibold uppercase tracking-widest rounded-full border border-[#2B6B7C]/20">
              Case Study
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight font-heading">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </header>

        {/* Hero Media Container */}
        <div className="w-full h-[400px] md:h-[500px] bg-[#F0F9FB] rounded-[32px] overflow-hidden mb-12 shadow-sm border border-white/50 relative z-10">
          {project.videoUrl ? (
            <video 
              src={project.videoUrl}
              poster={project.heroUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              aria-label={`Video visualization for ${project.title}`}
            />
          ) : (
            <img 
              src={project.heroUrl} 
              alt={`Hero visualization for ${project.title}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Metadata Grid - Liquid Surface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 p-8 liquid-surface rounded-[32px]">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/60 rounded-2xl text-[#2B6B7C]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-heading">Role</h3>
              <p className="text-slate-800 mt-1 font-medium">{project.role}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/60 rounded-2xl text-[#2B6B7C]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-heading">Duration</h3>
              <p className="text-slate-800 mt-1 font-medium">{project.duration}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-20">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading">
              Overview
            </h2>
            <div className="prose prose-lg text-slate-600 leading-relaxed max-w-none">
              <p>{project.description}</p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 font-heading">
                <Target className="w-5 h-5 text-[#BA1A1A]" />
                The Challenge
              </h2>
              <div className="prose text-slate-600 leading-relaxed bg-[#FFF8F8]/80 backdrop-blur-sm p-8 rounded-[32px] border border-red-100/50">
                <p>{project.challenge}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 font-heading">
                <Lightbulb className="w-5 h-5 text-[#A3823A]" />
                The Solution
              </h2>
              <div className="prose text-slate-600 leading-relaxed bg-[#FFFEF0]/80 backdrop-blur-sm p-8 rounded-[32px] border border-amber-100/50">
                <p>{project.solution}</p>
              </div>
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 font-heading">
              <MousePointerClick className="w-6 h-6 text-[#2B6B7C]" />
              Interaction Design
            </h2>
            <div className="prose prose-lg text-slate-600 leading-relaxed max-w-none">
              <p>{project.interactionNotes}</p>
            </div>
            
            {/* Live Prototype Link */}
            {project.liveUrl ? (
               <a 
                 href={project.liveUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="mt-10 group relative block w-full overflow-hidden rounded-[40px] border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 ease-spring"
                 style={{ transitionTimingFunction: 'var(--ease-spring)' } as React.CSSProperties}
                 aria-label={`Launch live prototype for ${project.title}`}
               >
                 {/* Visual Preview */}
                 <div className="absolute inset-0 h-full w-full bg-slate-900">
                   <img 
                     src={project.heroUrl} 
                     alt="" 
                     className="h-full w-full object-cover opacity-50 blur-[2px] transition-all duration-700 group-hover:blur-none group-hover:scale-105 group-hover:opacity-60"
                   />
                   <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
                 </div>
                 
                 {/* Content Overlay */}
                 <div className="relative flex min-h-[360px] flex-col items-center justify-center p-8 text-center z-10">
                   <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-500 group-hover:scale-110 shadow-xl" style={{ transitionTimingFunction: 'var(--ease-spring)' } as React.CSSProperties}>
                     <ExternalLink className="h-8 w-8 text-white drop-shadow-md" />
                   </div>
                   
                   <h3 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 drop-shadow-md">
                     Launch Live Prototype
                   </h3>
                   <p className="max-w-md text-lg text-slate-100 mb-8 leading-relaxed drop-shadow-sm font-medium">
                     Experience the deployed application in a new tab.
                   </p>

                   <div className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold tracking-wide text-[#2B6B7C] shadow-lg transition-all hover:bg-[#E0F7FA] hover:scale-105 active:scale-95 duration-300">
                     Open Project
                     <ExternalLink className="ml-2 h-4 w-4" />
                   </div>
                 </div>
               </a>
            ) : (
              <div className="mt-10 p-12 liquid-surface rounded-[40px] flex flex-col items-center justify-center min-h-[320px] text-center">
                <div className="w-20 h-20 bg-white/60 rounded-full flex items-center justify-center mb-4 text-[#2B6B7C]">
                   <MousePointerClick className="w-8 h-8" />
                </div>
                <p className="text-slate-400 font-medium italic">Interactive Prototype / Micro-interaction Demo Placeholder</p>
                <p className="text-slate-300 text-sm mt-2 max-w-xs">Detailed animation states and state-based logic visualization would be embedded here.</p>
              </div>
            )}
          </section>

          <section className="bg-slate-900 text-white p-10 md:p-12 rounded-[48px] shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2B6B7C]/20 blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 font-heading">Project Outcome</h2>
              <p className="text-xl text-slate-300 leading-relaxed">{project.outcome}</p>
            </div>
          </section>

        </div>

        <div className="mt-24 pt-12 border-t border-slate-200/50 flex flex-col items-center gap-6">
            <p className="text-slate-500 font-medium">Want to see more work?</p>
            <Button onClick={onBack} variant="secondary">
                Return to Portfolio
            </Button>
        </div>

      </div>
    </article>
  );
};