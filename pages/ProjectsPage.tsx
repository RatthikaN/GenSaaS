
import React, { useState, useRef, useEffect } from 'react';
import { Project, UserRole } from '../types.ts';
import { useNavigate } from 'react-router-dom';

const GitSyncOverlay = ({ isOpen, projectName, onComplete }: { isOpen: boolean, projectName: string, onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = ["Initializing...", "Staging assets...", "Encrypting bundle...", "Pushing remote...", "Verifying..."];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      const interval = setInterval(() => {
        setStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setTimeout(onComplete, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-xl"></div>
      <div className="relative glass-panel rounded-3xl p-8 max-w-sm w-full text-center space-y-6 border-primary/30 shadow-2xl">
        <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto animate-pulse">
          <span className="material-symbols-outlined text-3xl text-primary">cloud_upload</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Git Synchronizing</h3>
          <p className="text-[10px] uppercase tracking-widest mt-1 font-black text-primary">{projectName}</p>
        </div>
        <div className="space-y-3">
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
             <div className="h-full bg-primary transition-all duration-300" style={{width: `${((step + 1) / steps.length) * 100}%`}}></div>
          </div>
          <p className="text-[10px] font-mono text-primary/60 uppercase tracking-tighter">{steps[step]}</p>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = ({ role }: { role: UserRole }) => {
  const navigate = useNavigate();
  const [syncingProject, setSyncingProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects] = useState<Project[]>([
    { id: '#PROJ-8821', name: 'Customer Support Bot v2', category: 'Web', status: 'Testing', lastTested: '2h ago', credits: 450, totalCredits: 1000, gitConnected: true },
    { id: '#PROJ-7743', name: 'Finance Policy Analyzer', category: 'Software', status: 'Ready', lastTested: '1d ago', credits: 120, totalCredits: 1000, gitConnected: true },
    { id: '#PROJ-9901', name: 'Ad Creative Generator', category: 'Web', status: 'Failed', lastTested: '3d ago', credits: 890, totalCredits: 1000, gitConnected: false },
    { id: '#PROJ-5567', name: 'Inventory Mobile', category: 'Mobile', status: 'Ready', lastTested: '4h ago', credits: 310, totalCredits: 1000, gitConnected: false },
    { id: '#PROJ-1234', name: 'LLM-Chatbot-Alpha-v2', category: 'Web', status: 'Testing', lastTested: 'Oct 24, 2023', credits: 200, totalCredits: 1000, gitConnected: true },
    { id: '#PROJ-5678', name: 'Vision-Model-Beta', category: 'Software', status: 'Failed', lastTested: 'Oct 23, 2023', credits: 0, totalCredits: 1000, gitConnected: true },
  ]);

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div className="space-y-1">
          <h2 className="text-white text-2xl md:text-4xl font-black tracking-tight uppercase">Projects Console</h2>
          <p className="text-text-secondary text-[11px] md:text-sm font-medium uppercase tracking-widest">Manage certified environments</p>
        </div>
        <button 
          onClick={() => setSyncingProject("New Infrastructure Project")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-11 md:h-12 px-6 bg-primary hover:bg-primary-hover text-background-dark text-[10px] md:text-xs font-black uppercase tracking-widest transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Project</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl p-3 md:p-4 flex flex-col sm:flex-row gap-4 items-center shadow-lg">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-lg">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-white text-xs md:text-sm rounded-xl pl-12 p-3 outline-none focus:border-primary transition-all" 
            placeholder="Search assets..." 
          />
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[9px] md:text-[10px] uppercase font-black tracking-widest text-text-secondary">
                <th className="p-4 md:p-5">Infrastructure</th>
                <th className="p-4 md:p-5">Category</th>
                <th className="p-4 md:p-5">Health</th>
                <th className="p-4 md:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredProjects.map((proj) => (
                <tr key={proj.id} className="group hover:bg-primary/5 transition-all">
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-xl">smart_toy</span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-white group-hover:text-primary transition-colors truncate max-w-[200px] text-xs md:text-sm">{proj.name}</p>
                        <p className="text-text-secondary font-mono text-[9px] tracking-tight">{proj.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{proj.category}</span>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase border tracking-widest ${
                      proj.status === 'Testing' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      proj.status === 'Ready' ? 'bg-primary/10 text-primary border-primary/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {proj.status !== 'Ready' ? (
                        <button 
                          onClick={() => navigate(`/audit/report/${proj.id.replace('#', '')}`)}
                          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-background-dark text-[9px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">verified</span>
                          Start Audit
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigate(`/certificate/${proj.id.replace('#', '')}`)}
                          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest transition-all"
                        >
                          View Certificate
                        </button>
                      )}
                      <button className="size-8 flex items-center justify-center hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <GitSyncOverlay 
        isOpen={!!syncingProject} 
        projectName={syncingProject || ''} 
        onComplete={() => {
          setSyncingProject(null);
          navigate('/audit');
        }} 
      />
    </div>
  );
};

export default ProjectsPage;
