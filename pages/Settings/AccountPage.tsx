
import React from 'react';

const AccountPage = () => {
  return (
    <div className="glass-panel rounded-3xl p-8 border-white/5 space-y-10 animate-in fade-in duration-500">
      {/* Regional Settings Section */}
      <div className="space-y-6">
        <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">public</span>
          Regional Settings
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Time Zone</label>
            <div className="relative">
              <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
                <option value="utc">UTC (Coordinated Universal Time)</option>
                <option value="pst">PST (Pacific Standard Time)</option>
                <option value="est">EST (Eastern Standard Time)</option>
                <option value="gmt">GMT (Greenwich Mean Time)</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Primary Currency</label>
            <div className="relative">
              <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
                <option value="usd">USD ($) - US Dollar</option>
                <option value="eur">EUR (€) - Euro</option>
                <option value="gbp">GBP (£) - British Pound</option>
                <option value="credits">LAB Credits (Digital Assets)</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Banking & Payouts Section */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_balance</span>
            Banking & Payouts
          </h4>
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
             <span className="text-[9px] font-black text-primary uppercase tracking-widest px-2 py-1 rounded bg-primary/10 border border-primary/20">Secure Vault</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Bank Name</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-lg">account_balance</span>
              <input 
                type="text" 
                placeholder="e.g. Chase Manhattan" 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/10" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Account Name</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-lg">badge</span>
              <input 
                type="text" 
                placeholder="e.g. Alex Morgan" 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/10" 
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Account Number</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-lg">pin</span>
              <input 
                type="text" 
                placeholder="Enter your international account number" 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm font-mono tracking-wider focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/10" 
              />
            </div>
            <div className="flex items-center gap-2 mt-2 px-1">
               <span className="material-symbols-outlined text-text-secondary text-xs">lock</span>
               <p className="text-[9px] text-text-secondary/60 font-medium uppercase tracking-tight">Financial data is end-to-end encrypted with AES-256 protocols.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
        <p className="text-[9px] text-text-secondary font-mono tracking-tighter opacity-50 uppercase">Last updated: Oct 25, 2023 at 14:22 GMT</p>
        <button className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-background-dark font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">save</span>
          Update Account
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
