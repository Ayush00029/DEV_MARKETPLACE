import React from 'react';
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react';

const Hero = ({ user }) => {
  return (
    <section id="top" className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-[128px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-in fade-in slide-in-from-left duration-700">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6">
              <Sparkles size={16} aria-hidden="true" />
              Production-ready developer assets
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Buy and sell complete <span className="text-primary-600">projects</span> without the messy middle.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-xl">
              Discover MERN apps, SaaS dashboards, AI tools, and launch kits from
              developers who ship. List your own project when you are ready.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
              >
                Browse projects
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              {(!user || user.role !== 'admin') && (
                <a 
                  href="#sell" 
                  className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Plus size={20} aria-hidden="true" />
                  List project
                </a>
              )}
            </div>
          </div>

          <div className="relative group animate-in fade-in slide-in-from-right duration-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
                </div>
                <div className="mx-auto w-32 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              </div>
              <div className="p-8">
                <img
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80"
                  alt="Code editor on a developer workstation"
                  className="rounded-2xl mb-8 w-full object-cover aspect-video shadow-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Featured stack</span>
                    <strong className="text-slate-900 dark:text-white">MERN, Stripe, JWT</strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Avg. listing</span>
                    <strong className="text-slate-900 dark:text-white">$102</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
