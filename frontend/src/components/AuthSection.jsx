import React, { useState } from 'react';
import { Loader2, LogOut, ShieldCheck, Mail, Lock, User, KeyRound } from 'lucide-react';

const AuthSection = ({ user, authMode, setAuthMode, authForm, setAuthFormValue, handleAuth, authLoading, handleLogout }) => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Mock Service: A password reset link has been dispatched to " + (authForm.email || "your email address") + ".");
  };

  if (user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

          <div className="relative mb-10 text-center">
            <span className="inline-block px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4 border border-primary-100/50 dark:border-primary-900/20">
              Account Desk
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Developer Profile
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              You are logged in and ready to access the dashboard.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-primary-600/30 shrink-0">
                {user.name?.charAt(0)?.toUpperCase() || 'D'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white text-xl tracking-tight truncate">{user.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium truncate text-sm">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded-md uppercase">
                  Active Developer {user.role === 'admin' && '• Administrator'}
                </div>
              </div>
            </div>
            <button 
              type="button" 
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 hover:border-red-100 transition-all duration-300 shadow-sm cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Sign Out Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[128px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] -z-10 animate-pulse"></div>

      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="relative mb-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4 border border-primary-100/50 dark:border-primary-900/20">
            Secure Entry
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            {authMode === 'login' ? 'Sign in to access your developer dashboard' : 'Join the marketplace community to list and buy projects'}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleAuth}>
          {/* View Toggle */}
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl mb-6 border border-slate-200/50 dark:border-slate-700/50">
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${authMode === 'login' ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-lg' : 'text-slate-500'}`}
              onClick={() => setAuthMode('login')}
            >
              LOGIN
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${authMode === 'register' ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-lg' : 'text-slate-500'}`}
              onClick={() => setAuthMode('register')}
            >
              REGISTER
            </button>
          </div>
          
          {authMode === 'register' && (
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  required
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                  value={authForm.name}
                  onChange={(e) => setAuthFormValue('name', e.target.value)}
                  placeholder="Ayush Kumar"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                <Mail size={18} />
              </div>
              <input
                required
                type="email"
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                value={authForm.email}
                onChange={(e) => setAuthFormValue('email', e.target.value)}
                placeholder="developer@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                required
                minLength="6"
                type="password"
                className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium text-slate-900 dark:text-white"
                value={authForm.password}
                onChange={(e) => setAuthFormValue('password', e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          {authMode === 'login' && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-500 dark:text-slate-400">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-primary-600 focus:ring-primary-600 accent-primary-600 cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>
              <a 
                href="#" 
                onClick={handleForgotPassword}
                className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          )}
          
          <button 
            className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-primary-600/25 disabled:opacity-50 active:scale-[0.98] mt-6 cursor-pointer" 
            disabled={authLoading} 
            type="submit"
          >
            {authLoading ? <Loader2 className="animate-spin" size={24} /> : <ShieldCheck size={24} />}
            {authMode === 'login' ? 'SECURE LOGIN' : 'CREATE ACCOUNT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthSection;
