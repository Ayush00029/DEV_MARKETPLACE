import React from 'react';
import { ArrowUpRight, Github, Trash2, UserRound, ShoppingBag } from 'lucide-react';

const ProjectCard = ({ project, user, onDelete, cart = [], onAddToCart, fallbackImage }) => {
  const isInCart = cart.some(item => item._id === project._id);

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image || fallbackImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(event) => {
            event.currentTarget.src = fallbackImage
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-primary-600 shadow-xl border border-white/20">
            ${Number(project.price || 0).toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 rounded-md">
            {project.category || 'Project'}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors leading-tight">
          {project.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {(Array.isArray(project.techStack) ? project.techStack : (project.techStack?.split(',') || []))
            .map(t => t.trim())
            .filter(Boolean)
            .slice(0, 3)
            .map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-slate-100 dark:border-slate-800">
                {tech}
              </span>
            ))}
        </div>
        
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 flex items-center justify-center text-primary-600 dark:text-primary-400 border border-primary-100/50 dark:border-primary-900/20">
              <UserRound size={18} />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">Creator</span>
              <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                {project.owner?.name || 'Unknown'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label="Open GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                aria-label="Open live project"
              >
                <ArrowUpRight size={20} />
              </a>
            )}
            {user && user.role !== 'admin' && user._id !== project.owner?._id && user._id !== project.owner && onAddToCart && (
              isInCart ? (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-850 text-slate-400 dark:text-slate-500 px-3.5 py-2 rounded-xl text-xs font-black border border-slate-200 dark:border-slate-800"
                >
                  <ShoppingBag size={14} />
                  <span>In Cart</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onAddToCart(project)}
                  className="inline-flex items-center gap-1 bg-primary-600 hover:bg-primary-700 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-md shadow-primary-600/20 cursor-pointer"
                  title="Add codebase to shopping cart"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Cart</span>
                </button>
              )
            )}
            {(user?._id === project.owner?._id || user?.role === 'admin') && (
              <button
                type="button"
                onClick={() => onDelete(project._id)}
                className="p-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
                aria-label="Delete project"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
