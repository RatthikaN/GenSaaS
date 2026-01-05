
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const TestExecutionPage = () => {
  const { id } = useParams();
  const [logs, setLogs] = useState<string[]>([
    "[10:02:15] INFO: Initializing test environment...",
    "[10:02:16] INFO: Loading security policies...",
    "[10:02:22] WARN: Jitter detected on remote node (240ms).",
  ]);
  const [progress, setProgress] = useState(32);
  const [creditsConsumed, setCreditsConsumed] = useState(0);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
      setCreditsConsumed(prev => prev + Math.floor(Math.random() * 5) + 2);
      
      const newLogs = [
        `[${new Date().toLocaleTimeString()}] INFO: Running agent sequence...`,
        `[${new Date().toLocaleTimeString()}] ACTION: Dispatching payload to #endpoint-v4`,
        `[${new Date().toLocaleTimeString()}] SUCCESS: Handshake verified.`,
        `[${new Date().toLocaleTimeString()}] CREDIT: Audit step consumed resource.`,
      ];
      setLogs(prev => [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]].slice(-100));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="p-4 md:p-8 flex flex-col h-screen overflow-hidden gap-6 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 glass-panel rounded-2xl p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#13ecb6]"></span>
            <p className="text-primary text-sm font-bold uppercase tracking-widest">Live Execution</p>
          </div>
          <h1 className="text-white text-3xl font-bold tracking-tight">Execution ID: {id}-X</h1>
          <p className="text-text-secondary text-base">Scenario: <span className="text-white font-medium">Security Perimeter Audit (v2.4)</span></p>
        </div>
        
        {/* Live Credit Consumption Widget */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-tighter">Current Usage</span>
            <div className="flex items-center gap-1.5">
               <span className="material-symbols-outlined text-primary text-lg">token</span>
               <span className="text-xl font-mono font-bold text-white">{creditsConsumed}</span>
               <span className="text-[10px] text-primary font-bold">CR</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-tighter">Projected Total</span>
            <span className="text-lg font-mono font-bold text-white/60">~150 CR</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-12 w-14 items-center justify-center rounded-lg bg-black/40 border border-white/10 font-mono text-xl font-bold">04</div>
          <span className="text-white/20 text-2xl font-bold py-2">:</span>
          <div className="flex h-12 w-14 items-center justify-center rounded-lg bg-black/40 border border-white/10 font-mono text-xl font-bold text-primary">21</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
          <div className="glass-panel rounded-2xl flex-1 bg-black/50 relative overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-text-secondary">LIVE_FEED_SOURCE_01</span>
              <div className="flex gap-1.5">
                <div className="size-2 bg-red-500/50 rounded-full"></div>
                <div className="size-2 bg-yellow-500/50 rounded-full"></div>
                <div className="size-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(46,255,143,0.05)_0%,_transparent_70%)]"></div>
               <div className="text-center space-y-4">
                 <span className="material-symbols-outlined text-primary text-7xl animate-spin">data_saver_on</span>
                 <p className="text-white/50 font-mono text-sm tracking-widest uppercase">Stream Encrypted</p>
               </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl h-64 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center gap-2">
              <span className="material-symbols-outlined text-text-secondary text-sm">terminal</span>
              <span className="text-xs font-mono text-text-secondary">SYSTEM_LOGS</span>
            </div>
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={`opacity-80 ${log.includes('SUCCESS') ? 'text-primary' : log.includes('WARN') ? 'text-yellow-400' : log.includes('CREDIT') ? 'text-primary/60 italic' : 'text-white'}`}>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6 space-y-6">
             <h3 className="text-white font-bold flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">donut_large</span>
               Progress Metrics
             </h3>
             <div className="space-y-2">
               <div className="flex justify-between text-xs font-medium">
                 <span className="text-text-secondary">Overall Completion</span>
                 <span className="text-white">{progress}%</span>
               </div>
               <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                 <div className="bg-primary h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                 <p className="text-text-secondary text-[10px] uppercase">Steps</p>
                 <p className="text-white text-xl font-bold">12/40</p>
               </div>
               <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                 <p className="text-text-secondary text-[10px] uppercase">Failures</p>
                 <p className="text-red-400 text-xl font-bold">0</p>
               </div>
             </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex-1 overflow-y-auto">
             <h3 className="text-white font-bold text-sm mb-4">Active Agents</h3>
             <div className="space-y-3">
               {[1, 2].map(i => (
                 <div key={i} className="p-4 rounded-xl bg-white/5 border border-primary/20 flex gap-3">
                   <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                     <span className="material-symbols-outlined">android</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-white text-sm font-bold">Agent_{i < 2 ? 'Alpha' : 'Beta'}</span>
                     <span className="text-primary text-[10px] animate-pulse">● Processing Model Response</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionPage;
