import React, { useState, useMemo } from 'react';
import { ShoppingBag, CreditCard, ShieldCheck, MapPin, Truck, CheckCircle2, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

const CheckoutPage = ({ cart, onPlaceOrder, onNavigate }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [cart]);

  const processingFee = cart.length > 0 ? 4.99 : 0;
  const total = subtotal + processingFee;

  const handleInputChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    try {
      // Execute the database project duplication calls for all cart items
      await onPlaceOrder(cart);

      // Generate a mock Order ID
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setOrderId(`ORD-${randomId}`);
      setConfirmed(true);
    } catch (err) {
      alert("Order placement failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. Order Confirmation View
  if (confirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-10 sm:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-600/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

          <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100 dark:border-emerald-900/20">
            <CheckCircle2 size={48} className="animate-bounce" />
          </div>

          <span className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4 border border-emerald-100/50 dark:border-emerald-900/20">
            Payment Captured
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            Order Confirmed!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-sm">
            Thank you for your purchase. Your payment has been processed and codebase templates have been added to your workstation.
          </p>

          {/* Receipt Box */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 max-w-md mx-auto mb-10 text-left space-y-3 font-medium">
            <div className="flex justify-between text-xs text-slate-400 uppercase tracking-widest font-black">
              <span>Receipt Detail</span>
              <span>Invoice</span>
            </div>
            <div className="h-px bg-slate-200 dark:bg-slate-700/80"></div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Order ID:</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Total Paid:</span>
              <span className="font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Customer:</span>
              <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{form.name}</span>
            </div>
          </div>

          {/* Page Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('marketplace')}
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-6 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer text-sm"
            >
              Browse Marketplace
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary-600/25 cursor-pointer text-sm"
            >
              <span>Track in My Projects</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Checkout Sequence Form View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <button 
        onClick={() => onNavigate('marketplace')}
        className="mb-8 inline-flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary-600 transition-colors cursor-pointer bg-transparent border-0"
      >
        ← Back to Marketplace
      </button>

      <div className="grid lg:grid-cols-3 gap-10">
        
        {/* Form Details Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          
          {/* Card 1: Billing / Shipping */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Shipping & Billing Address</h3>
                <p className="text-xs text-slate-400">Where we should invoice your order.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Jane Developer"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Billing Email</label>
                <input
                  required
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                <input
                  required
                  type="text"
                  placeholder="123 Developer St"
                  value={form.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                <input
                  required
                  type="text"
                  placeholder="San Francisco"
                  value={form.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
                  <input
                    required
                    type="text"
                    placeholder="CA"
                    maxLength="2"
                    value={form.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white text-center"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Zip Code</label>
                  <input
                    required
                    type="text"
                    placeholder="94103"
                    value={form.zip}
                    onChange={(e) => handleInputChange('zip', e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Secure Payment */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Secure Credit Card</h3>
                <p className="text-xs text-slate-400">Transactions are encrypted and secure.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                <input
                  required
                  type="text"
                  placeholder="4111 2222 3333 4444"
                  maxLength="19"
                  value={form.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                  <input
                    required
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={form.expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white text-center"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">CVV / CVC</label>
                  <input
                    required
                    type="password"
                    placeholder="•••"
                    maxLength="4"
                    value={form.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-bold text-slate-900 dark:text-white text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Order Summary Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <ShoppingBag size={20} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Order Summary</h3>
            </div>

            {/* List of Cart Items */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[220px] overflow-y-auto pr-1 mb-6 space-y-3">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 pt-3 items-center first:pt-0">
                  <div className="w-12 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{item.category}</span>
                  </div>
                  <span className="font-bold text-sm text-slate-950 dark:text-slate-200">
                    ${(item.price || 0).toFixed(2)}
                  </span>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-center text-sm text-slate-400 py-6">Your shopping cart is empty.</p>
              )}
            </div>

            {/* Subtotal + Fees */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3 font-medium text-sm text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee</span>
                <span className="font-bold text-slate-900 dark:text-white">${processingFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
              <div className="flex justify-between text-base text-slate-900 dark:text-white font-extrabold">
                <span>Total Cost</span>
                <span className="text-primary-600 dark:text-primary-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || cart.length === 0}
              className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-primary-600/25 disabled:opacity-50 mt-8 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>PROCESSING PAYMENT...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={24} />
                  <span>PLACE ORDER & PAY NOW</span>
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
              <ShieldCheck className="text-emerald-500 w-3.5 h-3.5" />
              <span>256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
