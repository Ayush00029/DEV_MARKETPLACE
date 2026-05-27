import React, { useState, useMemo } from 'react';
import { Trash2, Github, ExternalLink, Clock, CheckCircle2, Bookmark, FolderHeart } from 'lucide-react';

const MyProjectsList = ({ projects, user, onDelete, fallbackImage }) => {
  const [filter, setFilter] = useState('All');

  // Filter projects belonging to this user
  const myProjects = useMemo(() => {
    return projects.filter(proj => proj.owner?._id === user?._id || proj.owner === user?._id);
  }, [projects, user]);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return myProjects;
    return myProjects.filter(proj => {
      const status = proj.status || 'In Progress';
      return status.toLowerCase() === filter.toLowerCase();
    });
  }, [myProjects, filter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30';
      case 'Saved':
        return 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30';
      case 'In Progress':
      default:
        return 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 size={12} className="shrink-0" />;
      case 'Saved':
        return <Bookmark size={12} className="shrink-0" />;
      case 'In Progress':
      default:
        return <Clock size={12} className="shrink-0 animate-pulse" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title */}
      <div className="mb-12">
        <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4 border border-primary-100/50 dark:border-primary-900/20">
          Personal Console
        </span>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          My Projects
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Track and manage your listed products, ongoing developer drafts, or bookmarked templates.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
        {['All', 'In Progress', 'Completed', 'Saved'].map((item) => (
          <button
            key={item}
            type="button"
            className={`px-5 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap border cursor-pointer ${
              item === filter
                ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary-600/50'
            }`}
            onClick={() => setFilter(item)}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => {
          const status = proj.status || 'In Progress';
          const progress = proj.progress || 0;
          return (
            <article key={proj._id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 flex flex-col h-full relative">
              
              {/* Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={proj.image || fallbackImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${getStatusStyle(status)}`}>
                    {getStatusIcon(status)}
                    <span>{status}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 rounded">
                      {proj.category || 'Project'}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ${Number(proj.price || 0).toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 mb-6">
                    {proj.description}
                  </p>
                </div>

                {/* Progress Bar Area */}
                <div className="mb-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Completion Rate
                    </span>
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        status === 'Completed' 
                          ? 'bg-emerald-500' 
                          : status === 'Saved' 
                          ? 'bg-purple-500' 
                          : 'bg-gradient-to-r from-primary-600 to-amber-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-slate-400">
                    Drafted {proj.createdAt ? new Date(proj.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'recently'}
                  </span>

                  <div className="flex items-center gap-1">
                    {proj.githubLink && (
                      <a 
                        href={proj.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="GitHub Repository"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {proj.liveLink && (
                      <a 
                        href={proj.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button
                      onClick={() => onDelete(proj._id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                      title="Delete Draft"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            </article>
          );
        })}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <FolderHeart className="text-slate-300" size={28} />
            </div>
            <h4 className="text-slate-900 dark:text-white font-bold text-lg">No personal projects found</h4>
            <p className="text-slate-400 text-sm mt-1">Projects you list on the marketplace will show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjectsList;
