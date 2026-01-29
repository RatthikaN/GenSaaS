
import React, { useState } from 'react';

const NotificationsPage = () => {
  const [prefs, setPrefs] = useState({
    audit_complete: true,
    security_alert: true,
    credit_low: true,
    marketing: false,
    marketplace_sale: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  const notificationSections = [
    { 
      title: 'Lab Operational Alerts', 
      items: [
        { id: 'audit_complete', label: 'Audit Completion Reports', desc: 'Receive detailed PDF summaries when a model test sequence finishes.' },
        { id: 'security_alert', label: 'Security & Access Warnings', desc: 'Instant alerts on new login attempts or isolation breaches.' },
        { id: 'credit_low', label: 'Low Balance Threshold', desc: 'Get notified when your credit balance drops below 500 LAB.' }
      ]
    },
    { 
      title: 'Marketplace & Ecosystem', 
      items: [
        { id: 'marketplace_sale', label: 'Royalty & Sales Tracking', desc: 'Notifications for successful model initializations and payouts.' },
        { id: 'marketing', label: 'Product & Tech Updates', desc: 'Optional newsletters regarding new AI Audit Agents and compliance standards.' }
      ]
    }
  ];

  return (
    <div className="glass-panel rounded-[2rem] p-6 md:p-10 border-white/5 space-y-12 animate-in fade-in duration-500 shadow-2xl">
      {notificationSections.map((section, idx) => (
        <div key={idx} className="space-y-8">
          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(46,255,143,0.1)]">
               <span className="material-symbols-outlined text-2xl">circle_notifications</span>
            </div>
            <h4 className="text-white font-black text-sm md:text-base uppercase tracking-[0.2em]">
              {section.title}
            </h4>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {section.items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggle(item.id as keyof typeof prefs)}
                className="flex items-center justify-between gap-6 p-5 md:p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-primary/30 hover:bg-white/[0.02] transition-all cursor-pointer group"
              >
                <div className="max-w-2xl">
                  <p className="text-white font-black text-xs md:text-sm tracking-widest uppercase group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-text-secondary text-[10px] md:text-xs mt-2 font-medium leading-relaxed">{item.desc}</p>
                </div>
                
                {/* Custom High-Tech Toggle Switch */}
                <button 
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-all duration-300 focus:outline-none ${
                    prefs[item.id as keyof typeof prefs] 
                    ? 'bg-primary shadow-[0_0_15px_rgba(46,255,143,0.4)]' 
                    : 'bg-white/10'
                  }`}
                >
                  <span className={`inline-block size-5 transform rounded-full bg-background-dark shadow-md transition-all duration-300 ${
                    prefs[item.id as keyof typeof prefs] ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
        <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
           <span className="material-symbols-outlined text-primary text-sm animate-pulse">sync_saved_locally</span>
           <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">ALL CHANGES SYNCED TO SECURE_CORE_01</p>
        </div>
        
        <button className="w-full sm:w-auto px-10 py-4 rounded-xl bg-primary hover:bg-primary-hover text-background-dark font-black text-xs uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(46,255,143,0.2)] hover:scale-[1.02] active:scale-95 transition-all">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationsPage;
