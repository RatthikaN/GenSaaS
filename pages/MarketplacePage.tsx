import React from 'react';
import { Agent, UserRole } from '../types';

const MarketplacePage = ({ role }: { role: UserRole }) => {
  const agents: Agent[] = [
    { 
      id: 'saas-agent', 
      name: 'SaaS Agent', 
      description: 'Enterprise-grade auditor for cloud-native applications. Evaluates API security, multi-tenant isolation, and data encryption at rest.', 
      category: 'Cloud Security', 
      credits: 150, 
      icon: 'cloud_done', 
      color: 'text-primary',
      isPromoted: true 
    },
    { 
      id: 'mobile-agent', 
      name: 'Mobile App Agent', 
      description: 'Specialized testing suite for iOS and Android. Benchmarks UI responsiveness, battery drain, and cross-device compatibility.', 
      category: 'Mobile UX', 
      credits: 120, 
      icon: 'smartphone', 
      color: 'text-blue-400' 
    },
    { 
      id: 'software-agent', 
      name: 'Software Agent', 
      description: 'Robust performance engine for desktop and legacy systems. Monitors system resource usage, memory leaks, and binary integrity.', 
      category: 'Desktop Perf', 
      credits: 200, 
      icon: 'desktop_windows', 
      color: 'text-purple-400' 
    },
  ];

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto w-full">
      <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative min-h-[350px] flex items-center p-12 animate-in fade-in duration-700">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-10"></div>
        <div className="relative z-20 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Certified Marketplace</span>
            {role === UserRole.SELLER && <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">Seller Console</span>}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tight leading-tight">
            {role === UserRole.SELLER ? 'Manage Your AI Inventory' : 'Initialize Enterprise AI Infrastructure'}
          </h1>
          <p className="text-text-secondary text-lg mt-4 max-w-lg">
            {role === UserRole.SELLER 
              ? 'List your certified models, monitor initialization metrics, and track your royalty earnings.' 
              : 'Select specialized testing agents or production-ready models certified by the AI Lab integrity standard.'}
          </p>
          <div className="flex gap-4 mt-8">
            {role === UserRole.SELLER ? (
              <button className="bg-primary text-background-dark px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">Publish New Model</button>
            ) : (
              <button className="bg-primary text-background-dark px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">Browse All Agents</button>
            )}
            <button className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">Support Center</button>
          </div>
        </div>
      </div>

      {role === UserRole.SELLER && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2 border border-primary/10">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">Total Sales</p>
              <p className="text-3xl font-black text-white">4,210 <span className="text-xs font-normal text-text-secondary">CR</span></p>
           </div>
           <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">Active Listings</p>
              <p className="text-3xl font-black text-white">8 <span className="text-xs font-normal text-text-secondary">Models</span></p>
           </div>
           <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">Avg. Cert Score</p>
              <p className="text-3xl font-black text-primary">94.2%</p>
           </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
           <h3 className="text-xl font-black text-white flex items-center gap-3">
             <span className="material-symbols-outlined text-primary">{role === UserRole.SELLER ? 'list_alt' : 'rocket_launch'}</span>
             {role === UserRole.SELLER ? 'Your Listings' : 'Featured Infrastructure'}
           </h3>
           <div className="flex gap-2">
              <div className="relative hidden md:block">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-sm">search</span>
                 <input className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-primary w-64 placeholder-gray-600 outline-none" placeholder="Filter models..." />
              </div>
              <button className="p-2 bg-white/5 rounded-xl border border-white/10 text-white"><span className="material-symbols-outlined text-sm">filter_list</span></button>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => (
            <div key={agent.id} className="glass-panel p-6 rounded-2xl flex flex-col gap-5 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden">
              {agent.isPromoted && (
                <div className="absolute top-0 right-0 p-1 px-3 bg-primary text-background-dark text-[8px] font-black uppercase tracking-tighter rounded-bl-xl shadow-lg">
                  Promoted
                </div>
              )}
              <div className="flex justify-between items-start">
                <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                  <span className={`material-symbols-outlined text-4xl ${agent.color}`}>{agent.icon}</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-mono font-black text-xl">{agent.credits} <span className="text-[10px] text-text-secondary">CR</span></span>
                  <p className="text-[9px] text-text-secondary font-bold uppercase mt-1">One-time init</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white tracking-tight">{agent.name}</h4>
                <div className="inline-block px-2 py-0.5 rounded-lg bg-white/5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 border border-white/5">
                  {agent.category}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                  {agent.description}
                </p>
              </div>
              <div className="mt-auto pt-2 flex flex-col gap-2">
                 <button className="w-full py-3 bg-primary text-background-dark rounded-xl text-xs font-bold transition-all border border-primary/20 shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-95">
                   {role === UserRole.SELLER ? 'Edit Listing' : `Initialize ${agent.name}`}
                 </button>
                 {role === UserRole.SELLER ? (
                   <button className="w-full py-3 bg-white/5 text-white/40 rounded-xl text-[10px] font-bold uppercase border border-white/10 hover:text-red-400 hover:border-red-400/20 transition-all">
                     Unpublish Model
                   </button>
                 ) : (
                   <button className="w-full py-3 bg-white/5 text-white rounded-xl text-xs font-bold border border-white/10 hover:bg-white/10 transition-all">
                     View Audit Certificate
                   </button>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;