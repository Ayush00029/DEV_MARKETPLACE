import React from 'react';
import { Loader2, Plus, DollarSign, Tag, Image as ImageIcon, Github, ExternalLink, Layout } from 'lucide-react';

const ProjectForm = ({ projectForm, setProjectFormValue, handleCreateProject, savingProject, projectCategories }) => {
  return (
    <div id="sell" className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary-600/5 rounded-full -ml-16 -mt-16 blur-3xl"></div>

      <div className="relative mb-10">
        <span className="inline-block px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4 border border-primary-100/50 dark:border-primary-900/20">
          Seller Desk
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          List Your Project
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Reach thousands of developers worldwide.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleCreateProject}>
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Project Title</label>
          <input
            required
            className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
            value={projectForm.title}
            onChange={(e) => setProjectFormValue('title', e.target.value)}
            placeholder="e.g. Modern SaaS Analytics"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Description</label>
          <textarea
            required
            className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white min-h-[120px]"
            value={projectForm.description}
            onChange={(e) => setProjectFormValue('description', e.target.value)}
            placeholder="Explain what your project does and why it's great..."
            rows="4"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tech Stack</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600">
                <Layout size={18} />
              </div>
              <input
                required
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                value={projectForm.techStack}
                onChange={(e) => setProjectFormValue('techStack', e.target.value)}
                placeholder="React, Node, Tailwind..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600">
                <Tag size={18} />
              </div>
              <select
                required
                className="w-full pl-11 pr-10 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none cursor-pointer"
                value={projectForm.category}
                onChange={(e) => setProjectFormValue('category', e.target.value)}
              >
                {projectCategories.map((item) => (
                  <option value={item} key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Price (USD)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600">
                <DollarSign size={18} />
              </div>
              <input
                required
                min="0"
                type="number"
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                value={projectForm.price}
                onChange={(e) => setProjectFormValue('price', e.target.value)}
                placeholder="99"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Preview Image URL</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600">
                <ImageIcon size={18} />
              </div>
              <input
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                value={projectForm.image}
                onChange={(e) => setProjectFormValue('image', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">GitHub Repository</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600">
                <Github size={18} />
              </div>
              <input
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                value={projectForm.githubLink}
                onChange={(e) => setProjectFormValue('githubLink', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Live Demo URL</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600">
                <ExternalLink size={18} />
              </div>
              <input
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                value={projectForm.liveLink}
                onChange={(e) => setProjectFormValue('liveLink', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Development Status</label>
            <div className="relative group">
              <select
                required
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none cursor-pointer"
                value={projectForm.status || 'In Progress'}
                onChange={(e) => setProjectFormValue('status', e.target.value)}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Saved">Saved</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Development Progress ({projectForm.progress || 0}%)</label>
            </div>
            <div className="relative flex items-center gap-4 bg-slate-50 dark:bg-slate-800 px-5 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl">
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-primary-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                value={projectForm.progress || 0}
                onChange={(e) => setProjectFormValue('progress', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <button 
          className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-6" 
          disabled={savingProject} 
          type="submit"
        >
          {savingProject ? <Loader2 className="animate-spin" size={24} /> : <Plus size={24} />}
          PUBLISH LISTING
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
