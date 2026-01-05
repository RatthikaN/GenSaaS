
import React, { useState } from 'react';
import { Member, UserRole } from '../types.ts';

const InviteMemberModal = ({ isOpen, onClose, onInvite }: { isOpen: boolean, onClose: () => void, onInvite: (email: string, role: string) => void }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('VIEWER');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-md rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Invite Member</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
              placeholder="colleague@gienlab.ai"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Assign Role</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="VIEWER">Viewer</option>
              <option value="ADMIN">Admin</option>
              <option value="TEST_LAB">Auditor (Test Lab)</option>
              <option value="SELLER">Seller</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => { onInvite(email, role); onClose(); }}
          className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-background-dark font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(46,255,143,0.3)] transition-all"
        >
          Send Invitation
        </button>
      </div>
    </div>
  );
};

const MembersPage = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Alex Morgan', email: 'alex@gienlab.ai', role: 'ADMIN', status: 'Active', lastActive: 'Just now', avatar: 'https://picsum.photos/seed/alex/64/64' },
    { id: '2', name: 'Jordan Smith', email: 'jordan@gienlab.ai', role: UserRole.TEST_LAB, status: 'Active', lastActive: '2 hours ago', avatar: 'https://picsum.photos/seed/jordan/64/64' },
    { id: '3', name: 'Casey Reed', email: 'casey@external.com', role: 'VIEWER', status: 'Pending', lastActive: 'Invited yesterday', avatar: 'https://picsum.photos/seed/casey/64/64' },
    { id: '4', name: 'Riley Quinn', email: 'riley@gienlab.ai', role: UserRole.SELLER, status: 'Active', lastActive: '1 day ago', avatar: 'https://picsum.photos/seed/riley/64/64' },
    { id: '5', name: 'Taylor Bay', email: 'taylor@gienlab.ai', role: 'VIEWER', status: 'Deactivated', lastActive: 'Oct 20, 2023', avatar: 'https://picsum.photos/seed/taylor/64/64' },
  ]);

  const handleInvite = (email: string, role: string) => {
    const newMember: Member = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      role: role as any,
      status: 'Pending',
      lastActive: 'Just now',
      avatar: `https://picsum.photos/seed/${email}/64/64`
    };
    setMembers([newMember, ...members]);
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Team Members</h1>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary hover:bg-primary-hover text-background-dark text-xs font-black uppercase tracking-widest shadow-[0_0_25px_rgba(46,255,143,0.3)] transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">person_add</span>
          <span>Invite Member</span>
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-1">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]">Total Members</p>
          <p className="text-4xl font-black text-white">{members.length}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-1">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]">Active Seats</p>
          <p className="text-4xl font-black text-primary">{members.filter(m => m.status === 'Active').length}</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col gap-1">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]">Pending Invites</p>
          <p className="text-4xl font-black text-yellow-500">{members.filter(m => m.status === 'Pending').length}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-white/5 shadow-lg">
        <div className="relative flex-1 w-full max-w-lg">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-lg">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 text-white text-xs md:text-sm rounded-xl block pl-12 p-3 outline-none focus:ring-1 focus:ring-primary/40 transition-all placeholder:text-white/20" 
            placeholder="Search by name or email..." 
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary">
                <th className="p-4 md:p-5">Member</th>
                <th className="p-4 md:p-5">RBAC Role</th>
                <th className="p-4 md:p-5">Status</th>
                <th className="p-4 md:p-5">Last Activity</th>
                <th className="p-4 md:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="group hover:bg-primary/5 transition-all">
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-white group-hover:text-primary transition-colors text-xs md:text-sm">{member.name}</p>
                        <p className="text-text-secondary font-mono text-[9px] tracking-tight">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-primary/60">shield_person</span>
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      member.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' :
                      member.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-text-secondary text-[11px] font-medium">
                    {member.lastActive}
                  </td>
                  <td className="p-4 md:p-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        title="Edit Role"
                        className="size-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-text-secondary hover:text-white transition-all group/btn"
                      >
                        <span className="material-symbols-outlined text-[18px] group-hover/btn:scale-110">edit</span>
                      </button>
                      <button 
                        title="Revoke Access"
                        className="size-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-text-secondary hover:text-red-400 transition-all group/btn"
                      >
                        <span className="material-symbols-outlined text-[18px] group-hover/btn:scale-110">person_remove</span>
                      </button>
                    </div>
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
