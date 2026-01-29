
import React, { useState } from 'react';

const BuildPage = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildStep, setBuildStep] = useState(0);
  const [selectedArch, setSelectedArch] = useState('TRANS-V4');

  const architectures = [
    { id: 'TRANS-V4', name: 'Transformer V4', desc: 'Optimized for high-context LLMs', icon: 'auto_awesome' },
    { id: 'CV-DIFF', name: 'Diff-Vision', desc: 'Latent space image synthesis', icon: 'image' },
    { id: 'RAG-CORE', name: 'RAG-Core', desc: 'Vector-aware retrieval engine', icon: 'database' },
  ];

  const buildSteps = [
    "Compiling Architecture Layers...",
    "Allocating VRAM Buffers...",
    "Initializing Safety Perimeters...",
    "Finalizing Model Weights...",
    "Build Successful!"
  ];

  const startBuild = () => {
    setIsBuilding(true);
    setBuildStep(0);
    const interval = setInterval(() => {
      setBuildStep(prev => {
        if (prev >= buildSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsBuilding(false), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Build Workspace</h1>
          <p className="text-text-secondary text-sm md:text-base font-medium uppercase tracking-widest mt-1">Assemble & Compile AI Infrastructure</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={startBuild}
            disabled={isBuilding}
            className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 ${
              isBuilding ? 'bg-white/5 text-white/40 border border-white/10' : 'bg-primary text-background-dark hover:bg-primary-hover shadow-primary/20'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{isBuilding ? 'sync' : 'construction'}</span>
            {isBuilding ? 'Compiling...' : 'Start Build'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Control Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-white/5 space-y-6">
            <h3 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4">Select Architecture</h3>
            <div className="space-y-3">
              {architectures.map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setSelectedArch(arch.id)}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 text-left ${
                    selectedArch === arch.id 
                    ? 'bg-primary/10 border-primary/40 text-white' 
                    : 'bg-white/5 border-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`size-12 rounded-xl flex items-center justify-center ${selectedArch === arch.id ? 'bg-primary text-background-dark' : 'bg-white/5'}`}>
                    <span className="material-symbols-outlined text-2xl">{arch.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest">{arch.name}</h4>
                    <p className="text-[10px] opacity-60 mt-0.5">{arch.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-white/5 space-y-6">
            <h3 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4">Build Config</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-secondary">
                  <span>Parameter Density</span>
                  <span className="text-primary">70B</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-secondary">
                  <span>Safety Quantization</span>
                  <span className="text-primary">4-Bit</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Build Monitor / Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-panel rounded-[2rem] border-white/5 overflow-hidden flex flex-col flex-1 min-h-[500px] shadow-2xl relative">
            <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-400"></div>
                <div className="size-2 rounded-full bg-yellow-400"></div>
                <div className="size-2 rounded-full bg-primary"></div>
              </div>
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em]">Build_Terminal_v4.0.1</span>
            </div>

            <div className="flex-1 p-8 font-mono text-xs md:text-sm text-text-secondary overflow-y-auto space-y-2 bg-black/40">
              {isBuilding ? (
                <>
                  {buildSteps.slice(0, buildStep + 1).map((step, i) => (
                    <div key={i} className="flex gap-4 animate-in slide-in-from-left-2 duration-300">
                      <span className="text-primary font-bold">[{new Date().toLocaleTimeString()}]</span>
                      <span className={i === buildStep ? 'text-white' : 'text-text-secondary'}>
                        {i === buildStep && i < buildSteps.length - 1 ? (
                          <span className="inline-block animate-pulse">>>> {step}</span>
                        ) : (
                          <span>DONE: {step}</span>
                        )}
                      </span>
                    </div>
                  ))}
                  {buildStep < buildSteps.length - 1 && (
                    <div className="mt-4 flex flex-col items-center justify-center gap-4 py-20 opacity-40">
                      <div className="size-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">Compiling Neural Net</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20 group hover:opacity-40 transition-opacity">
                  <span className="material-symbols-outlined text-8xl">precision_manufacturing</span>
                  <div className="space-y-2">
                    <p className="text-lg font-black uppercase tracking-[0.3em] text-white">Workspace Idle</p>
                    <p className="text-xs uppercase tracking-widest">Select an architecture and start build sequence</p>
                  </div>
                </div>
              )}
            </div>

            {/* Matrix Background Decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#2eff8f_1px,transparent_1px)] [background-size:20px_20px] -z-10"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Latency', value: '14ms', icon: 'speed' },
              { label: 'Throughput', value: '1.2k req/s', icon: 'dynamic_feed' },
              { label: 'Security', value: 'Shielded', icon: 'security' },
              { label: 'Node Health', value: 'Optimal', icon: 'hub' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-2xl border-white/5 flex flex-col gap-1 items-center justify-center text-center">
                <span className="material-symbols-outlined text-primary text-xl mb-1">{stat.icon}</span>
                <p className="text-white font-black text-sm tracking-tight">{stat.value}</p>
                <p className="text-[8px] font-black text-text-secondary uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildPage;
