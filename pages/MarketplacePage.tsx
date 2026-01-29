
import React from 'react';
import { Agent, UserRole } from '../types';

const MarketplacePage = ({ role }: { role: UserRole }) => {
  const agents: Agent[] = [
    { 
      id: 'saas-agent', 
      name: 'SaaS Agent', 
      description: 'Enterprise-grade auditor for cloud-native applications. Evaluates API security and multi-tenant isolation.', 
      category: 'Cloud Security', 
      credits: 150, 
      icon: 'cloud_done', 
      color: 'text-primary',
      isPromoted: true 
    },
    { 
      id: 'mobile-agent', 
      name: 'Mobile App Agent', 
      description: 'Specialized testing suite for iOS and Android. Benchmarks UI and battery drain.', 
      category: 'Mobile UX', 
      credits: 120, 
      icon: 'smartphone', 
      color: 'text-blue-400' 
    },
    { 
      id: 'software-agent', 
      name: 'Software Agent', 
      description: 'Robust performance engine for desktop. Monitors system resource usage and leaks.', 
      category: 'Desktop Perf', 
      credits: 200, 
      icon: 'desktop_windows', 
      color: 'text-purple-400' 
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 md:space-y-12 max-w-[1600px] mx-auto w-full">
      <div className="rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative min-h-[300px] md:min-h-[400px] flex items-center p-8 md:p-12 animate-in fade-in duration-700">
        <div className="absolute inset-0 bg-cover bg-center z-0 opacity-40 md:opacity-100" style={{backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-transparent z-10"></div>
        <div className="relative z-20 max-w-2xl space-y-4 md:space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/20">Marketplace</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Certified AI Infrastructure
          </h1>
          <p className="text-text-secondary text-sm md:text-lg max-w-lg leading-relaxed">
            Initialize production-ready models certified by the GenSaaS Test Lab standard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="bg-primary text-background-dark px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all text-xs uppercase tracking-widest">Browse Agents</button>
            <button className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all text-xs uppercase tracking-widest">Support</button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
           <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
             <span className="material-symbols-outlined text-primary">rocket_launch</span>
             Featured Agents
           </h3>
           <div className="hidden sm:flex gap-2">
              <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-sm">search</span>
                 <input className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-[10px] focus:ring-primary w-48 outline-none" placeholder="Filter..." />
              </div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {agents.map(agent => (
            <div key={agent.id} className="glass-panel p-5 md:p-6 rounded-[2rem] flex flex-col gap-6 group hover:border-primary/30 transition-all relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="size-14 md:size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <span className={`material-symbols-outlined text-3xl md:text-4xl ${agent.color}`}>{agent.icon}</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-mono font-black text-lg md:text-xl">{agent.credits} <span className="text-[10px] text-text-secondary">CR</span></span>
                  <p className="text-[8px] text-text-secondary font-bold uppercase mt-1">Init Cost</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg md:text-xl font-black text-white tracking-tight">{agent.name}</h4>
                <div className="inline-block px-2 py-0.5 rounded-lg bg-white/5 text-[9px] text-gray-400 font-bold uppercase tracking-widest border border-white/5">
                  {agent.category}
                </div>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {agent.description}
                </p>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                 <button className="w-full py-3 bg-primary text-background-dark rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                   Initialize
                 </button>
                 <button className="w-full py-3 bg-white/5 text-white/60 rounded-xl text-[9px] font-black uppercase border border-white/10 hover:text-white transition-all">
                   View Certificate
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
