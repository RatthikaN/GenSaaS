
import React, { useState } from 'react';

const SubscriptionPage = () => {
  const [showPlans, setShowPlans] = useState(false);

  const plans = [
    { name: 'Starter', price: '$0', features: ['Basic Scans', 'Limited Storage', 'Community Support'], current: false },
    { name: 'Enterprise', price: '$699', features: ['Unlimited Audits', '24/7 Priority Agent', 'Full Compliance API'], current: true },
    { name: 'Partner', price: 'Custom', features: ['White-label Reports', 'Reseller API', 'Dedicated Infrastructure'], current: false },
  ];

  return (
    <div className="glass-panel rounded-3xl p-8 border-white/5 space-y-10 animate-in fade-in duration-500">
      {/* Current Subscription Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Available Credit Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white tracking-tighter">2,750</span>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Credits</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
             <div className="h-full bg-primary shadow-[0_0_10px_#2eff8f]" style={{width: '27%'}}></div>
          </div>
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-[14px] text-text-secondary">query_stats</span>
             <p className="text-[10px] text-text-secondary italic font-medium">Consuming approx. 140 credits/day</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <span className="material-symbols-outlined text-9xl">workspace_premium</span>
          </div>
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Current Active Plan</p>
          <h3 className="text-3xl font-black text-white tracking-tight">Enterprise Elite</h3>
          <p className="text-text-secondary text-xs font-medium uppercase tracking-widest mt-1">
            Next billing: <span className="text-white">Nov 24, 2023</span>
          </p>
        </div>
      </div>

      {/* Plans Section */}
      <div className="space-y-8 pt-8 border-t border-white/5">
        {!showPlans ? (
          <div className="flex flex-col items-center py-12 gap-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="size-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary/40">
              <span className="material-symbols-outlined text-4xl">unfold_more</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-black text-lg uppercase tracking-widest">Scale Your Laboratory</h4>
              <p className="text-text-secondary text-xs uppercase font-medium tracking-tight">Browse our specialized infrastructure tiers for high-frequency auditing</p>
            </div>
            <button 
              onClick={() => setShowPlans(true)}
              className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 hover:border-primary/30 hover:scale-[1.02] transition-all active:scale-95 shadow-xl"
            >
              View Available Plans
            </button>
          </div>
        ) : (
          <div className="animate-in slide-in-from-top-4 duration-500 space-y-8">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">rocket_launch</span>
                Infrastructure Upgrade Options
              </h4>
              <button 
                onClick={() => setShowPlans(false)}
                className="text-[10px] font-black text-text-secondary uppercase tracking-widest hover:text-white transition-colors"
              >
                Hide Plans
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.name} className={`p-6 rounded-[2rem] border transition-all flex flex-col gap-6 group ${plan.current ? 'bg-primary/10 border-primary shadow-[0_0_40px_rgba(46,255,143,0.1)]' : 'bg-black/40 border-white/10 hover:border-white/20'}`}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h5 className={`font-black text-sm uppercase tracking-widest ${plan.current ? 'text-primary' : 'text-white/60'}`}>{plan.name}</h5>
                      <p className="text-3xl font-black text-white tracking-tighter">
                        {plan.price}
                        <span className="text-[10px] text-text-secondary uppercase font-bold ml-1">/ mo</span>
                      </p>
                    </div>
                    {plan.current && (
                      <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                        <span className="material-symbols-outlined text-sm font-black">check</span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-[10px] font-bold text-text-secondary uppercase tracking-tight">
                        <span className={`material-symbols-outlined text-sm ${plan.current ? 'text-primary' : 'text-white/20'}`}>task_alt</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button 
                    disabled={plan.current} 
                    className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                      plan.current 
                        ? 'bg-primary/20 text-primary border border-primary/30 cursor-default' 
                        : 'bg-white/5 border border-white/10 hover:bg-primary hover:text-background-dark hover:border-primary active:scale-95 text-white'
                    }`}
                  >
                    {plan.current ? 'Active Workspace' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Optional Footer info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
           <span className="material-symbols-outlined text-text-secondary text-sm">lock</span>
           <p className="text-[9px] text-text-secondary font-mono tracking-tighter uppercase opacity-50">Transaction Node: SECURE_CORE_PAY_01</p>
        </div>
        <p className="text-[9px] text-text-secondary uppercase font-bold tracking-widest">Taxes and regional fees may apply at checkout</p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
