
import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../types.ts';

const CreateProjectModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [projectName, setProjectName] = useState('');
  const [appCategory, setAppCategory] = useState<'Web' | 'Mobile' | 'Software'>('Web');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const categories = [
    { id: 'Web', label: 'Web', icon: 'cloud' },
    { id: 'Mobile', label: 'Mobile', icon: 'smartphone' },
    { id: 'Software', label: 'Software', icon: 'desktop_windows' },
  ] as const;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col gap-6 animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Create New Project</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Project Name</label>
            <input 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
              placeholder="e.g. Finance Analyzer Alpha"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Application Category</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setAppCategory(cat.id)}
                  className={`flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-2 p-4 rounded-2xl border transition-all ${
                    appCategory === cat.id 
                    ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(46,255,143,0.15)]' 
                    : 'bg-white/5 border-white/10 text-text-secondary hover:border-white/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  <span className="text-xs font-bold">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dataset Upload</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">cloud_upload</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">Upload test files</p>
                <p className="text-[10px] text-text-secondary mt-1 uppercase tracking-tight">CSV, JSON, PDF</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          disabled={!projectName || files.length === 0}
          className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-background-dark font-black text-sm shadow-lg disabled:opacity-50 transition-all mt-2"
          onClick={onClose}
        >
          Initialize Infrastructure
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ role }: { role: UserRole }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marketData, setMarketData] = useState<number[]>(Array.from({ length: 60 }, () => 50 + Math.random() * 20));

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const last = prev[prev.length - 1];
        const next = Math.max(10, Math.min(95, last + (Math.random() * 6 - 3)));
        return [...prev.slice(1), next];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const creditData = {
    purchased: 10000,
    used: 7250,
    available: 2750
  };

  const stats = [
    { label: 'Tests Run', value: '1,420', trend: '85% pass rate', icon: 'science' },
    { label: 'Certifications', value: '4', trend: '+1 pending', icon: 'verified' },
    { label: 'Total Projects', value: '12', trend: '+2 this week', icon: 'folder' },
    { 
      label: 'AI Credits', 
      isCredit: true,
      icon: 'bolt' 
    },
  ];

  const projectScores = [
    { symbol: 'SB-V2', name: 'Support Bot v2', score: 98.4, change: 4.2, trend: 'up' },
    { symbol: 'FA-AL', name: 'Finance Analyzer', score: 92.1, change: 12.8, trend: 'up' },
    { symbol: 'AD-GE', name: 'Ad Creative Gen', score: 74.5, change: -1.5, trend: 'down' },
    { symbol: 'CA-PH', name: 'Code Assistant', score: 88.0, change: 0.4, trend: 'up' },
    { symbol: 'IV-MB', name: 'Inventory Mobile', score: 81.2, change: 2.1, trend: 'up' },
    { symbol: 'SY-CR', name: 'System Core', score: 96.5, change: -0.2, trend: 'down' },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto w-full overflow-x-hidden">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-white text-xl md:text-3xl font-black tracking-tight uppercase">Dashboard Control</h1>
          <p className="text-text-secondary text-[11px] md:text-sm font-medium">Global AI Testing Infrastructure • Oct 24, 2023</p>
        </div>
        <div className="grid grid-cols-2 md:flex md:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-4 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm font-bold border border-white/10 transition-colors"
          >
            <span className="material-symbols-outlined mr-2 text-[18px]">add_circle</span>
            <span className="whitespace-nowrap">Create Project</span>
          </button>
          <button className="flex items-center justify-center px-4 md:px-6 h-11 rounded-xl bg-primary hover:bg-primary-hover text-background-dark text-xs md:text-sm font-black shadow-[0_0_15px_rgba(46,255,143,0.3)] transition-all">
            <span className="material-symbols-outlined mr-2 text-[20px]">play_arrow</span>
            <span className="whitespace-nowrap">New Test Run</span>
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel rounded-2xl p-5 md:p-6 relative overflow-hidden group hover:border-primary/30 transition-all min-h-[140px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-5xl md:text-6xl text-white">{stat.icon}</span>
            </div>
            
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="material-symbols-outlined text-[16px] md:text-[18px]">{stat.icon}</span>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em]">{stat.label}</span>
              </div>

              {stat.isCredit ? (
                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl md:text-2xl font-black text-white">{creditData.available.toLocaleString()} <span className="text-[10px] text-primary">/ {creditData.purchased.toLocaleString()}</span></span>
                  </div>
                  <div className="w-full bg-white/5 h-1 md:h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-1000" 
                      style={{ width: `${(creditData.available / creditData.purchased) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-2xl md:text-3xl font-black text-white block leading-none">{stat.value}</span>
                  <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md mt-2 inline-block uppercase tracking-wider">
                    {stat.trend}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Market Chart Section */}
      <div className="glass-panel rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col gap-6 md:gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg md:text-2xl font-light text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">query_stats</span>
              Integrity Market
            </h3>
            <p className="text-text-secondary text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-normal">Real-time Global Reliability Index</p>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 self-start sm:self-center bg-black/40 p-3 rounded-xl border border-white/5">
            <div className="text-left sm:text-right">
              <p className="text-[8px] md:text-[10px] text-text-secondary font-medium uppercase tracking-widest">Index Score</p>
              <p className="text-xl md:text-3xl font-black text-primary leading-none mt-1">
                94.42 <span className="text-[10px] md:text-xs ml-1 font-bold">▲ 1.4%</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-[200px] md:h-[400px] w-full bg-black/60 rounded-xl md:rounded-2xl border border-white/5 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-[0.05] pointer-events-none">
            {Array.from({ length: 72 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/50"></div>
            ))}
          </div>

          <svg className="absolute inset-0 w-full h-full p-1" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="mainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2eff8f" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2eff8f" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M 0,${100 - marketData[0]} ${marketData.map((d, i) => `L ${(i / (marketData.length - 1)) * 100},${100 - d}`).join(' ')} V 100 H 0 Z`}
              fill="url(#mainGradient)"
              className="transition-all duration-1000 ease-in-out"
            />
            <path
              d={`M 0,${100 - marketData[0]} ${marketData.map((d, i) => `L ${(i / (marketData.length - 1)) * 100},${100 - d}`).join(' ')}`}
              fill="none"
              stroke="#2eff8f"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_6px_rgba(46,255,143,0.4)] transition-all duration-1000 ease-in-out"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h4 className="text-[10px] md:text-[11px] font-medium text-text-secondary uppercase tracking-[0.2em]">Active Project Performance</h4>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2 scroll-smooth">
            {projectScores.map((proj, i) => (
              <div key={i} className="flex-shrink-0 w-56 md:w-64 p-4 md:p-5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] md:text-[9px] font-bold text-primary uppercase block tracking-tighter">{proj.symbol}</span>
                    <h5 className="text-white text-xs md:text-sm font-bold truncate max-w-[120px] leading-tight">{proj.name}</h5>
                  </div>
                  <div className={`text-right ${proj.trend === 'up' ? 'text-primary' : 'text-red-400'}`}>
                    <span className="text-[9px] md:text-[10px] font-bold uppercase flex items-center justify-end">
                      {proj.trend === 'up' ? '▲' : '▼'} {Math.abs(proj.change)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4 mt-1">
                  <div className="flex-1">
                    <div className="w-full bg-black/40 h-1 rounded-full overflow-hidden">
                      <div className={`h-full bg-primary`} style={{ width: `${proj.score}%` }}></div>
                    </div>
                  </div>
                  <span className="text-lg md:text-2xl font-black text-white leading-none tracking-tighter">{proj.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
