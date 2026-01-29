
import React, { useState, useEffect, useRef } from 'react';
import { UserRole } from '../types.ts';

const ProjectUploadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [projectName, setProjectName] = useState('');
  const [infraType, setInfraType] = useState('Web');
  const [maxSize, setMaxSize] = useState(500);
  const [isStarting, setIsStarting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleStartNow = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsStarting(false);
      onClose();
    }, 2000);
  };

  const infraTypes = [
    { id: 'Web', label: 'Web', icon: 'cloud' },
    { id: 'Mobile', label: 'Mobile', icon: 'smartphone' },
    { id: 'Software', label: 'Software', icon: 'desktop_windows' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden flex flex-col gap-6 md:gap-8 animate-in fade-in zoom-in duration-300 max-h-[95vh] overflow-y-auto border-primary/20 shadow-[0_0_50px_rgba(46,255,143,0.1)]">
        
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Upload Project</h3>
            <p className="text-text-secondary text-[10px] font-medium uppercase tracking-widest">Configure Infrastructure Test Lab</p>
          </div>
          <button onClick={onClose} className="size-9 md:size-10 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <div className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">Project Name</label>
            <input 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-white text-sm focus:border-primary transition-all outline-none" 
              placeholder="e.g. Finance Analyzer Alpha"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">Infrastructure Type</label>
            <div className="grid grid-cols-3 gap-3">
              {infraTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setInfraType(type.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    infraType === type.id 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{type.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">Dataset Deployment</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[4/1] bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/40 transition-all group"
            >
              <input type="file" ref={fileInputRef} className="hidden" />
              <span className="material-symbols-outlined text-3xl text-white/20 group-hover:text-primary transition-colors">cloud_upload</span>
              <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Upload test files</p>
            </div>
          </div>

          <div className="space-y-4 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-end">
               <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Max Allowed File Size</label>
               <div className="text-right">
                  <span className="text-xl font-black text-primary">{maxSize}</span>
                  <span className="text-[10px] font-black text-primary uppercase ml-1">MB</span>
               </div>
            </div>
            <input 
              type="range" 
              min="10" 
              max="5000" 
              step="10"
              value={maxSize}
              onChange={(e) => setMaxSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        <button 
          onClick={handleStartNow}
          disabled={!projectName || isStarting}
          className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-primary hover:bg-primary-hover text-background-dark font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(46,255,143,0.2)] transition-all flex items-center justify-center gap-2 md:gap-3 active:scale-95 mt-2"
        >
          {isStarting ? "Initializing..." : "Start Now"}
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ role }: { role: UserRole }) => {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [marketData, setMarketData] = useState<number[]>(Array.from({ length: 60 }, () => 50 + Math.random() * 20));

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const last = prev[prev.length - 1];
        const next = Math.max(10, Math.min(95, last + (Math.random() * 6 - 3)));
        return [...prev.slice(1), next];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const creditData = { purchased: 10000, used: 7250, available: 2750 };

  const stats = [
    { label: 'Tests Run', value: '1,420', trend: '85% pass', icon: 'science' },
    { label: 'Certified', value: '4', trend: '+1 pending', icon: 'verified' },
    { label: 'Projects', value: '12', trend: '+2 week', icon: 'folder' },
    { label: 'AI Credits', isCredit: true, icon: 'bolt' },
  ];

  const projectScores = [
    { symbol: 'SB-V2', name: 'Support Bot v2', score: 98.4, change: 4.2, trend: 'up' },
    { symbol: 'FA-AL', name: 'Finance Analyzer', score: 92.1, change: 12.8, trend: 'up' },
    { symbol: 'AD-GE', name: 'Ad Creative Gen', score: 74.5, change: -1.5, trend: 'down' },
    { symbol: 'CA-PH', name: 'Code Assistant', score: 88.0, change: 0.4, trend: 'up' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-10 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-white text-xl md:text-3xl font-black tracking-tight uppercase">Dashboard Control</h1>
          <p className="text-text-secondary text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] mt-1">Infrastructure Hub • Oct 24, 2023</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsTestModalOpen(true)}
            className="flex items-center justify-center px-4 h-11 md:h-12 rounded-xl md:rounded-2xl bg-primary hover:bg-primary-hover text-background-dark text-[10px] md:text-xs font-black shadow-[0_0_15px_rgba(46,255,143,0.3)] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined mr-2 text-[18px] md:text-[20px]">play_arrow</span>
            <span className="whitespace-nowrap">Test Now</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel rounded-2xl p-4 md:p-6 relative overflow-hidden group hover:border-primary/30 transition-all flex flex-col justify-between min-h-[120px] md:min-h-[150px]">
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-4xl md:text-6xl text-white">{stat.icon}</span>
            </div>
            
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-[16px] md:text-[18px]">{stat.icon}</span>
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
              </div>

              {stat.isCredit ? (
                <div className="space-y-2 md:space-y-3">
                  <span className="text-lg md:text-2xl font-black text-white">{creditData.available.toLocaleString()}</span>
                  <div className="w-full bg-white/5 h-1 md:h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-1000" style={{ width: '27%' }}></div>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-xl md:text-3xl font-black text-white block leading-none">{stat.value}</span>
                  <span className="text-[8px] font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded mt-2 inline-block uppercase">{stat.trend}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        <div className="xl:col-span-2 glass-panel rounded-3xl p-5 md:p-8 flex flex-col gap-6 md:gap-8 shadow-2xl relative overflow-hidden min-h-[400px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <h3 className="text-lg md:text-2xl font-black text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">query_stats</span>
                Global Index
              </h3>
              <p className="text-text-secondary text-[8px] md:text-[9px] uppercase tracking-[0.2em]">Real-time Market Reliability</p>
            </div>
            <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5 text-right">
              <p className="text-[18px] md:text-2xl font-black text-primary leading-none">94.42 <span className="text-[10px] ml-1">▲ 1.4%</span></p>
            </div>
          </div>

          <div className="relative flex-1 bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full p-1" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path
                d={`M 0,${100 - marketData[0]} ${marketData.map((d, i) => `L ${(i / (marketData.length - 1)) * 100},${100 - d}`).join(' ')} V 100 H 0 Z`}
                fill="rgba(46, 255, 143, 0.05)"
              />
              <path
                d={`M 0,${100 - marketData[0]} ${marketData.map((d, i) => `L ${(i / (marketData.length - 1)) * 100},${100 - d}`).join(' ')}`}
                fill="none"
                stroke="#2eff8f"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h4 className="text-[10px] md:text-[11px] font-black text-text-secondary uppercase tracking-widest">Performance Matrix</h4>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Active</span>
          </div>
          <div className="space-y-4">
            {projectScores.map((proj, i) => (
              <div key={i} className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] font-black text-primary uppercase block tracking-tighter">{proj.symbol}</span>
                    <h5 className="text-white text-xs font-bold truncate max-w-[140px]">{proj.name}</h5>
                  </div>
                  <span className={`text-[10px] font-bold ${proj.trend === 'up' ? 'text-primary' : 'text-red-400'}`}>
                    {proj.trend === 'up' ? '▲' : '▼'} {Math.abs(proj.change)}%
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1 h-1 bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${proj.score}%` }}></div>
                  </div>
                  <span className="text-xl font-black text-white leading-none tracking-tighter">{proj.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProjectUploadModal isOpen={isTestModalOpen} onClose={() => setIsTestModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
