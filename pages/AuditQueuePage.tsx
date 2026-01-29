
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuditQueuePage = () => {
  const navigate = useNavigate();
  // Filtered to show ONLY passed/certified items as requested
  const items = [
    { id: 'FP-7734', name: 'Finance-Predictor', submitted: 'Oct 23, 2023', coverage: 92, risk: 'Low', status: 'Passed' },
    { id: 'SC-8892', name: 'Supply-Chain-Core', submitted: 'Oct 20, 2023', coverage: 95, risk: 'Low', status: 'Passed' },
    { id: 'HR-1120', name: 'Talent-Scout-AI', submitted: 'Oct 18, 2023', coverage: 89, risk: 'Low', status: 'Passed' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Certificate Vault</h1>
          <p className="text-text-secondary text-sm font-medium">Manage and view your officially issued AI Infrastructure certificates.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-black uppercase tracking-widest hover:bg-primary/20 transition-all">Export All</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-1 border-white/5">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Active Certificates</p>
          <p className="text-4xl font-black text-white">{items.length} <span className="text-sm font-normal text-text-secondary">Issued</span></p>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-1 border-primary/20">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Compliance Health</p>
          <p className="text-4xl font-black text-primary">100% <span className="text-sm font-normal text-text-secondary">Pass</span></p>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-1 border-white/5">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Global Ranking</p>
          <p className="text-4xl font-black text-white">Top 2%</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden shadow-xl border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                <th className="p-5">Certified Project</th>
                <th className="p-5">Issued Date</th>
                <th className="p-5">Audit Score</th>
                <th className="p-5">Verification</th>
                <th className="p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {items.map(item => (
                <tr key={item.id} className="group hover:bg-primary/5 transition-all">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(46,255,143,0.3)]">
                        <span className="material-symbols-outlined text-sm font-black">verified</span>
                      </div>
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
                          <div className="h-full bg-primary shadow-[0_0_8px_rgba(46,255,143,0.5)]" style={{width: `${item.coverage}%`}}></div>
                       </div>
                       <span className="text-[10px] font-mono font-bold text-white">{item.coverage}%</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase border tracking-widest bg-primary/10 text-primary border-primary/20">
                      Authentic
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => navigate(`/certificate/${item.id}`)}
                      className="px-5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all shadow-lg active:scale-95 flex items-center gap-2 ml-auto"
                    >
                      <span className="material-symbols-outlined text-sm">workspace_premium</span>
                      View Certificate
                    </button>
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
