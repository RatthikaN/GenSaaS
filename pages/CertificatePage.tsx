
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CertificatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#05100a] p-4 md:p-12 flex flex-col items-center justify-center animate-in zoom-in duration-500">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-8 print:gap-0">
        {/* Actions - Hidden on print */}
        <div className="flex justify-between items-center print:hidden">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Report
          </button>
          <div className="flex gap-4">
            <button 
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-xl glass-panel text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">print</span>
              Print Certificate
            </button>
            <button 
              className="px-6 py-2.5 rounded-xl bg-primary text-background-dark font-bold text-sm shadow-lg hover:bg-primary-hover transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">share</span>
              Share Certificate
            </button>
          </div>
        </div>

        {/* The Certificate Card */}
        <div className="relative bg-[#101814] border-[12px] border-[#1a2b22] p-8 md:p-16 rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden print:border-[20px] print:shadow-none">
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          {/* Holographic Seal Background */}
          <div className="absolute top-[-100px] right-[-100px] size-[300px] bg-primary/10 rounded-full blur-[80px]"></div>

          <div className="relative border border-primary/20 p-8 md:p-12 flex flex-col items-center text-center gap-8 md:gap-12">
            
            {/* Header Logo */}
            <div className="flex flex-col items-center gap-4">
              <div className="size-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(46,255,143,0.2)]">
                <span className="material-symbols-outlined text-5xl">science</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-primary font-display font-bold text-xl tracking-[0.2em] uppercase">AI Test Lab</h2>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Enterprise Compliance Infrastructure</p>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
                Certificate of <br/>
                <span className="text-primary">Integrity</span>
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-primary/30"></div>
                <p className="text-text-secondary italic font-display text-lg">Official Audit Certification</p>
                <div className="h-[1px] w-12 bg-primary/30"></div>
              </div>
            </div>

            {/* Certification Details */}
            <div className="max-w-xl space-y-6">
              <p className="text-white/70 text-lg leading-relaxed">
                This document officially certifies that the project identified below has successfully completed 
                a comprehensive AI integrity audit and meets all required safety and security standards.
              </p>
              
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Authorized Project Name</span>
                  <span className="text-2xl font-bold text-white">{id || 'AI-Core-System-Alpha'}</span>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[10px] font-bold text-white/40 uppercase">Compliance Standard</span>
                    <span className="text-sm font-bold text-primary">SOC2 v4.1.2</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-[10px] font-bold text-white/40 uppercase">Security Grade</span>
                    <span className="text-sm font-bold text-primary">A+ Certified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 mt-4">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="size-24 border-2 border-primary/20 flex items-center justify-center p-2 rounded-sm bg-white/5">
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=verified-ai-lab" alt="Verification QR" className="opacity-60 invert" />
                </div>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-tighter">Scan to verify authenticity</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-48 border-b border-primary/40 flex items-end justify-center pb-2">
                  <span className="font-display italic text-lg text-white/60">Dr. Aris Morgan</span>
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Chief Audit Executive</span>
              </div>

              <div className="text-center md:text-right space-y-1">
                <p className="text-[10px] font-bold text-white/40 uppercase">Verification ID</p>
                <p className="text-xs font-mono text-primary font-bold">SHA-256: 8a9f...c21d</p>
                <p className="text-[10px] text-white/20">Issued on October 25, 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Footer - Hidden on print */}
        <p className="text-center text-text-secondary text-[10px] uppercase font-bold tracking-widest print:hidden">
          This digital certificate is a non-transferable record of audit performance.
        </p>
      </div>
    </div>
  );
};

export default CertificatePage;
