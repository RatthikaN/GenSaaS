
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../App.tsx';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: 'text-gray-500' };
    let score = 0;
    if (pwd.length > 6) score++;
    if (pwd.length > 10) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: 'WEAK', color: 'text-red-500', barColor: 'bg-red-500' };
    if (score === 2) return { score: 2, label: 'MEDIUM', color: 'text-orange-500', barColor: 'bg-orange-500' };
    if (score === 3) return { score: 3, label: 'STRONG', color: 'text-primary', barColor: 'bg-primary' };
    return { score: 4, label: 'SECURE', color: 'text-primary', barColor: 'bg-primary' };
  };

  const strength = getPasswordStrength(password);

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
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-lg font-light">mail</span>
                <input 
                  type="email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="dev@example.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                 <a href="#" className="text-[10px] font-black text-primary uppercase tracking-tighter hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>

              {/* Password Strength Indicator Bars */}
              <div className="flex items-center justify-between gap-1.5 mt-3 px-1">
                <div className="flex-1 flex gap-1.5 h-1">
                  {[1, 2, 3, 4].map((index) => (
                    <div 
                      key={index}
                      className={`flex-1 rounded-full transition-all duration-500 ${
                        index <= strength.score ? strength.barColor : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                {strength.label && (
                  <span className={`text-[10px] font-black uppercase ml-2 tracking-widest ${strength.color}`}>
                    {strength.label}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
               <input 
                 type="checkbox" 
                 id="terms"
                 className="mt-1 size-5 rounded-lg bg-white/5 border-white/10 text-primary focus:ring-primary focus:ring-offset-background-dark cursor-pointer transition-all"
               />
               <label htmlFor="terms" className="text-xs text-text-secondary leading-relaxed cursor-pointer select-none">
                 I agree to the <span className="text-primary font-bold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary font-bold hover:underline cursor-pointer">Privacy Policy</span>.
               </label>
            </div>

            <Link to="/dashboard" className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-hover text-background-dark font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(46,255,143,0.2)] transition-all flex items-center justify-center gap-2 group active:scale-95">
              <span>Create Account</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-xl font-black">arrow_forward</span>
            </Link>
          </form>

          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] text-gray-500 uppercase font-bold tracking-widest">Or continue with</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxnm4IYk_dYrRzon_eEV5HhAHhNaoWiD9W0ZigXMC3Xkw5FEVAe6Jko3pV6yF9YZmroAJAAR2ZxtAuUkPPXbP1il6224z3OhphzpSMKKKJ25NyGWJx2hKdMYjDKz1cUzAaFM2znGr4jtXf6aDSdch563TI3QyimNZmriPdSs8lELOfePYKJzSinuCqt0rvpwrAMuGDAgyVzuf2nQNOh-fCGVtaApA7l0SqpSwRNaf11EtGW2f6J0JNtnbzBDcHpEXnD4irAFwL0EL2" className="size-5" alt="Google" />
                <span className="text-xs font-bold text-white">Google</span>
             </button>
             <button className="h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                <span className="material-symbols-outlined text-white text-xl font-light">terminal</span>
                <span className="text-xs font-bold text-white">SSO</span>
             </button>
          </div>

          <p className="text-center text-xs text-text-secondary mt-10">
            Already have an account? <a href="#" className="text-white font-bold hover:text-primary transition-colors underline underline-offset-4">Log in here</a>
          </p>
       </div>
    </div>
  );
};

export default LoginPage;
