
import React from 'react';

const ProfilePage = () => {
  return (
    <div className="glass-panel rounded-3xl p-8 border-white/5 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="size-32 rounded-3xl bg-slate-800 border-2 border-primary/20 overflow-hidden shadow-2xl transition-transform group-hover:scale-105">
            <img src="https://picsum.photos/seed/profile/200/200" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 size-10 rounded-xl bg-primary text-background-dark flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
            <span className="material-symbols-outlined text-lg">photo_camera</span>
          </button>
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black text-white">Alex Morgan</h3>
          <p className="text-text-secondary text-sm font-medium">Lead AI Auditor • Enterprise Lab A1</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">Certified</span>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">Top Rated</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Full Name</label>
          <input type="text" defaultValue="Alex Morgan" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Professional Title</label>
          <input type="text" defaultValue="Senior Compliance Engineer" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Biography</label>
          <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all resize-none" defaultValue="Specializing in LLM safety and architectural vulnerability assessments for enterprise financial systems." />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="px-8 py-3 rounded-xl bg-primary text-background-dark font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
