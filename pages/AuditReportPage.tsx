
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
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest mb-1">
            <span className="material-symbols-outlined text-sm">shield_with_heart</span>
            Audit Workspace
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-none">Session: {id}</h1>
        </div>
        <button onClick={() => navigate('/projects')} className="w-full sm:w-auto px-6 py-2 bg-primary text-background-dark rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
          Exit Audit
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Unitary Audit Module */}
        <div className="xl:col-span-12 glass-panel rounded-[2.5rem] overflow-hidden flex flex-col border-primary/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] min-h-[700px] relative">
          
          {/* Header Area */}
          <div className="bg-white/[0.03] px-8 py-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
                <div className="size-3 rounded-full bg-yellow-500/40 shadow-[0_0_10px_rgba(234,179,8,0.3)]"></div>
                <div className="size-3 rounded-full bg-primary/60 shadow-[0_0_15px_rgba(46,255,143,0.5)] animate-pulse"></div>
              </div>
              <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Live Integrity Stream</span>
                <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">Autonomous Auditor Engine v4.0.1</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 bg-black/40 px-6 py-3 rounded-2xl border border-white/5">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Global Health</span>
                <span className="text-2xl font-mono font-black text-white leading-none">{progress}%</span>
              </div>
              <div className="w-32 bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-primary shadow-[0_0_15px_#2eff8f]" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-black/20">
            {/* Left Column: Visualizer & Logs */}
            <div className="w-full lg:w-[55%] flex flex-col divide-y divide-white/5 border-r border-white/5">
              {/* Visualizer Display */}
              <div className="flex-1 flex flex-col items-center justify-center p-12 relative bg-black/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(46,255,143,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
                <div className="relative size-56 md:size-72 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full border-[2px] border-primary/5 border-t-primary/60 shadow-[0_0_30px_rgba(46,255,143,0.1)] ${progress < 100 ? 'animate-spin' : ''}`}></div>
                  <div className="absolute inset-6 rounded-full border border-white/5 bg-black/20"></div>
                  <div className="relative size-40 md:size-52 drop-shadow-[0_0_40px_rgba(46,255,143,0.3)]">
                    <RobotScanningIcon />
                  </div>
                  {/* Scanning HUD elements */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg text-[8px] font-black text-primary uppercase tracking-[0.3em]">
                    Scanning_Active
                  </div>
                </div>
              </div>

              {/* Console Logs Feed */}
              <div className="h-[280px] bg-black/60 p-8 font-mono text-[10px] text-text-secondary overflow-y-auto space-y-3 relative group">
                <div className="sticky top-0 right-0 flex justify-between items-center bg-black/60 backdrop-blur-sm pb-2 mb-2">
                  <span className="text-[8px] font-black text-primary/40 uppercase tracking-[0.2em]">Secure_Telemetry_Feed</span>
                  <span className="text-[8px] font-mono text-white/20">Buffer_01_Active</span>
                </div>
                {logs.map((log, i) => (
                  <div key={i} className="animate-in slide-in-from-bottom-2 duration-400 flex gap-4 border-l-2 border-transparent hover:border-primary/20 pl-2 transition-all">
                    <span className="text-primary/30 shrink-0 font-bold">{log.split(' ')[0]}</span>
                    <span className="text-white/60 tracking-tight leading-relaxed">{log.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>

            {/* Right Column: Verification Progress Checklist */}
            <div className="w-full lg:w-[45%] flex flex-col bg-white/[0.01]">
              <div className="p-8 border-b border-white/5 bg-white/[0.03]">
                <h3 className="text-[12px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">checklist</span>
                  Verification Checklist
                </h3>
              </div>

              <div className="flex-1 flex flex-col divide-y divide-primary/5">
                {testPhases.map((phase, idx) => {
                  const phaseThreshold = (idx + 1) * 25;
                  const isDone = progress >= phaseThreshold;
                  const isActive = progress >= (idx * 25) && progress < phaseThreshold;
                  
                  return (
                    <div 
                      key={phase.id} 
                      className={`px-8 py-7 flex items-start gap-6 transition-all duration-700 relative group border-l-4 ${
                        isDone ? 'bg-primary/[0.03] border-primary/40' : 
                        isActive ? 'bg-white/[0.04] border-primary/20' : 'border-transparent'
                      }`}
                    >
                      {/* Technical Detail Group */}
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${
                            isDone ? 'bg-primary/10 border-primary/30 text-primary' : 
                            isActive ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-transparent text-text-secondary'
                          }`}>
                            Step 0{idx + 1}
                          </span>
                          {isDone && (
                            <span className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2">
                              <span className="size-1 rounded-full bg-primary animate-pulse"></span>
                              Integrity Verified
                            </span>
                          )}
                        </div>
                        
                        <h4 className={`text-base font-black uppercase tracking-tight transition-colors ${isDone ? 'text-primary' : 'text-white'}`}>
                          {phase.name}
                        </h4>
                        
                        <p className={`text-[11px] leading-relaxed transition-opacity ${isDone ? 'text-text-secondary/70' : 'text-text-secondary'}`}>
                          {phase.description}
                        </p>
                      </div>

                      {/* Status Indicator Group */}
                      <div className="shrink-0 flex items-center justify-center pt-2">
                        {isDone ? (
                          <div className="size-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(46,255,143,0.3)] animate-in zoom-in duration-500">
                            <span className="material-symbols-outlined text-[24px] font-black">check_circle</span>
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

              {/* Build Action Footer */}
              <div className="p-8 bg-black/40 border-t border-white/10 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Certification Readiness</span>
                    <p className="text-xl font-black text-white">{progress === 100 ? 'Audit Phase 01 Completed' : 'Analyzing Nodes...'}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                      progress === 100 ? 'bg-primary/20 text-primary border-primary/30' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                    }`}>
                      {progress === 100 ? 'SECURE' : 'PENDING'}
                    </span>
                  </div>
                </div>
                
                <button 
                  disabled={progress < 100}
                  onClick={() => navigate(`/certificate/${id}`)}
                  className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-primary hover:bg-primary-hover text-background-dark disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed transition-all shadow-[0_20px_50px_rgba(46,255,143,0.2)] active:scale-95 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="material-symbols-outlined text-2xl font-black">workspace_premium</span>
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Issue Lab Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Stats Bar */}
        <div className="xl:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Latency Node', value: '4ms', trend: 'STABLE', icon: 'speed' },
            { label: 'Compute Unit', value: '92%', trend: 'OPTIMAL', icon: 'memory' },
            { label: 'Traffic Hub', value: '4.2k/s', trend: 'ACTIVE', icon: 'hub' },
            { label: 'VRAM Buffer', value: '12GB', trend: 'ALLOCATED', icon: 'layers' },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border-white/5 flex flex-col items-center justify-center text-center gap-1 group">
              <span className="material-symbols-outlined text-primary/40 text-xl group-hover:text-primary transition-colors">{stat.icon}</span>
              <p className="text-white font-black text-lg tracking-tight leading-none mt-1">{stat.value}</p>
              <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{stat.label} • {stat.trend}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditReportPage;
