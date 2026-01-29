
import React, { useState, useEffect } from 'react';
import { Member, UserRole } from '../types.ts';

interface Permission {
  id: string;
  label: string;
  icon: string;
  enabled: boolean;
}

const InviteMemberModal = ({ isOpen, onClose, onInvite }: { isOpen: boolean, onClose: () => void, onInvite: (member: Member) => void }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('DEVELOPER');
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 'home', label: 'HOME', icon: 'grid_view', enabled: true },
    { id: 'store', label: 'MY STORE', icon: 'inventory_2', enabled: true },
    { id: 'quality', label: 'QUALITY CHECK', icon: 'verified_user', enabled: true },
    { id: 'team', label: 'TEAM', icon: 'group', enabled: false },
    { id: 'support', label: 'SUPPORT', icon: 'support_agent', enabled: false },
  ]);

  // RBAC Logic: Sets defaults when role changes, but allows manual override
  useEffect(() => {
    if (role === 'ADMIN') {
      setPermissions(p => p.map(item => ({ ...item, enabled: true })));
    } else if (role === 'DEVELOPER') {
      setPermissions(p => p.map(item => ({
        ...item,
        enabled: ['home', 'store', 'quality'].includes(item.id)
      })));
    } else if (role === 'SUPPORT') {
      // Per user request: HOME, MY STORE, and QUALITY CHECK are checked for SUPPORT
      setPermissions(p => p.map(item => ({
        ...item,
        enabled: ['home', 'store', 'quality'].includes(item.id)
      })));
    } else if (role === 'CUSTOM') {
      // Keep existing or reset to safe default
    }
  }, [role]);

  const togglePermission = (id: string) => {
    // User requested the ticks not be "permanent" (allow manual toggling for any role)
    setPermissions(p => p.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item));
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: Member = {
      id: Math.random().toString(36).substr(2, 9),
      name: fullName,
      email: email,
      role: role as any,
      status: 'Pending',
      lastActive: 'Invited Now',
      avatar: `https://picsum.photos/seed/${fullName}/64/64`
    };
    onInvite(newMember);
    onClose();
    // Reset form for next invite
    setFullName('');
    setEmail('');
    setRole('DEVELOPER');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-2xl rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden flex flex-col gap-8 animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto border-primary/20 shadow-[0_0_50px_rgba(46,255,143,0.15)]">
        
        <div className="flex justify-between items-center">
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Invite New Member</h3>
          <button onClick={onClose} className="size-10 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-all flex items-center justify-center">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSendInvite} className="space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="size-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-text-secondary group-hover:border-primary/50 group-hover:text-primary transition-all cursor-pointer overflow-hidden">
                <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                <span className="text-[8px] font-black uppercase mt-1">Avatar</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">FULL NAME</label>
              <input 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary outline-none transition-all" 
                placeholder="Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">EMAIL</label>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary outline-none transition-all" 
                placeholder="name@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">ASSIGN A ROLE</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['ADMIN', 'DEVELOPER', 'SUPPORT', 'CUSTOM'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    role === r 
                    ? 'bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(46,255,143,0.3)]' 
                    : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">PERMISSIONS (ROLE CONTROLLED)</label>
              <span className="text-[8px] font-black text-primary/60 uppercase tracking-tighter italic">
                {role === 'CUSTOM' ? 'Manual Overrides Enabled' : `Preset active for ${role}`}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {permissions.map((perm) => (
                <div 
                  key={perm.id}
                  onClick={() => togglePermission(perm.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer hover:bg-white/10 ${
                    perm.enabled 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-white/5 border-white/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-xl ${perm.enabled ? 'text-primary' : 'text-text-secondary'}`}>
                      {perm.icon}
                    </span>
                    <span className={`text-[11px] font-black uppercase tracking-wider ${perm.enabled ? 'text-white' : 'text-text-secondary'}`}>
                      {perm.label}
                    </span>
                  </div>
                  <div className={`size-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    perm.enabled ? 'bg-primary border-primary text-background-dark' : 'border-white/10'
                  }`}>
                    {perm.enabled && <span className="material-symbols-outlined text-[14px] font-black">check</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 rounded-2xl bg-primary hover:bg-primary-hover text-background-dark font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(46,255,143,0.2)] transition-all active:scale-95 mt-4"
          >
            Send Invite
          </button>
        </form>
      </div>
    </div>
  );
};

const MembersPage = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Alex Morgan', email: 'alex@gensaas.ai', role: 'ADMIN' as any, status: 'Active', lastActive: 'Just now', avatar: 'https://picsum.photos/seed/alex/64/64' },
    { id: '2', name: 'Jordan Smith', email: 'jordan@gensaas.ai', role: UserRole.TEST_LAB, status: 'Active', lastActive: '2h ago', avatar: 'https://picsum.photos/seed/jordan/64/64' },
    { id: '3', name: 'Casey Reed', email: 'casey@ext.ai', role: 'VIEWER' as any, status: 'Pending', lastActive: 'Invited', avatar: 'https://picsum.photos/seed/casey/64/64' },
    { id: '4', name: 'Riley Quinn', email: 'riley@gensaas.ai', role: UserRole.SELLER, status: 'Active', lastActive: '1d ago', avatar: 'https://picsum.photos/seed/riley/64/64' },
  ]);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = (newMember: Member) => {
    setMembers([newMember, ...members]);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-10 max-w-[1600px] mx-auto w-full">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">Team Members</h1>
          <p className="text-text-secondary text-[11px] md:text-sm font-medium uppercase tracking-widest mt-1">Manage infrastructure access</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-11 md:h-12 px-6 bg-primary hover:bg-primary-hover text-background-dark text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          <span>Invite Member</span>
        </button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col gap-1">
          <p className="text-text-secondary text-[8px] md:text-[10px] font-black uppercase tracking-widest">Total</p>
          <p className="text-2xl md:text-4xl font-black text-white">{members.length}</p>
        </div>
        <div className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col gap-1">
          <p className="text-text-secondary text-[8px] md:text-[10px] font-black uppercase tracking-widest">Active Seats</p>
          <p className="text-2xl md:text-4xl font-black text-primary">
            {members.filter(m => m.status === 'Active').length}
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-3 md:p-4 border-white/5 flex items-center">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-lg">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-white text-xs md:text-sm rounded-xl pl-12 p-3 outline-none focus:ring-1 focus:ring-primary/30 transition-all" 
            placeholder="Search team members..." 
          />
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary">
                <th className="p-4 md:p-5">Member</th>
                <th className="p-4 md:p-5">RBAC Role</th>
                <th className="p-4 md:p-5">Status</th>
                <th className="p-4 md:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="group hover:bg-primary/5 transition-all">
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-3">
                      <div className="size-9 md:size-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-white group-hover:text-primary transition-colors text-xs md:text-sm">{member.name}</p>
                        <p className="text-text-secondary font-mono text-[9px] tracking-tight">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{member.role}</span>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      member.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-right">
                    <button className="size-8 hover:bg-white/5 rounded-lg text-text-secondary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InviteMemberModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        onInvite={handleInvite}
      />
    </div>
  );
};

export default MembersPage;
