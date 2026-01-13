
import React, { useState, useEffect } from 'react';
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
import CertificatePage from './pages/CertificatePage.tsx';
import MembersPage from './pages/MembersPage.tsx';
import SettingsLayout from './pages/Settings/SettingsLayout.tsx';
import ProfilePage from './pages/Settings/ProfilePage.tsx';
import AccountPage from './pages/Settings/AccountPage.tsx';
import SubscriptionPage from './pages/Settings/SubscriptionPage.tsx';
import SecurityPage from './pages/Settings/SecurityPage.tsx';
import NotificationsPage from './pages/Settings/NotificationsPage.tsx';
import { UserRole } from './types.ts';

// Custom Animated Robot Scanning SVG Icon
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

    {/* Robot Head */}
    <g transform="translate(0, -2)">
      <path d="M30 45 Q30 25 50 25 Q70 25 70 45 L70 55 Q70 60 65 60 L35 60 Q30 60 30 55 Z" 
            fill="none" stroke="#2eff8f" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Eyes */}
      <circle cx="42" cy="42" r="2.5" fill="#2eff8f" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="58" cy="42" r="2.5" fill="#2eff8f" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Antenna */}
      <path d="M50 25 L50 15" stroke="#2eff8f" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="14" r="2" fill="#2eff8f" filter="url(#glow)">
        <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
      </circle>
      
      <animateTransform attributeName="transform" type="translate" values="0 -2; 0 1; 0 -2" dur="4s" repeatCount="indefinite" />
    </g>

    {/* Book */}
    <g transform="translate(0, 10)">
      <path d="M25 75 L48 82 L48 65 L25 58 Z" fill="none" stroke="#2eff8f" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <path d="M75 75 L52 82 L52 65 L75 58 Z" fill="none" stroke="#2eff8f" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
      <path d="M48 82 Q50 83 52 82" fill="none" stroke="#2eff8f" strokeWidth="2" />
      
      {/* Scanning Beam */}
      <rect x="25" y="60" width="50" height="4" fill="url(#scanGradient)" filter="url(#glow)">
        <animate attributeName="y" values="58;78;58" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;1;0.2" dur="2.5s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
);

// Reusable Logo Component
export const Logo = ({ className = "h-8", showText = true }: { className?: string, showText?: boolean }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative group">
      {/* Brand Icon Replacement with Custom Animated SVG */}
      <div className="size-10 md:size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(46,255,143,0.15)] group-hover:shadow-[0_0_30px_rgba(46,255,143,0.3)] transition-all duration-500 overflow-hidden">
        <RobotScanningIcon />
      </div>
      <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
    </div>
    {showText && (
      <div className="flex flex-col">
        <span className="text-white text-lg font-black leading-none tracking-tight">GenSaaS</span>
        <span className="text-primary/60 text-[9px] font-black uppercase tracking-[0.2em] mt-0.5">Test Lab</span>
      </div>
    )}
  </div>
);

