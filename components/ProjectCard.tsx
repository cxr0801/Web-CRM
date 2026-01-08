import React from 'react';
import { Project } from '../types';
import { FileText, ChevronRight, Clock, Stethoscope, User } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  // Find color based on category
  const categoryColor = CATEGORIES.find(c => c.name === project.category)?.color || '#64748b';
  
  // Create a light background version of the color
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '226, 232, 240';
  }

  return (
    <div className="group bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-slate-100 hover:border-slate-200 transition-all duration-300 ease-in-out flex flex-col h-full relative overflow-hidden">
      
      {/* Decorative top border line */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: categoryColor }}></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-3 mt-1">
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                #{project.day.toString().padStart(3, '0')}
            </span>
            <span 
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border"
              style={{ 
                color: categoryColor, 
                backgroundColor: `rgba(${hexToRgb(categoryColor)}, 0.1)`,
                borderColor: `rgba(${hexToRgb(categoryColor)}, 0.2)` 
              }}
            >
                {project.category}
            </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
            <User size={16} />
        </div>
      </div>

      {/* Content */}
      <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map(tag => (
            <span key={tag} className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                #{tag}
            </span>
        ))}
      </div>

      {/* Physician Info */}
      <div className="flex items-center gap-2 mb-5 text-slate-600 text-sm bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
        <div className="bg-white p-1 rounded-full shadow-sm">
            <Stethoscope size={14} className="text-blue-500" />
        </div>
        <span className="font-medium text-xs">主治：{project.physician}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
            <Clock size={14} />
            {project.date}
        </div>
        <div>
            <button 
              onClick={() => onViewDetails(project)}
              className="group/btn relative overflow-hidden bg-slate-900 hover:bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-300 shadow-sm"
            >
                <span className="relative z-10 flex items-center gap-1">
                    查看詳情 <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;