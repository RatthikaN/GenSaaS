
import React, { useState } from 'react';

const SecurityPage = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  return (
    <div className="glass-panel rounded-3xl p-8 border-white/5 space-y-10 animate-in fade-in duration-500">
      <div className="space-y-6">
        <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">key</span>
          Authentication Control
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">Current Password</label>
             <input type="password" placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] px-1">New Password</label>
             <input type="password" placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary outline-none transition-all" />
           </div>
        </div>
        <button className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
          Update Password
        </button>
      </div>

      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              Two-Factor Authentication
            </h4>
            <p className="text-text-secondary text-xs">Add an extra layer of security to your laboratory workspace.</p>
          </div>
          <button 
            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${is2FAEnabled ? 'bg-primary' : 'bg-white/10'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-background-dark transition-transform ${is2FAEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="space-y-6 pt-8 border-t border-white/5">
        <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">devices</span>
          Active Lab Sessions
        </h4>
        <div className="space-y-4">
           {[
             { device: 'MacBook Pro 16"', location: 'San Francisco, CA', time: 'Active Now', current: true },
             { device: 'iPhone 15 Pro', location: 'London, UK', time: '2 hours ago', current: false },
           ].map((session, i) => (
             <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-text-secondary text-2xl">
                    {session.device.includes('iPhone') ? 'smartphone' : 'laptop_mac'}
                  </span>
                  <div>
                    <p className="text-white text-sm font-bold tracking-tight">
                      {session.device} {session.current && <span className="text-primary text-[9px] uppercase ml-2 px-1 rounded bg-primary/10">Current</span>}
                    </p>
                    <p className="text-[10px] text-text-secondary opacity-60 uppercase">{session.location} • {session.time}</p>
                  </div>
                </div>
                {!session.current && (
                  <button className="text-red-400 hover:text-red-300 text-[10px] font-black uppercase tracking-widest">Terminate</button>
                )}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
