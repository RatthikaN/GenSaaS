
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../App.tsx';

const LandingPage = () => {
  return (
    <div className="bg-background-dark min-h-screen">
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/">
              <Logo className="h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden sm:flex px-4 text-sm font-semibold text-white hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link to="/dashboard" className="flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-background-dark shadow-[0_0_15px_rgba(46,255,143,0.3)] hover:shadow-[0_0_20px_rgba(46,255,143,0.5)] transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden pt-12 pb-20 sm:pt-24 sm:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wide">v2.0 Now Available</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
                Certify Your <br/>
                <span className="text-gradient">AI Infrastructure</span>
              </h1>
              <p className="text-base md:text-lg text-text-secondary mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                The enterprise-grade test lab for compliance, performance, and security. Simulate millions of scenarios before you deploy.
              </p>
            </div>
            <div className="relative w-full aspect-square max-w-[400px] md:max-w-[500px] lg:max-w-none mx-auto order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-[60px] animate-pulse"></div>
              <div className="relative glass-panel rounded-2xl w-full h-full p-2 overflow-hidden border border-white/10 shadow-2xl">
                <img className="w-full h-full rounded-xl object-cover opacity-80" src="https://picsum.photos/seed/abstract/800/800" alt="Tech Graphic" />
                
                {/* Responsive Badges */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 glass-panel bg-black/60 p-2 md:p-4 rounded-xl flex items-center gap-2 md:gap-3 animate-bounce" style={{animationDuration: '3s'}}>
                  <div className="text-primary material-symbols-outlined text-xl md:text-2xl">check_circle</div>
                  <div>
                    <div className="text-[8px] md:text-xs text-gray-400">SOC2 Compliance</div>
                    <div className="text-xs md:text-sm font-bold text-white">Passed</div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 md:bottom-12 md:left-8 glass-panel bg-black/60 p-2 md:p-4 rounded-xl flex items-center gap-2 md:gap-3 animate-bounce" style={{animationDuration: '4s'}}>
                  <div className="text-primary material-symbols-outlined text-xl md:text-2xl">bolt</div>
                  <div>
                    <div className="text-[8px] md:text-xs text-gray-400">Latency</div>
                    <div className="text-xs md:text-sm font-bold text-white">12ms (avg)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
