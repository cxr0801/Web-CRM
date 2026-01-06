import React from 'react';
import { Project } from '../types';
import { FileText, ChevronRight, Clock, Stethoscope } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded">
                掛號 {project.day.toString().padStart(3, '0')}
            </span>
            <span className="text-slate-500 text-xs font-medium border border-slate-200 px-2 py-0.5 rounded">
                {project.category}
            </span>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-bold text-slate-800 text-lg mb-2">{project.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
        {project.description}
      </p>

      {/* Physician Info */}
      <div className="flex items-center gap-2 mb-6 text-slate-600 text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">
        <Stethoscope size={16} className="text-blue-500" />
        <span className="font-medium">主治：{project.physician}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Clock size={14} />
            {project.date}
        </div>
        <div>
            <button 
              onClick={() => onViewDetails(project)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-colors shadow-sm shadow-blue-200"
            >
                <FileText size={14} />
                查看病歷 <ChevronRight size={12} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;