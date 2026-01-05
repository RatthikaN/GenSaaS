
import React, { useState, useEffect } from 'react';
import { analyzeModelVulnerability } from '../services/geminiService';

const FixWorkspacePage = () => {
  const [analysis, setAnalysis] = useState("Waiting for AI agent to generate repair strategy...");
  const [loading, setLoading] = useState(true);

  const codeSnippet = `
def process_data(self, source):
    # Load raw data from source
    data = self.loader.load(source)
    # BUG IDENTIFIED: Potential Key Error if 'payload' is missing
    user_input = data['payload']
    
    # Risk: Potential Null Pointer or Missing Key
    result = self.transform(user_input)
    return result
  `;

  useEffect(() => {
    const fetchAnalysis = async () => {
      const result = await analyzeModelVulnerability(codeSnippet);
      if (result) setAnalysis(result);
      setLoading(false);
    };
    fetchAnalysis();
  }, []);

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 min-h-screen animate-in fade-in duration-300 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="size-10 md:size-12 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/10 shrink-0">
            <span className="material-symbols-outlined text-2xl md:text-3xl">auto_fix</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight truncate">AI Repair Session: API Vulnerability</h2>
            <p className="text-text-secondary font-mono text-[10px] md:text-xs mt-1 truncate">Audit Link: LC-9921 • src/processors/DataProcessor.py</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 rounded-xl glass-panel text-white hover:bg-white/10 font-bold text-sm transition-all">
            Reject
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-primary text-background-dark hover:bg-primary-hover font-bold text-sm shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Apply Patch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1">
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary space-y-4">
            <h3 className="text-white font-bold flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">neurology</span>
               Agent Reasoning
            </h3>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
              </div>
            ) : (
              <div className="text-sm text-gray-300 leading-relaxed overflow-y-auto max-h-[300px] md:max-h-[400px] prose prose-invert prose-sm">
                {analysis}
              </div>
            )}
            <div className="pt-4 border-t border-white/5">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 space-y-2">
                 <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Confidence Score</p>
                 <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{width: '98%'}}></div>
                    </div>
                    <span className="text-xs font-bold text-white">98%</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">Bug Context</h3>
            <div className="space-y-3">
               <div className="flex justify-between text-xs">
                 <span className="text-text-secondary">Type</span>
                 <span className="text-red-400 font-bold">Key Error</span>
               </div>
               <div className="flex justify-between text-xs">
                 <span className="text-text-secondary">Severity</span>
                 <span className="text-orange-400 font-bold">High</span>
               </div>
               <div className="flex justify-between text-xs">
                 <span className="text-text-secondary">Security Improvement</span>
                 <span className="text-primary font-bold">+22% Efficiency</span>
               </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl min-h-[400px]">
          <div className="bg-white/5 p-3 px-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-text-secondary text-sm">history_edu</span>
              <span className="font-mono text-xs text-text-secondary">DataProcessor.py</span>
            </div>
            <div className="flex gap-2">
              <div className="size-2 rounded-full bg-red-500/50"></div>
              <div className="size-2 rounded-full bg-yellow-500/50"></div>
              <div className="size-2 rounded-full bg-primary/50"></div>
            </div>
          </div>
          <div className="flex-1 bg-[#0a110e] p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:divide-x divide-white/5">
              {/* Left Side: Current */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-400/50 uppercase text-[10px] font-black tracking-widest">
                  <span className="material-symbols-outlined text-sm">remove_circle</span>
                  Current Implementation
                </div>
                <div className="space-y-1">
                  <div className="text-gray-500 line-through opacity-50 whitespace-pre">data = self.loader.load(source)</div>
                  <div className="text-red-300 bg-red-500/10 px-2 rounded-sm border-l-2 border-red-500 whitespace-pre">user_input = data['payload']</div>
                  <div className="text-gray-500 line-through opacity-50 whitespace-pre">result = self.transform(user_input)</div>
                </div>
              </div>
              
              {/* Right Side: Suggested */}
              <div className="space-y-4 xl:pl-8 mt-8 xl:mt-0 pt-8 xl:pt-0 border-t xl:border-t-0 border-white/5">
                 <div className="flex items-center gap-2 text-primary uppercase text-[10px] font-black tracking-widest">
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    AI Suggested Patch
                 </div>
                 <div className="space-y-1">
                    <div className="text-gray-300 whitespace-pre">data = self.loader.load(source)</div>
                    <div className="text-primary bg-primary/10 px-2 rounded-sm border-l-2 border-primary whitespace-pre">user_input = data.get('payload', &#123;&#125;)</div>
                    <div className="text-primary bg-primary/10 px-2 rounded-sm border-l-2 border-primary whitespace-pre"># Verify payload integrity</div>
                    <div className="text-primary bg-primary/10 px-2 rounded-sm border-l-2 border-primary whitespace-pre">result = self.transform(user_input.get('val', 0))</div>
                 </div>
              </div>
            </div>
          </div>
          <div className="bg-black/40 p-3 px-6 text-[10px] font-mono text-text-secondary text-center uppercase tracking-widest border-t border-white/5">
             AI Agent: SaaS-Auditor-Core v2.4 (Active)
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixWorkspacePage;
