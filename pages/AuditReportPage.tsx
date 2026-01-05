
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RobotScanningIcon } from '../App.tsx';

const AuditReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScanning) {
      const logMessages = [
        "Initializing AI Audit Agent...",
        "Fetching model parameters...",
        "Analyzing PHP backend logic...",
        "Scanning for PII leakage...",
        "Evaluating isolation protocols...",
        "Generating compliance matrix...",
        "Auditing performance bottlenecks...",
        "Checking for prompt injection...",
        "Finalizing audit report..."
      ];
      
      let currentLogIndex = 0;
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsScanning(false), 1200);
            return 100;
          }
          
          if (prev % 12 === 0 && currentLogIndex < logMessages.length) {
            setLogs(old => [...old, `[${new Date().toLocaleTimeString()}] ${logMessages[currentLogIndex]}`]);
            currentLogIndex++;
          }
          
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">
            <span className="material-symbols-outlined text-sm">shield_with_heart</span>
            Secure Audit Workspace
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Audit Session: {id}</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="px-4 py-2 glass-panel rounded-xl text-white text-xs font-bold hover:bg-white/10 transition-all">
            Exit Workspace
          </button>
          <button className="px-6 py-2 bg-primary text-background-dark rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(46,255,143,0.3)]">
            Export Certificate
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN - ENTERPRISE SCAN & MODULES */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Enterprise Scan Live */}
          <div className="glass-panel rounded-3xl overflow-hidden flex flex-col border-white/5 shadow-2xl h-[450px]">
            <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`size-2 rounded-full ${isScanning ? 'bg-primary animate-pulse shadow-[0_0_8px_#2eff8f]' : 'bg-primary'}`}></span>
                <span className="text-xs font-black text-white uppercase tracking-widest">Enterprise Scan Live</span>
              </div>
              <span className="text-[10px] font-mono text-primary font-bold">{progress}% COMPLETION</span>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/5">
              {/* Scan Visualization */}
              <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center relative overflow-hidden bg-[#0a110e]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(46,255,143,0.05)_0%,_transparent_70%)]"></div>
                <div className="relative size-48 flex items-center justify-center">
                   <div className={`absolute inset-0 rounded-full border-2 border-primary/10 border-t-primary ${isScanning ? 'animate-spin' : ''}`}></div>
                   <div className="relative size-32 drop-shadow-[0_0_20px_rgba(46,255,143,0.4)] flex items-center justify-center">
                     {isScanning ? (
                       <RobotScanningIcon />
                     ) : (
                       <div className="size-full flex items-center justify-center animate-in zoom-in duration-500">
                         <span className="material-symbols-outlined text-8xl text-primary drop-shadow-[0_0_20px_#2eff8f]">check_circle</span>
                       </div>
                     )}
                   </div>
                </div>
                <p className="mt-6 text-[10px] font-black text-text-secondary uppercase tracking-[0.3em]">{isScanning ? 'Integrity Protocol 01-X' : 'SCAN SUCCESSFUL'}</p>
              </div>

              {/* Live Log Stream */}
              <div className="w-full md:w-1/2 p-6 font-mono text-[10px] text-text-secondary overflow-y-auto space-y-1.5 bg-black/40">
                {logs.map((log, i) => (
                  <div key={i} className="animate-in slide-in-from-bottom-1 duration-300">
                    <span className="text-white/40">{log.split(' ')[0]}</span> {log.split(' ').slice(1).join(' ')}
                  </div>
                ))}
                {logs.length === 0 && <div className="italic opacity-30">Waiting for data stream...</div>}
                <div ref={logEndRef} />
              </div>
            </div>
          </div>

          {/* Testing Modules Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-white/5 group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">api</span>
                </div>
                {isScanning ? <span className="text-[9px] font-bold text-yellow-500 animate-pulse uppercase">Scanning</span> : <span className="material-symbols-outlined text-primary">check_circle</span>}
              </div>
              <h4 className="text-white font-bold text-sm">API Testing</h4>
              <p className="text-text-secondary text-[10px] mt-1 leading-relaxed uppercase tracking-tighter opacity-70">Endpoint Verification & Rate Limit Check</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-white/5 group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                {isScanning ? <span className="text-[9px] font-bold text-yellow-500 animate-pulse uppercase">Scanning</span> : <span className="material-symbols-outlined text-primary">check_circle</span>}
              </div>
              <h4 className="text-white font-bold text-sm">Software Testing</h4>
              <p className="text-text-secondary text-[10px] mt-1 leading-relaxed uppercase tracking-tighter opacity-70">Core Logic & Exception Handling Trace</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-white/5 group hover:border-primary/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <span className="material-symbols-outlined">gpp_maybe</span>
                </div>
                {isScanning ? <span className="text-[9px] font-bold text-yellow-500 animate-pulse uppercase">Scanning</span> : <span className="material-symbols-outlined text-red-500">cancel</span>}
              </div>
              <h4 className="text-white font-bold text-sm">Security Testing</h4>
              <p className="text-text-secondary text-[10px] mt-1 leading-relaxed uppercase tracking-tighter opacity-70">Vulnerability Probe & PII Protection</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - TECH STACK & ACTIONS */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Tech Stack Analysis */}
          <div className="glass-panel p-8 rounded-3xl border-white/5 shadow-xl">
            <h3 className="text-white font-black text-sm uppercase tracking-widest border-b border-white/5 pb-4 mb-6">Tech Stack Analysis</h3>
            
            <ul className="space-y-4">
              <li className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                    <span className="material-symbols-outlined text-lg">code</span>
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">PHP 8.2 Backend</span>
                </div>
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
              </li>

              <li className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                    <span className="material-symbols-outlined text-lg">html</span>
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">HTML5 Structure</span>
                </div>
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
              </li>

              <li className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                    <span className="material-symbols-outlined text-lg">css</span>
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">CSS3 UI Rendering</span>
                </div>
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
              </li>

              <li className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                    <span className="material-symbols-outlined text-lg">database</span>
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">Database Integrity</span>
                </div>
                {/* WRONG SYMBOL AS REQUESTED FOR FAILURE */}
                <span className="material-symbols-outlined text-red-500 text-xl font-black">cancel</span>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl space-y-2">
                 <p className="text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">warning</span> 
                   Vulnerability Detected
                 </p>
                 <p className="text-xs text-text-secondary font-medium">Core isolation fault detected in data processing layer.</p>
              </div>
            </div>
          </div>

          {/* AI Repair Agent Button */}
          <button 
            onClick={() => navigate('/fix-workspace')}
            className="w-full group relative overflow-hidden flex items-center justify-center gap-3 p-5 rounded-3xl bg-primary hover:bg-primary-hover text-background-dark transition-all duration-300 shadow-[0_20px_40px_rgba(46,255,143,0.2)] active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative material-symbols-outlined text-2xl font-black">auto_fix</span>
            <span className="relative text-xs font-black uppercase tracking-[0.2em]">Fix AI Agent</span>
          </button>

          <p className="text-center text-[10px] text-text-secondary font-medium uppercase tracking-widest opacity-40">
            Session Secured via Enterprise RSA-4096
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuditReportPage;
