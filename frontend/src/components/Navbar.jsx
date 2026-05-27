import React, { useState } from 'react';
import { Code2, LogOut, UserRound, Shield, ShoppingCart, Trash2 } from 'lucide-react';

const Navbar = ({ user, onLogout, currentPage, setCurrentPage, cart = [], onRemoveFromCart }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            className="flex items-center gap-2 group bg-transparent border-0 cursor-pointer outline-none text-left animate-in fade-in duration-300" 
            onClick={() => user ? setCurrentPage('marketplace') : setCurrentPage('auth')}
            aria-label="Dev Marketplace home"
          >
            <div className="bg-primary-600 p-1.5 rounded-lg text-white group-hover:scale-110 transition-transform">
              <Code2 size={24} aria-hidden="true" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Dev Marketplace
            </span>
          </button>
          
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {user && (
              <>
                <button 
                  onClick={() => setCurrentPage('marketplace')}
                  className={`font-semibold text-sm transition-all cursor-pointer bg-transparent border-0 py-1 ${
                    currentPage === 'marketplace' 
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 font-extrabold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary-600'
                  }`}
                >
                  Marketplace
                </button>
                {user.role !== 'admin' && (
                  <button 
                    onClick={() => setCurrentPage('projects')}
                    className={`font-semibold text-sm transition-all cursor-pointer bg-transparent border-0 py-1 ${
                      currentPage === 'projects' 
                        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 font-extrabold' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-primary-600'
                    }`}
                  >
                    My Projects
                  </button>
                )}
                {user.role === 'admin' && (
                  <button 
                    onClick={() => setCurrentPage('admin')}
                    className={`font-semibold text-sm transition-all cursor-pointer bg-transparent border-0 py-1 flex items-center gap-1.5 ${
                      currentPage === 'admin' 
                        ? 'text-red-500 border-b-2 border-red-500 font-extrabold' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-red-500'
                    }`}
                  >
                    <Shield size={14} />
                    Admin Panel
                  </button>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {/* Cart Button with Count Badge */}
            {user && user.role !== 'admin' && (
              <div className="relative">
                <button
                  onClick={() => setCartOpen(!cartOpen)}
                  className="relative p-2.5 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer bg-transparent border-0 outline-none flex items-center transition-colors"
                  title="View Shopping Cart"
                >
                  <ShoppingCart size={20} />
                  {cart.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center px-2 py-1 text-[9px] font-black leading-none text-white bg-primary-600 rounded-full transform translate-x-1/2 -translate-y-1/2 shadow-lg shadow-primary-600/30 animate-in zoom-in duration-300">
                      {cart.length}
                    </span>
                  )}
                </button>

                {/* Dropdown Drawer */}
                {cartOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 z-[100] animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Shopping Cart</h4>
                      <span className="text-xs font-bold text-slate-400">{cart.length} item(s)</span>
                    </div>

                    <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item._id} className="flex items-center gap-3">
                          <div className="w-10 h-8 rounded bg-slate-50 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-100 dark:border-slate-700">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${item.price}</p>
                          </div>
                          <button
                            onClick={() => onRemoveFromCart(item._id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer border-0 bg-transparent"
                            title="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      {cart.length === 0 && (
                        <p className="text-center text-xs text-slate-400 py-6">Your cart is empty</p>
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-slate-500">Subtotal:</span>
                          <span className="font-black text-slate-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentPage('checkout');
                            setCartOpen(false);
                          }}
                          className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl text-xs font-black tracking-wider transition-all cursor-pointer border-0 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                        >
                          PROCEED TO CHECKOUT
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {user ? (
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 pl-3 pr-1 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in duration-300">
                <button 
                  onClick={() => setCurrentPage('auth')}
                  className={`text-xs font-semibold px-1 py-1 rounded transition-colors cursor-pointer bg-transparent border-0 outline-none ${
                    currentPage === 'auth' 
                      ? 'text-primary-600 font-extrabold' 
                      : 'text-slate-700 dark:text-slate-200 hover:text-primary-600'
                  }`}
                  title="View Profile"
                >
                  {user.name}
                </button>
                <button 
                  onClick={onLogout}
                  className="p-1.5 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors cursor-pointer border-0 bg-transparent"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('auth')} 
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary-600/20 cursor-pointer border-0 text-sm"
              >
                <UserRound size={18} />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
