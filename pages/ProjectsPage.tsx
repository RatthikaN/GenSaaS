
import React, { useState, useRef, useEffect } from 'react';
import { Project, UserRole } from '../types.ts';
import { Link, useNavigate } from 'react-router-dom';

const GitSyncOverlay = ({ isOpen, projectName, onComplete }: { isOpen: boolean, projectName: string, onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "Initializing local repository...",
    "Staging project assets...",
    "Generating secure audit manifest...",
    "Compressing encrypted bundle...",
    "Pushing to remote origin: main",
    "Verifying commit integrity..."
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      const interval = setInterval(() => {
        setStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setTimeout(onComplete, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-xl animate-fade-in"></div>
      <div className="relative glass-panel rounded-3xl p-6 md:p-10 max-w-md w-full text-center space-y-6 border-primary/30 shadow-[0_0_50px_rgba(46,255,143,0.15)]">
        <div className="size-16 md:size-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto animate-pulse">
          <span className="material-symbols-outlined text-3xl md:text-4xl text-primary">cloud_upload</span>
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white">Syncing to Git Storage</h3>
          <p className="text-text-secondary text-[10px] uppercase tracking-[0.2em] mt-1 font-black">{projectName || 'New Project'}</p>
        </div>
        <div className="space-y-3 text-left">
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
             <div className="h-full bg-primary transition-all duration-500 shadow-[0_0_10px_#2eff8f]" style={{width: `${((step + 1) / steps.length) * 100}%`}}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary animate-ping"></span>
            <p className="text-[10px] font-mono text-primary uppercase tracking-tighter">{steps[step]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateProjectModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean, onClose: () => void, onCreate: (name: string, category: string) => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [projectName, setProjectName] = useState('');
  const [appCategory, setAppCategory] = useState<'Web' | 'Mobile' | 'Software'>('Web');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleCreate = () => {
    onCreate(projectName, appCategory);
    onClose();
    setProjectName('');
  };

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
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col gap-6 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto border-white/10 shadow-2xl">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Create New Project</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Project Name</label>
            <input 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary transition-all outline-none" 
              placeholder="e.g. Finance Analyzer Alpha"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Infrastructure Type</label>
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
                  <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Dataset Deployment</label>
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
          disabled={!projectName}
          className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-background-dark font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(46,255,143,0.3)] transition-all disabled:opacity-50 mt-2"
          onClick={handleCreate}
        >
          Initialize & Push to Git
        </button>
      </div>
    </div>
  );
};

const ProjectsPage = ({ role }: { role: UserRole }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [syncingProject, setSyncingProject] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [projects, setProjects] = useState<Project[]>([
    { id: '#PROJ-8821', name: 'Customer Support Bot v2', category: 'Web', status: 'Testing', lastTested: '2 hours ago', lastSynced: 'Just now', credits: 450, totalCredits: 1000, gitConnected: true, isMarketplaceApproved: false },
    { id: '#PROJ-7743', name: 'Finance Policy Analyzer', category: 'Software', status: 'Ready', lastTested: '1 day ago', lastSynced: '3 hours ago', credits: 120, totalCredits: 1000, gitConnected: true, isMarketplaceApproved: true },
    { id: '#PROJ-9901', name: 'Ad Creative Generator', category: 'Web', status: 'Failed', lastTested: '3 days ago', credits: 890, totalCredits: 1000, gitConnected: false },
    { id: '#PROJ-1234', name: 'Code Assistant Alpha', category: 'Software', status: 'Paused', lastTested: '1 week ago', lastSynced: '2 weeks ago', credits: 50, totalCredits: 1000, gitConnected: true },
    { id: '#PROJ-5567', name: 'Inventory Tracker Mobile', category: 'Mobile', status: 'Ready', lastTested: '4 hours ago', credits: 310, totalCredits: 1000, gitConnected: false },
  ]);

  const handleCreateProject = (name: string, category: string) => {
    setSyncingProject(name);
  };

  const onSyncComplete = () => {
    const newProj: Project = {
      id: `#PROJ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: syncingProject || 'Unnamed Project',
      category: 'Web',
      status: 'Testing',
      lastTested: 'Just now',
      lastSynced: 'Just now',
      credits: 0,
      totalCredits: 1000,
      gitConnected: true
    };
    setProjects(prev => [newProj, ...prev]);
    setSyncingProject(null);
  };

  const filteredProjects = projects.filter(p => {
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web': return 'cloud';
      case 'Mobile': return 'smartphone';
      case 'Software': return 'desktop_windows';
      default: return 'help';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-white text-2xl md:text-4xl font-black tracking-tight uppercase">Projects Console</h2>
          <p className="text-text-secondary text-xs md:text-base max-w-2xl font-medium">Manage your certified environments and secure infrastructure.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary hover:bg-primary-hover text-background-dark text-xs font-black uppercase tracking-widest shadow-[0_0_25px_rgba(46,255,143,0.3)] transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          <span>New Project</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl p-3 md:p-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-white/5 shadow-lg">
        <div className="relative flex-1 w-full max-w-lg">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-lg">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-white text-xs md:text-sm rounded-xl block pl-12 p-3 outline-none focus:border-primary transition-all placeholder:text-white/20" 
            placeholder="Search projects..." 
            type="text"
          />
        </div>
        <div className="flex w-full sm:w-auto gap-3">
           <div className="relative flex-1 sm:flex-none">
             <select 
               value={filterStatus}
               onChange={(e) => setFilterStatus(e.target.value)}
               className="w-full appearance-none bg-[#101814] border border-white/10 hover:border-primary text-white text-[10px] font-black uppercase tracking-widest pl-4 pr-10 py-3 rounded-xl transition-all outline-none cursor-pointer"
             >
               <option value="All">All Statuses</option>
               <option value="Testing">Testing</option>
               <option value="Ready">Ready</option>
               <option value="Failed">Failed</option>
             </select>
             <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-lg">expand_more</span>
           </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary">
                <th className="p-4 md:p-5">Infrastructure</th>
                <th className="p-4 md:p-5">Category</th>
                <th className="p-4 md:p-5">Repository</th>
                <th className="p-4 md:p-5">Health</th>
                <th className="p-4 md:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredProjects.map((proj) => (
                <tr key={proj.id} className="group hover:bg-primary/5 transition-all">
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-3">
                      <div className="size-9 md:size-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-xl md:text-2xl">smart_toy</span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-white group-hover:text-primary transition-colors truncate max-w-[150px] md:max-w-none text-xs md:text-sm">{proj.name}</p>
                        <p className="text-text-secondary font-mono text-[9px] tracking-tight">{proj.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-primary/60">
                        <span className="material-symbols-outlined text-[18px]">{getCategoryIcon(proj.category)}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{proj.category}</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-2">
                       <span className={`material-symbols-outlined text-sm ${proj.gitConnected ? 'text-primary' : 'text-white/20'}`}>
                         {proj.gitConnected ? 'database_check' : 'database_off'}
                       </span>
                       <span className={`text-[9px] font-black uppercase tracking-widest ${proj.gitConnected ? 'text-primary/70' : 'text-white/20'}`}>
                         {proj.gitConnected ? 'Active' : 'Offline'}
                       </span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      proj.status === 'Testing' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      proj.status === 'Ready' ? 'bg-primary/10 text-primary border-primary/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Contextual Action Buttons */}
                      {proj.status === 'Failed' && (
                        <button 
                          onClick={() => navigate('/fix-workspace')}
                          className="px-4 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-sm">auto_fix</span>
                          Fix
                        </button>
                      )}
                      
                      {proj.status === 'Ready' && (
                        <button 
                          title="Download Bundle"
                          className="size-8 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary rounded-lg hover:bg-primary/20 transition-all shadow-[0_0_10px_rgba(46,255,143,0.1)]"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      )}

                      <div className="h-6 w-[1px] bg-white/5 mx-1"></div>

                      {/* Standard Lifecycle Actions */}
                      <button 
                        title="View Details"
                        className="size-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-text-secondary hover:text-white transition-all group/btn"
                      >
                        <span className="material-symbols-outlined text-[18px] group-hover/btn:scale-110">visibility</span>
                      </button>
                      <button 
                        title="Edit Project"
                        className="size-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-text-secondary hover:text-white transition-all group/btn"
                      >
                        <span className="material-symbols-outlined text-[18px] group-hover/btn:scale-110">tune</span>
                      </button>
                      <button 
                        title="More Options"
                        className="size-8 flex items-center justify-center hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                      >
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
      
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateProject}
      />
      
      <GitSyncOverlay 
        isOpen={!!syncingProject} 
        projectName={syncingProject || ''} 
        onComplete={onSyncComplete} 
      />
    </div>
  );
};

export default ProjectsPage;
