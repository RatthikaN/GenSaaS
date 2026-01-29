
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RobotScanningIcon } from '../App.tsx';

interface TestPhase {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const AuditReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const testPhases: TestPhase[] = [
    { id: 'api', name: 'API Integrity', description: 'Real-time endpoint security & authorization handshake audit.', icon: 'api' },
    { id: 'logic', name: 'Software Logic', description: 'Functional branch analysis and core architectural logic validation.', icon: 'terminal' },
    { id: 'security', name: 'Security Probe', description: 'Deep-packet inspection for PII leaks and vulnerability vectors.', icon: 'gpp_maybe' },
    { id: 'data', name: 'Data Compliance', description: 'Multi-tenant isolation check and regulatory data residency audit.', icon: 'database' },
  ];

  useEffect(() => {
    const logMessages = [
      "Initializing core lab environment...",
      "Analyzing architecture nodes...",
      "Verifying security handshake...",
      "Injecting audit telemetry...",
      "Simulating threat vectors...",
      "Finalizing integrity report...",
      "Deployment ready."
    ];
    let logIdx = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        if (prev % 15 === 0 && logIdx < logMessages.length) {
          setLogs(old => [...old, `[${new Date().toLocaleTimeString()}] ${logMessages[logIdx]}`]);
          logIdx++;
        }
        return prev + 1;
      });
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">
            <span className="material-symbols-outlined text-sm">shield_with_heart</span>
            Audit Workspace
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-none">Session: {id}</h1>
        </div>
        <button 
          onClick={() => navigate('/projects')} 
          className="w-full sm:w-auto px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
        >
          Abort Session
        </button>
      </header>

      {/* Main Consolidated Audit Module */}
      <div className="glass-panel rounded-[2.5rem] overflow-hidden flex flex-col border-primary/10 shadow-[0_30px_90px_rgba(0,0,0,0.6)] min-h-[720px] relative">
        