const EcosystemNav = ({ compact = false }: { compact?: boolean }) => {
  const platforms = [
    { name: 'Community', icon: 'forum', path: '/community' },
    { name: 'Build Studio', icon: 'deployed_code', path: '/build' },
    { name: 'Hub Studio', icon: 'hub', path: '/hub' },
    { name: 'Market Place', icon: 'storefront', path: '/marketplace' },
  ];

  return (
    <div className={`flex items-center gap-1 p-1 bg-black/40 backdrop-blur-xl border border-white/5 rounded-xl md:rounded-2xl shadow-2xl`}>
      {platforms.map((platform) => (
        <Link
          key={platform.name}
          to={platform.path}
          className={`group flex items-center gap-0 ${compact ? '' : 'hover:gap-2 md:hover:gap-3'} px-2 md:px-3 py-2 rounded-lg md:rounded-xl transition-all duration-500 ease-out hover:bg-primary/10 border border-transparent hover:border-primary/20`}
        >
          <span className="material-symbols-outlined text-[16px] md:text-[18px] text-text-secondary group-hover:text-primary transition-colors duration-300">
            {platform.icon}
          </span>
          {!compact && (
            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-in-out whitespace-nowrap text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-primary">
              {platform.name}
            </span>
          )}
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
    { name: 'Audit', path: '/projects', icon: 'layers', roles: [UserRole.TEST_LAB, UserRole.SELLER] },
    { name: 'Certificate', path: '/audit', icon: 'workspace_premium', roles: [UserRole.TEST_LAB] },
    { name: 'Members', path: '/members', icon: 'group', roles: [UserRole.TEST_LAB] },
  ];

  const settingsSubItems = [
    { name: 'Profile', path: '/settings/profile', icon: 'person' },
    { name: 'Account', path: '/settings/account', icon: 'account_balance' },
    { name: 'Subscription', path: '/settings/subscription', icon: 'credit_card' },
    { name: 'Security', path: '/settings/security', icon: 'security' },
    { name: 'Notifications', path: '/settings/notifications', icon: 'notifications' },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <div className="p-6 flex flex-col h-full justify-between overflow-y-auto bg-[#05100a]">
      <div className="flex flex-col gap-8">
        <Link to="/" onClick={closeMenu}>
          <Logo />
        </Link>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            {filteredItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(46,255,143,0.1)]'
                    : 'text-[#9cbaaa] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive(item.path) ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-xs font-bold tracking-tight">{item.name}</span>
              </Link>
            ))}

            {/* Collapsible Settings Dropdown */}
            <div className="mt-1">
              <button
                onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  location.pathname.startsWith('/settings')
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(46,255,143,0.1)]'
                    : 'text-[#9cbaaa] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${location.pathname.startsWith('/settings') ? 'fill-1' : ''}`}>
                    settings
                  </span>
                  <span className="text-xs font-bold tracking-tight">Settings</span>
                </div>
                <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isSettingsExpanded ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Settings Sub-items */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSettingsExpanded ? 'max-h-[300px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                <div className="pl-6 flex flex-col gap-0.5 border-l border-white/5 ml-6">
                  {settingsSubItems.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      onClick={closeMenu}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[11px] font-bold tracking-tight transition-all border border-transparent ${
                        location.pathname === sub.path
                          ? 'text-primary bg-primary/5 border-primary/10'
                          : 'text-text-secondary/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{sub.icon}</span>
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/20 transition-all cursor-pointer">
          <div className="size-8 rounded-full bg-slate-700 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
             <img src="https://picsum.photos/seed/user/32/32" alt="User" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-white text-[10px] font-bold truncate">Alex Morgan</span>
            <span className="text-primary text-[9px] uppercase font-bold tracking-tighter">Enterprise Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkspaceHeader = ({ onMobileMenuToggle }: { onMobileMenuToggle: () => void }) => {
  return (
    <header className="sticky top-0 z-[40] w-full bg-background-dark/80 backdrop-blur-md border-b border-white/5 h-16 md:h-20 flex items-center px-4 md:px-8 justify-between">
      {/* Left Section: Branding/Mobile Menu */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMobileMenuToggle}
          className="lg:hidden size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <Link to="/" className="flex lg:hidden">
          <Logo className="h-6" showText={false} />
        </Link>
      </div>

      {/* Right Section: Ecosystem Navigation */}
      <div className="flex items-center">
        <EcosystemNav />
      </div>
    </header>
  );
};

const Layout = ({ currentRole, children }: { currentRole: UserRole, children?: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const noHeaderRoutes = ['/', '/login', '/signup'];
  const hasWorkspaceHeader = !noHeaderRoutes.includes(location.pathname);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-background-dark">
      {hasWorkspaceHeader && (
        <>
          {/* Desktop Sidebar */}
          <aside className="w-64 hidden lg:flex flex-col border-r border-white/5 bg-[#0b1610] h-screen sticky top-0 shrink-0 z-[50]">
            <SidebarContent currentRole={currentRole} />
          </aside>
          
          {/* Mobile Sidebar Drawer */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          
          <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-[#05100a] border-r border-white/5 z-[70] lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
             <SidebarContent currentRole={currentRole} closeMenu={() => setIsMobileMenuOpen(false)} />
          </aside>
        </>
      )}

      <main className="flex-1 flex flex-col min-w-0 relative">
        {hasWorkspaceHeader && (
          <WorkspaceHeader onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
        )}
        <div className="flex-1">
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
          <Route path="/tests/run/:id" element={<TestExecutionPage />} />
          <Route path="/credits" element={<CreditDashboard />} />
          <Route path="/fix-workspace" element={<FixWorkspacePage />} />
          
          {/* Settings Routes */}
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
