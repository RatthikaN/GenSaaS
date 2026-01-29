
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate, NavLink } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProjectsPage from './pages/ProjectsPage.tsx';
import MarketplacePage from './pages/MarketplacePage.tsx';
import AuditQueuePage from './pages/AuditQueuePage.tsx';
import AuditReportPage from './pages/AuditReportPage.tsx';
import TestExecutionPage from './pages/TestExecutionPage.tsx';
import CreditDashboard from './pages/CreditDashboard.tsx';
import FixWorkspacePage from './pages/FixWorkspacePage.tsx';
import BuildPage from './pages/BuildPage.tsx';
import CertificatePage from './pages/CertificatePage.tsx';
import MembersPage from './pages/MembersPage.tsx';
import SettingsLayout from './pages/Settings/SettingsLayout.tsx';
import ProfilePage from './pages/Settings/ProfilePage.tsx';
import AccountPage from './pages/Settings/AccountPage.tsx';
import SubscriptionPage from './pages/Settings/SubscriptionPage.tsx';
import SecurityPage from './pages/Settings/SecurityPage.tsx';
import NotificationsPage from './pages/Settings/NotificationsPage.tsx';
import CommunityHub from './pages/CommunityHub.tsx';
import { UserRole } from './types.ts';

export const RobotScanningIcon = ({ className = "size-full" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2eff8f" stopOpacity="0" />
        <stop offset="50%" stopColor="#2eff8f" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#2eff8f" stopOpacity="0" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g transform="translate(0, -2)">
      <path d="M30 45 Q30 25 50 25 Q70 25 70 45 L70 55 Q70 60 65 60 L35 60 Q30 60 30 55 Z" 
            fill="none" stroke="#2eff8f" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="42" cy="42" r="2.5" fill="#2eff8f" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="58" cy="42" r="2.5" fill="#2eff8f" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <path d="M50 25 L50 15" stroke="#2eff8f" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="14" r="2" fill="#2eff8f" filter="url(#glow)">
        <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
      </circle>
      <animateTransform attributeName="transform" type="translate" values="0 -2; 0 1; 0 -2" dur="4s" repeatCount="indefinite" />
    </g>
    <g transform="translate(0, 10)">
      <path d="M25 75 L48 82 L48 65 L25 58 Z" fill="none" stroke="#2eff8f" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <path d="M75 75 L52 82 L52 65 L75 58 Z" fill="none" stroke="#2eff8f" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <path d="M48 82 Q50 83 52 82" fill="none" stroke="#2eff8f" strokeWidth="2" />
      <rect x="25" y="60" width="50" height="4" fill="url(#scanGradient)" filter="url(#glow)">
        <animate attributeName="y" values="58;78;58" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;1;0.2" dur="2.5s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
);

export const Logo = ({ className = "h-8", showText = true }: { className?: string, showText?: boolean }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative group">
      <div className="size-9 md:size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(46,255,143,0.15)] group-hover:shadow-[0_0_30px_rgba(46,255,143,0.3)] transition-all duration-500 overflow-hidden">
        <RobotScanningIcon />
      </div>
    </div>
    {showText && (
      <div className="flex flex-col">
        <span className="text-white text-base md:text-lg font-black leading-none tracking-tight">GenSaaS</span>
        <span className="text-primary/60 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mt-0.5">Test Lab</span>
      </div>
    )}
  </div>
);

const EcosystemNav = () => {
  const platforms = [
    { name: 'Hub', icon: 'hub', path: '/dashboard', color: 'text-[#60a5fa]' },
    { name: 'Build', icon: 'handyman', path: '/build', color: 'text-[#f59e0b]' },
    { name: 'Community', icon: 'diversity_3', path: '/hub', color: 'text-[#f472b6]' },
    { name: 'Market', icon: 'storefront', path: '/marketplace', color: 'text-[#2dd4bf]' },
  ];

  return (
    <div className="flex items-center gap-1 md:gap-1.5 p-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl md:rounded-2xl shadow-2xl">
      {platforms.map((platform) => (
        <Link
          key={platform.name}
          to={platform.path}
          className="group flex items-center gap-0 hover:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl transition-all duration-500 hover:bg-white/10"
        >
          <span className={`material-symbols-outlined text-[16px] md:text-[20px] ${platform.color} transition-colors duration-300`}>
            {platform.icon}
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white transition-all duration-500 ease-in-out group-hover:max-w-[100px]">
            {platform.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

const SidebarContent = ({ currentRole, closeMenu }: { currentRole: UserRole, closeMenu?: () => void }) => {
  const location = useLocation();
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(location.pathname.startsWith('/settings'));
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', roles: [UserRole.TEST_LAB, UserRole.SELLER, UserRole.CUSTOMER] },
    { name: 'Projects', path: '/projects', icon: 'layers', roles: [UserRole.TEST_LAB, UserRole.SELLER] },
    { name: 'Certificates', path: '/audit', icon: 'workspace_premium', roles: [UserRole.TEST_LAB] },
    { name: 'Members', path: '/members', icon: 'group', roles: [UserRole.TEST_LAB] },
  ];

  const settingsSubItems = [
    { name: 'Profile', path: '/settings/profile', icon: 'person' },
    { name: 'Account', path: '/settings/account', icon: 'account_balance' },
    { name: 'Credits', path: '/credits', icon: 'bolt' },
    { name: 'Security', path: '/settings/security', icon: 'security' },
    { name: 'Notifications', path: '/settings/notifications', icon: 'notifications' },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <div className="p-5 flex flex-col h-full justify-between overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-8">
        <Link to="/" onClick={closeMenu} className="px-2">
          <Logo />
        </Link>
        <nav className="space-y-1">
          {filteredItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive(item.path)
                  ? 'bg-primary/15 text-primary border border-primary/20 shadow-[0_0_15px_rgba(46,255,143,0.1)]'
                  : 'text-[#9cbaaa]/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive(item.path) ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-wider">{item.name}</span>
            </Link>
          ))}
          <div className="mt-1">
            <button
              onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                location.pathname.startsWith('/settings')
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-[#9cbaaa]/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[20px] ${location.pathname.startsWith('/settings') ? 'fill-1' : ''}`}>
                  settings
                </span>
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-wider">Settings</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isSettingsExpanded ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSettingsExpanded ? 'max-h-[300px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="pl-6 flex flex-col gap-0.5 border-l border-white/5 ml-6">
                {settingsSubItems.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    onClick={closeMenu}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all border border-transparent ${
                      isActive(sub.path)
                        ? 'text-primary bg-primary/5 border-primary/10'
                        : 'text-[#9cbaaa]/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{sub.icon}</span>
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <Link 
          to="/login" 
          onClick={closeMenu}
          className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all group shadow-sm active:scale-95"
        >
          <div className="size-8 rounded-lg bg-red-500/5 flex items-center justify-center group-hover:bg-red-500/20 transition-all">
            <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">logout</span>
          </div>
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em]">Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

const WorkspaceHeader = ({ onMobileMenuToggle }: { onMobileMenuToggle: () => void }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-[40] w-full bg-background-dark/60 backdrop-blur-xl border-b border-white/5 h-16 md:h-20 flex items-center px-4 md:px-8 justify-between shadow-xl">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMobileMenuToggle}
          className="lg:hidden size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>
        <Link to="/" className="flex lg:hidden">
          <Logo className="h-6" showText={false} />
        </Link>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <EcosystemNav />
        <div className="hidden sm:flex items-center gap-4 pl-4 md:pl-6 border-l border-white/10 relative" ref={menuRef}>
          <button className="relative size-10 flex items-center justify-center text-white/40 hover:text-primary transition-all group">
            <span className="material-symbols-outlined text-[22px] md:text-2xl group-hover:scale-110 transition-transform">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full ring-2 ring-background-dark animate-pulse"></span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="size-10 rounded-xl bg-slate-700 border border-white/10 overflow-hidden shrink-0 shadow-lg group hover:border-primary/40 transition-all cursor-pointer active:scale-95"
            >
               <img src="https://picsum.photos/seed/user/44/44" alt="User" className="w-full h-full object-cover" />
            </button>

            {/* Profile Settings Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 glass-panel rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 animate-fade-in overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/5 mb-1">
                  <p className="text-white text-[11px] font-black uppercase tracking-wider">Alex Morgan</p>
                  <p className="text-primary text-[9px] font-black uppercase tracking-[0.15em] mt-0.5">Administrator</p>
                </div>
                <div className="flex flex-col gap-0.5">
                  <Link 
                    to="/settings/profile" 
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase text-[#9cbaaa]/70 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    Profile Settings
                  </Link>
                  <Link 
                    to="/settings/security" 
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase text-[#9cbaaa]/70 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">security</span>
                    Security
                  </Link>
                  <Link 
                    to="/credits" 
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase text-[#9cbaaa]/70 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                    Credits
                  </Link>
                  <div className="h-px bg-white/5 my-1" />
                  <Link 
                    to="/login" 
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const SettingsIncompleteAlert = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith('/settings');
  if (isDismissed || isSettingsPage) return null;

  return (
    <div className="bg-yellow-500/10 backdrop-blur-md border-b border-yellow-500/20 px-4 py-2 flex items-center justify-between animate-fade-in z-[30]">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="size-6 md:size-7 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500">
          <span className="material-symbols-outlined text-sm md:text-lg font-bold">priority_high</span>
        </div>
        <p className="text-[8px] md:text-[10px] text-white/90 font-black uppercase tracking-wider">
          Laboratory Setup Incomplete <span className="hidden sm:inline opacity-40 mx-2">|</span> 
          <span className="hidden sm:inline text-text-secondary">Your audit profile and security layers are missing critical data.</span>
        </p>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Link 
          to="/settings/profile" 
          className="px-3 py-1.5 rounded-lg bg-yellow-500 text-background-dark text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-all"
        >
          Complete Setup
        </Link>
        <button onClick={() => setIsDismissed(true)} className="text-text-secondary hover:text-white transition-colors">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};

const Layout = ({ currentRole, children }: { currentRole: UserRole, children?: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const noHeaderRoutes = ['/', '/login', '/signup'];
  const isLandingOrLogin = noHeaderRoutes.includes(location.pathname);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen">
      {!isLandingOrLogin && (
        <>
          <aside className="w-64 hidden lg:flex flex-col border-r border-white/5 bg-background-dark/20 backdrop-blur-xl h-screen sticky top-0 shrink-0 z-[50]">
            <SidebarContent currentRole={currentRole} />
          </aside>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
          )}
          <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-[#05100a] backdrop-blur-xl border-r border-white/5 z-[70] lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
             <SidebarContent currentRole={currentRole} closeMenu={() => setIsMobileMenuOpen(false)} />
          </aside>
        </>
      )}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {!isLandingOrLogin && (
          <>
            <WorkspaceHeader onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
            <SettingsIncompleteAlert />
          </>
        )}
        <div className="flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [role, setRole] = useState<UserRole>(UserRole.TEST_LAB);
  return (
    <HashRouter>
      <Layout currentRole={role}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard role={role} />} />
          <Route path="/projects" element={<ProjectsPage role={role} />} />
          <Route path="/marketplace" element={<MarketplacePage role={role} />} />
          <Route path="/audit" element={<AuditQueuePage />} />
          <Route path="/audit/report/:id" element={<AuditReportPage />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/tests/run/:id" element={<TestExecutionPage />} />
          <Route path="/credits" element={<CreditDashboard />} />
          <Route path="/fix-workspace" element={<FixWorkspacePage />} />
          <Route path="/hub" element={<CommunityHub />} />
          <Route path="/settings" element={<Navigate to="/settings/profile" replace />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