        {/* Unitary Header */}
        <div className="bg-white/[0.04] px-6 md:px-10 py-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <div className="size-3 rounded-full bg-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]"></div>
              <div className="size-3 rounded-full bg-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.3)]"></div>
              <div className="size-3 rounded-full bg-primary shadow-[0_0_20px_rgba(46,255,143,0.5)] animate-pulse"></div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-[12px] font-black text-white uppercase tracking-[0.3em]">Live Integrity Stream</span>
              <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mt-0.5 opacity-60">Autonomous Auditor Engine v4.0.1_R3</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-black/40 px-6 py-3.5 rounded-2xl border border-white/10 shadow-inner">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">System Global Health</span>
              <span className="text-2xl font-mono font-black text-white leading-none">{progress}%</span>
            </div>
            <div className="w-32 md:w-48 bg-white/5 h-2 rounded-full overflow-hidden border border-white/10 relative">
              <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
              <div className="h-full bg-primary shadow-[0_0_20px_#2eff8f] transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Column A: Telemetry & Logs */}
          <div className="w-full lg:w-[60%] flex flex-col divide-y divide-white/5 border-r border-white/5">
            {/* Visualizer Module */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 relative bg-[#060c09]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(46,255,143,0.06)_0%,_transparent_70%)] pointer-events-none"></div>
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
              
              <div className="relative size-60 md:size-80 flex items-center justify-center">
                {/* Outer Rings */}
                <div className={`absolute inset-0 rounded-full border-[2px] border-primary/5 border-t-primary/40 shadow-[0_0_40px_rgba(46,255,143,0.1)] ${progress < 100 ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}></div>
                <div className={`absolute inset-4 rounded-full border-[1px] border-primary/5 border-b-primary/30 ${progress < 100 ? 'animate-spin' : ''}`} style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-8 rounded-full border border-white/5 bg-black/40 backdrop-blur-md"></div>
                
                {/* Central Scan Icon */}
                <div className="relative size-44 md:size-56 drop-shadow-[0_0_50px_rgba(46,255,143,0.35)] transition-transform duration-500 hover:scale-105">
                  <RobotScanningIcon />
                </div>

                {/* Status Badges on Visualizer */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary/10 border border-primary/40 rounded-full text-[9px] font-black text-primary uppercase tracking-[0.3em] backdrop-blur-xl animate-bounce">
                  Scanning_Phase_{Math.floor(progress/25) + 1}
                </div>
              </div>
            </div>

            {/* Terminal Feed Module */}
            <div className="h-[300px] bg-black/80 p-8 font-mono text-[10px] text-text-secondary overflow-y-auto space-y-3 relative">
              <div className="sticky top-0 right-0 flex justify-between items-center bg-black/80 backdrop-blur-md pb-3 mb-1 border-b border-white/5">
                <span className="text-[9px] font-black text-primary/60 uppercase tracking-[0.3em]">Telemetry_Buffer_0x4421</span>
                <span className="text-[8px] font-bold text-white/20 uppercase">Source: CORE_NODE_A1</span>
              </div>
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-bottom-2 duration-500 flex gap-5 group">
                  <span className="text-primary/40 shrink-0 font-bold tabular-nums">[{log.split(' ')[0]}]</span>
                  <span className="text-white/70 group-hover:text-white transition-colors leading-relaxed tracking-tight">{log.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          {/* Column B: Verification Sequence (Right Sidebar) */}
          <div className="w-full lg:w-[40%] flex flex-col bg-white/[0.02]">
            <div className="p-8 border-b border-white/5 bg-white/[0.04]">
              <h3 className="text-[13px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                Audit Sequence
              </h3>
            </div>

            <div className="flex-1 flex flex-col divide-y divide-white/5">
              {testPhases.map((phase, idx) => {
                const phaseThreshold = (idx + 1) * 25;
                const isDone = progress >= phaseThreshold;
                const isActive = progress >= (idx * 25) && progress < phaseThreshold;
                
                return (
                  <div 
                    key={phase.id} 
                    className={`px-8 py-8 flex items-start gap-6 transition-all duration-700 relative group border-r-4 ${
                      isDone ? 'bg-primary/[0.04] border-primary/40' : 
                      isActive ? 'bg-white/[0.05] border-primary/20 animate-pulse' : 'border-transparent'
                    }`}
                  >
                    {/* Visual active indicator bar */}
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_15px_#2eff8f]"></div>}

                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded border transition-all ${
                          isDone ? 'bg-primary/20 border-primary/40 text-primary' : 
                          isActive ? 'bg-white/20 border-white/30 text-white' : 'bg-white/5 border-transparent text-text-secondary opacity-40'
                        }`}>
                          Step 0{idx + 1}
                        </span>
                        {isDone && (
                          <span className="text-[10px] font-black text-primary uppercase tracking-[0.1em] flex items-center gap-2 animate-in fade-in slide-in-from-left-4">
                            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_#2eff8f]"></span>
                            Integrity Verified
                          </span>
                        )}
                      </div>
                      
                      <h4 className={`text-base font-black uppercase tracking-tight transition-colors ${isDone ? 'text-primary' : 'text-white'}`}>
                        {phase.name}
                      </h4>
                      
                      <p className={`text-[11px] leading-relaxed transition-all ${isDone ? 'text-text-secondary/60' : 'text-text-secondary'}`}>
                        {phase.description}
                      </p>
                    </div>

                    {/* Status Mark */}
                    <div className="shrink-0 flex items-center justify-center pt-2">
                      {isDone ? (
                        <div className="size-11 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_25px_rgba(46,255,143,0.3)] animate-in zoom-in duration-500 scale-110">
                          <span className="material-symbols-outlined text-[26px] font-black">check_circle</span>
                        </div>
                      ) : isActive ? (
                        <div className="relative size-10 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-xl border-2 border-primary/10 border-t-primary animate-spin"></div>
                          <span className="material-symbols-outlined text-[18px] text-primary/60">sync</span>
                        </div>
                      ) : (
                        <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10">
                          <span className="material-symbols-outlined text-[20px]">{phase.icon}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Build Footer inside panel */}
            <div className="p-8 bg-black/40 border-t border-white/10 space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Deployment Readiness</span>
                  <p className="text-xl font-black text-white tracking-tight">{progress === 100 ? 'Audit Phase Complete' : 'Validating Architecture...'}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border transition-all ${
                    progress === 100 ? 'bg-primary/20 text-primary border-primary/40 shadow-[0_0_20px_rgba(46,255,143,0.2)]' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/40'
                  }`}>
                    {progress === 100 ? 'CERTIFIED' : 'ANALYZING'}
                  </span>
                </div>
              </div>
              
              <button 
                disabled={progress < 100}
                onClick={() => navigate(`/certificate/${id}`)}
                className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-primary hover:bg-primary-hover text-background-dark disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed transition-all shadow-[0_20px_60px_rgba(46,255,143,0.25)] active:scale-[0.98] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="material-symbols-outlined text-2xl font-black group-hover:rotate-12 transition-transform">workspace_premium</span>
                <span className="text-xs font-black uppercase tracking-[0.3em]">Generate Lab Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auxiliary Statistics Bar - Now streamlined */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Latency Pulse', value: '4.2ms', trend: 'OPTIMAL', icon: 'speed', color: 'text-primary' },
          { label: 'Compute Unit', value: '94.8%', trend: 'LOADED', icon: 'memory', color: 'text-blue-400' },
          { label: 'Threat Vector', value: 'Zero', trend: 'SECURE', icon: 'gpp_good', color: 'text-primary' },
          { label: 'Data Buffer', value: '12.4GB', trend: 'STAGED', icon: 'layers', color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl border-white/5 flex items-center gap-4 group hover:bg-white/[0.03] transition-all">
            <div className={`size-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:bg-white/10 transition-all`}>
              <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-white font-black text-lg tracking-tight leading-none">{stat.value}</p>
              <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest mt-1">{stat.label} • {stat.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditReportPage;
