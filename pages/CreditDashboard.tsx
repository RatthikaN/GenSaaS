
import React, { useState } from 'react';

const PurchaseCreditsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  if (!isOpen) return null;

  const tiers = [
    { 
      id: 'starter', 
      name: 'Starter', 
      credits: '5,000', 
      price: '$49', 
      description: 'Perfect for small projects & initial audits.',
      features: ['Basic AI Scanning', 'Standard Support', 'Local Storage']
    },
    { 
      id: 'growth', 
      name: 'Growth', 
      credits: '25,000', 
      price: '$199', 
      description: 'Ideal for scaling teams with frequent deployments.',
      features: ['Advanced Security Probe', 'Priority Queue', 'Git Connectivity', 'Marketplace Listing']
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise', 
      credits: '100,000', 
      price: '$699', 
      description: 'Max power for high-frequency enterprise infrastructure.',
      features: ['24/7 Dedicated Agent', 'Full Compliance Suite', 'White-label Reports', 'API Access']
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-4xl rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col gap-8 animate-in zoom-in duration-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">Purchase AI Credits</h3>
            <p className="text-text-secondary text-sm">Scale your auditing power with pre-paid resource tokens.</p>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col gap-4 ${
                selectedTier === tier.id 
                ? 'bg-primary/10 border-primary shadow-[0_0_30px_rgba(46,255,143,0.1)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {tier.id === 'growth' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-background-dark text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">{tier.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{tier.credits}</span>
                  <span className="text-xs font-bold text-primary tracking-tighter uppercase">Credits</span>
                </div>
                <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">{tier.price} / one-time</p>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed min-h-[40px]">{tier.description}</p>

              <div className="space-y-2 mt-2">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-white/70">
                    <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                    {feature}
                  </div>
                ))}
              </div>

              <div className={`mt-auto pt-4 flex items-center justify-center rounded-xl py-3 text-xs font-bold transition-all border ${
                selectedTier === tier.id 
                ? 'bg-primary text-background-dark border-primary' 
                : 'bg-white/5 text-white border-white/10 group-hover:bg-white/10'
              }`}>
                Select Tier
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => <img key={i} className="size-8 rounded-full border-2 border-background-dark" src={`https://picsum.photos/seed/${i+10}/32/32`} alt="User" />)}
              </div>
              <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Joined by 12k+ researchers</p>
           </div>
           <button 
             disabled={!selectedTier}
             className="w-full md:w-auto px-10 py-4 rounded-xl bg-primary hover:bg-primary-hover text-background-dark font-black text-sm shadow-[0_0_20px_rgba(46,255,143,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Initialize Checkout
           </button>
        </div>
      </div>
    </div>
  );
};

const CreditDashboard = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">Credit Overview</h1>
          <p className="text-text-secondary text-base font-normal">Track your resource consumption and manage credit balance.</p>
        </div>
        <button 
          onClick={() => setIsPurchaseModalOpen(true)}
          className="flex items-center gap-2 rounded-xl h-12 px-6 bg-primary hover:bg-primary-hover transition-all text-background-dark font-bold shadow-[0_0_15px_rgba(46,255,143,0.3)]"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Buy Credits</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-primary">account_balance_wallet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <span className="material-symbols-outlined text-primary text-sm">token</span>
            </div>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Available Credits</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white leading-tight">34,250</p>
            <p className="text-text-secondary text-sm mt-1">~ $342.50 equivalent</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-400">hourglass_bottom</span>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Projected Run-Out</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white leading-tight">Nov 14</p>
            <p className="text-text-secondary text-sm mt-1">22 Days remaining</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2 text-red-400">
            <span className="material-symbols-outlined">local_fire_department</span>
            <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Current Burn Rate</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white leading-tight">125<span className="text-sm font-normal text-text-secondary">/hr</span></p>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400 mt-2">
               -12% vs last week
            </span>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-8 h-[300px] flex flex-col">
         <h3 className="text-white text-lg font-bold mb-6">Credit Usage History</h3>
         <div className="flex-1 flex items-end gap-2">
            {[20, 35, 45, 30, 55, 40, 60, 45, 70, 50, 85, 65, 40, 30, 25, 45, 60, 80, 55, 40].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm" style={{height: `${h}%`}}></div>
            ))}
         </div>
         <div className="flex justify-between mt-4 text-[10px] text-text-secondary uppercase font-bold tracking-widest">
            <span>Oct 1</span>
            <span>Oct 15</span>
            <span>Oct 29</span>
         </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-white text-lg font-bold">Recent Billing</h3>
          <button className="text-primary text-xs font-bold hover:underline">Download Statements</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm divide-y divide-white/5">
             <thead className="bg-white/5">
                <tr className="text-text-secondary text-[10px] uppercase font-bold tracking-widest">
                   <th className="p-5">Transaction ID</th>
                   <th className="p-5">Date</th>
                   <th className="p-5">Amount</th>
                   <th className="p-5">Status</th>
                </tr>
             </thead>
             <tbody>
                {[
                  { id: '#BILL-0982', date: 'Oct 24, 2023', amount: '$500.00', status: 'Paid' },
                  { id: '#BILL-0841', date: 'Oct 12, 2023', amount: '$120.00', status: 'Paid' },
                  { id: '#BILL-0720', date: 'Sep 28, 2023', amount: '$50.00', status: 'Pending' },
                ].map(bill => (
                  <tr key={bill.id} className="hover:bg-white/5 text-white/80 transition-colors">
                     <td className="p-5 font-mono">{bill.id}</td>
                     <td className="p-5 text-text-secondary">{bill.date}</td>
                     <td className="p-5 font-bold">{bill.amount}</td>
                     <td className="p-5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${bill.status === 'Paid' ? 'bg-primary/10 text-primary' : 'bg-yellow-500/10 text-yellow-500'}`}>
                          {bill.status}
                        </span>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>

      <PurchaseCreditsModal isOpen={isPurchaseModalOpen} onClose={() => setIsPurchaseModalOpen(false)} />
    </div>
  );
};

export default CreditDashboard;
