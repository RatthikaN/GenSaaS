
import React from 'react';

const SubscriptionPage = () => {
  const plans = [
    { name: 'Starter', price: '$0', features: ['Basic Scans', 'Limited Storage', 'Community Support'], current: false },
    { name: 'Enterprise', price: '$699', features: ['Unlimited Audits', '24/7 Priority Agent', 'Full Compliance API'], current: true },
    { name: 'Partner', price: 'Custom', features: ['White-label Reports', 'Reseller API', 'Dedicated Infrastructure'], current: false },
  ];

  return (
    <div className="glass-panel rounded-3xl p-8 border-white/5 space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Available Credit Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white">2,750</span>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Credits</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
             <div className="h-full bg-primary" style={{width: '27%'}}></div>
          </div>
          <p className="text-[10px] text-text-secondary italic">Consuming approx. 140 credits/day</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center gap-2">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Current Plan</p>
          <h3 className="text-3xl font-black text-white">Enterprise Elite</h3>
          <p className="text-text-secondary text-sm">Next billing date: <span className="text-white font-bold">Nov 24, 2023</span></p>
        </div>
      </div>

      <div className="space-y-6 pt-8 border-t border-white/5">
        <h4 className="text-white font-black text-sm uppercase tracking-widest">Upgrade Laboratory Workspace</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className={`p-6 rounded-2xl border transition-all flex flex-col gap-4 ${plan.current ? 'bg-primary/10 border-primary' : 'bg-black/40 border-white/10 hover:border-white/20'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-white font-bold">{plan.name}</h5>
                  <p className="text-xl font-black text-white mt-1">{plan.price}<span className="text-[10px] text-text-secondary">/mo</span></p>
                </div>
                {plan.current && <span className="material-symbols-outlined text-primary">verified</span>}
              </div>
              <ul className="space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-[10px] text-text-secondary">
                    <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button disabled={plan.current} className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${plan.current ? 'bg-primary/20 text-primary cursor-default' : 'bg-white/10 hover:bg-white/20 text-white active:scale-95'}`}>
                {plan.current ? 'Active Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
