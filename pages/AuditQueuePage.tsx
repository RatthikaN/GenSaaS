
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuditQueuePage = () => {
  const navigate = useNavigate();
  const items = [
    { id: 'LC-9921', name: 'LLM-Chatbot-Alpha-v2', submitted: 'Oct 24, 2023', coverage: 88, risk: 'Low', status: 'Pending Review' },
    { id: 'VM-8812', name: 'Vision-Model-Beta', submitted: 'Oct 23, 2023', coverage: 45, risk: 'High', status: 'Flagged' },
    { id: 'FP-7734', name: 'Finance-Predictor', submitted: 'Oct 23, 2023', coverage: 92, risk: 'Low', status: 'Passed' },
    { id: 'CS-6619', name: 'Customer-Support-Bot', submitted: 'Oct 22, 2023', coverage: 12, risk: 'Medium', status: 'In Progress' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Audit Queue</h1>
          <p className="text-text-secondary text-sm font-medium">Manage pending compliance checks and model evaluations across the platform.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-4 py-2 glass-panel rounded-xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">Filter Severity</button>
           <button className="flex-1 md:flex-none px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-black uppercase tracking-widest hover:bg-primary/20 transition-all">Export Queue</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-1 border-white/5">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Total Queue</p>
          <p className="text-4xl font-black text-white">14 <span className="text-sm font-normal text-text-secondary">Projects</span></p>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-1 border-red-500/20">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">High Risk Flags</p>
          <p className="text-4xl font-black text-red-400">3 <span className="text-sm font-normal text-text-secondary">Active</span></p>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-1 border-primary/10">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Avg Completion</p>
          <p className="text-4xl font-black text-primary">82% <span className="text-sm font-normal text-text-secondary">Success</span></p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                <th className="p-5">Project Name</th>
                <th className="p-5">Submitted</th>
                <th className="p-5">Coverage</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {items.map(item => (
                <tr key={item.id} className="group hover:bg-primary/5 transition-all">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      {item.status === 'Passed' && (
                        <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(46,255,143,0.3)] animate-in zoom-in duration-300">
                          <span className="material-symbols-outlined text-sm font-black">check</span>
                        </div>
                      )}
                      <div className="flex flex-col gap-0.5">
                         <span className="text-white font-bold group-hover:text-primary transition-colors">{item.name}</span>
                         <span className="text-[10px] text-text-secondary font-mono tracking-tighter">{item.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-text-secondary text-xs">{item.submitted}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3 w-32">
                       <div className="flex-1 bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                          <div className={`h-full transition-all duration-1000 ${item.coverage > 70 ? 'bg-primary shadow-[0_0_8px_rgba(46,255,143,0.5)]' : 'bg-yellow-400'}`} style={{width: `${item.coverage}%`}}></div>
                       </div>
                       <span className="text-[10px] font-mono font-bold text-white">{item.coverage}%</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase border tracking-widest ${
                       item.status === 'Passed' ? 'bg-primary/10 text-primary border-primary/20' :
                       item.status === 'Flagged' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                       'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    {item.status === 'Passed' ? (
                      <button 
                        onClick={() => navigate(`/certificate/${item.id}`)}
                        className="px-5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all shadow-lg active:scale-95 flex items-center gap-2 ml-auto"
                      >
                        <span className="material-symbols-outlined text-sm">workspace_premium</span>
                        View Certificate
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigate(`/audit/report/${item.id}`)}
                        className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-background-dark text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/10 active:scale-95"
                      >
                        Start Audit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditQueuePage;
