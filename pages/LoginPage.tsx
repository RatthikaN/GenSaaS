
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../App.tsx';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background-dark relative flex items-center justify-center p-6">
       <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(46,255,143,0.05)_0%,_transparent_50%)]"></div>
       <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-10">
         <Link to="/">
           <Logo className="h-6" />
         </Link>
       </div>

       <div className="glass-panel w-full max-w-md rounded-3xl p-8 md:p-10 relative overflow-hidden group z-10 shadow-2xl border border-white/5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
            <p className="text-text-secondary text-sm">Access the enterprise suite to continue your work.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-lg">mail</span>
                <input className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="name@company.com" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                 <a href="#" className="text-[10px] font-bold text-primary uppercase tracking-tighter hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-lg">lock</span>
                <input type="password" className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="••••••••" />
              </div>
            </div>

            <Link to="/dashboard" className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-background-dark font-bold text-sm shadow-[0_0_20px_rgba(46,255,143,0.3)] transition-all flex items-center justify-center gap-2 group">
              <span>Log In</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-lg">arrow_forward</span>
            </Link>
          </form>

          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest">Or continue with</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxnm4IYk_dYrRzon_eEV5HhAHhNaoWiD9W0ZigXMC3Xkw5FEVAe6Jko3pV6yF9YZmroAJAAR2ZxtAuUkPPXbP1il6224z3OhphzpSMKKKJ25NyGWJx2hKdMYjDKz1cUzAaFM2znGr4jtXf6aDSdch563TI3QyimNZmriPdSs8lELOfePYKJzSinuCqt0rvpwrAMuGDAgyVzuf2nQNOh-fCGVtaApA7l0SqpSwRNaf11EtGW2f6J0JNtnbzBDcHpEXnD4irAFwL0EL2" className="size-5" alt="Google" />
                <span className="text-xs font-bold text-white">Google</span>
             </button>
             <button className="h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-white text-xl">terminal</span>
                <span className="text-xs font-bold text-white">SSO</span>
             </button>
          </div>

          <p className="text-center text-xs text-text-secondary mt-10">
            Need an enterprise account? <a href="#" className="text-white hover:text-primary transition-colors underline underline-offset-4">Sign up here</a>
          </p>
       </div>
    </div>
  );
};

export default LoginPage;
