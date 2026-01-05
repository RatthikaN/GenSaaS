
import React from 'react';

const AccountPage = () => {
  return (
    <div className="glass-panel rounded-3xl p-8 border-white/5 space-y-10 animate-in fade-in duration-500">
      <div className="space-y-6">
        <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">public</span>
          Regional Settings
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Time Zone</label>
            <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
              <option value="utc">UTC (Coordinated Universal Time)</option>
              <option value="pst">PST (Pacific Standard Time)</option>
              <option value="est">EST (Eastern Standard Time)</option>
              <option value="gmt">GMT (Greenwich Mean Time)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Primary Currency</label>
            <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
              <option value="usd">USD ($) - US Dollar</option>
              <option value="eur">EUR (€) - Euro</option>
              <option value="gbp">GBP (£) - British Pound</option>
              <option value="credits">LAB Credits (Digital Assets)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_balance</span>
            Banking & Payouts
          </h4>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest px-2 py-1 rounded bg-primary/10 border border-primary/20">Verified</span>
        </div>
        
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
               <span className="material-symbols-outlined text-3xl">payments</span>
             </div>
             <div>
               <p className="text-white font-bold text-sm tracking-tight">Chase Manhattan Business</p>
               <p className="text-text-secondary font-mono text-xs opacity-60">**** **** **** 8821</p>
             </div>
          </div>
          <button className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
            Edit Details
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="px-8 py-3 rounded-xl bg-primary text-background-dark font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
          Update Account
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
