import React from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <article 
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project.id);
        }
      }}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-[#F0F9FB]">
        <img 
          src={project.thumbnailUrl} 
          alt={`Thumbnail for ${project.title}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#2B6B7C]/5 group-hover:bg-[#2B6B7C]/0 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-[#F0F9FB] text-[#2B6B7C] text-xs font-medium uppercase tracking-wider rounded-full border border-[#2B6B7C]/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-slate-900 mb-2 group-hover:text-[#2B6B7C] transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-600 leading-relaxed mb-6 flex-1">
          {project.tagline}
        </p>

        <div className="flex items-center text-[#2B6B7C] font-medium mt-auto">
          <span>View Case Study</span>
          <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
};