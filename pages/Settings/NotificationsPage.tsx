
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
    <div className="glass-panel rounded-3xl p-8 border-white/5 space-y-12 animate-in fade-in duration-500">
      {notificationSections.map((section, idx) => (
        <div key={idx} className="space-y-6">
          <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">circle_notifications</span>
            {section.title}
          </h4>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggle(item.id as keyof typeof prefs)}
                className="flex items-center justify-between gap-6 p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-primary/20 transition-all cursor-pointer group"
              >
                <div className="max-w-lg">
                  <p className="text-white font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-text-secondary text-[11px] mt-1 font-medium">{item.desc}</p>
                </div>
                <button 
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${prefs[item.id as keyof typeof prefs] ? 'bg-primary shadow-[0_0_10px_rgba(46,255,143,0.3)]' : 'bg-white/10'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-background-dark transition-transform ${prefs[item.id as keyof typeof prefs] ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <p className="text-[10px] text-text-secondary font-mono">ALL CHANGES SYNCED TO SECURE_CORE_01</p>
        <button className="px-8 py-3 rounded-xl bg-primary text-background-dark font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationsPage;
