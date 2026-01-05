import React from 'react';

const AdsPage = () => {
  const adCampaigns = [
    { id: 'AD-001', name: 'Summer AI Growth', status: 'Active', reach: '45.2k', spend: '$1,200', type: 'Billboard' },
    { id: 'AD-002', name: 'Developer Tooling Promo', status: 'Paused', reach: '12.8k', spend: '$450', type: 'In-Feed' },
    { id: 'AD-003', name: 'Enterprise Audit Launch', status: 'Active', reach: '102.4k', spend: '$5,800', type: 'Marketplace Featured' },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-white text-3xl font-black tracking-tight">Advertisement Console</h2>
          <p className="text-text-secondary text-sm">Manage sponsored content and marketplace promotions across the ecosystem.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-background-dark font-bold shadow-lg hover:scale-105 transition-all">
          <span className="material-symbols-outlined">campaign</span>
          Launch New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Impressions', value: '160.4k', trend: '+12%', icon: 'visibility' },
          { label: 'Click-Through Rate', value: '3.4%', trend: '+0.5%', icon: 'touch_app' },
          { label: 'Conversion Cost', value: '$2.14', trend: '-$0.12', icon: 'payments' },
          { label: 'Total Ad Spend', value: '$7,450', trend: 'Budget: $10k', icon: 'account_balance' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between text-text-secondary">
               <span className="material-symbols-outlined text-xl">{stat.icon}</span>
               <span className="text-[10px] font-black uppercase tracking-widest">{stat.trend}</span>
            </div>
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
           <h3 className="text-lg font-bold text-white">Active Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-text-secondary">
               <tr>
                 <th className="p-5">Campaign Name</th>
                 <th className="p-5">Type</th>
                 <th className="p-5">Reach</th>
                 <th className="p-5">Spend</th>
                 <th className="p-5">Status</th>
                 <th className="p-5 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-white/5 text-sm">
                {adCampaigns.map(ad => (
                  <tr key={ad.id} className="hover:bg-primary/5 transition-colors">
                    <td className="p-5">
                      <div className="flex flex-col">
                         <span className="text-white font-bold">{ad.name}</span>
                         <span className="text-[10px] font-mono text-text-secondary">{ad.id}</span>
                      </div>
                    </td>
                    <td className="p-5 text-white/70">{ad.type}</td>
                    <td className="p-5 font-mono text-primary font-bold">{ad.reach}</td>
                    <td className="p-5 text-white font-bold">{ad.spend}</td>
                    <td className="p-5">
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ad.status === 'Active' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                         {ad.status}
                       </span>
                    </td>
                    <td className="p-5 text-right">
                       <button className="material-symbols-outlined text-text-secondary hover:text-white">edit</button>
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

export default AdsPage;