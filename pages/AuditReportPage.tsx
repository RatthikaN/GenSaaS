
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RobotScanningIcon } from '../App.tsx';
import { jsPDF } from 'jspdf';

interface TestPhase {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface Vulnerability {
  id: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  folder: string;
  file: string;
  bug: string;
  fixDescription: string;
  repairCost: number;
}

const DetailedReportModal = ({ isOpen, onClose, auditId }: { isOpen: boolean, onClose: () => void, auditId: string }) => {
  const navigate = useNavigate();
  const [activeFixId, setActiveFixId] = useState<string | null>(null);
  const [isFixing, setIsFixing] = useState<string | null>(null);
  const [fixedIds, setFixedIds] = useState<string[]>([]);
  
  // Mocked user credits
  const [userCredits, setUserCredits] = useState(2750);

  const initialVulnerabilities: Vulnerability[] = [
    { 
      id: 'VIOL-01',
      type: 'SQL Injection Risk', 
      severity: 'Critical',
      folder: 'backend/src/controllers/',
      file: 'auth_handler.php',
      bug: 'Unsanitized input detected in user_id parameter during session initialization. Potential for unauthorized data exfiltration via raw SQL concatenation.',
      fixDescription: 'Implement Prepared Statements using PDO. Replace the current raw string literal query with a bound parameter object to isolate user input from query logic.',
      repairCost: 450
    },
    { 
      id: 'VIOL-02',
      type: 'IDOR Vulnerability', 
      severity: 'High',
      folder: 'backend/api/v1/users/',
      file: 'profile_sync.json',
      bug: 'Missing authorization check on resource ID. Users can potentially view sibling profiles by modifying the request URI manually.',
      fixDescription: 'Introduce a policy-based middleware that checks the sub claim in the requester JWT against the target resource ownership ID.',
      repairCost: 280
    }
  ];

  const [vulnerabilities] = useState<Vulnerability[]>(initialVulnerabilities);
  const allFixed = fixedIds.length === vulnerabilities.length;

  if (!isOpen) return null;

  const techStack = [
    { name: 'PHP 8.2 Runtime', desc: 'Core server-side engine handling request lifecycle and session management.', status: 'secure' },
    { name: 'PostgreSQL 15', desc: 'Primary relational data store with robust encryption and row-level security.', status: fixedIds.includes('VIOL-01') ? 'secure' : 'vulnerable' },
    { name: 'React 19 (ESM)', desc: 'Modern frontend orchestration layer utilizing high-performance ES modules.', status: 'secure' }
  ];

  const handleFixWithAI = (v: Vulnerability) => {
    if (userCredits < v.repairCost) {
      navigate('/credits');
      return;
    }
    
    setIsFixing(v.id);
    setTimeout(() => {
      setUserCredits(prev => prev - v.repairCost);
      setFixedIds(prev => [...prev, v.id]);
      setIsFixing(null);
      setActiveFixId(null);
    }, 2500);
  };

  const downloadReportPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let yPos = 30;

    doc.setFillColor(5, 16, 10);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(46, 255, 143);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('GIEN INTEGRITY LAB', margin, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(154, 186, 170);
    doc.text(`AUDIT SESSION: ${auditId}`, margin, yPos);
    yPos += 5;
    doc.text(`ISSUED ON: ${new Date().toLocaleDateString()}`, margin, yPos);
    yPos += 20;

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('Infrastructure Tech Stack', margin, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    techStack.forEach((tech) => {
      doc.setTextColor(46, 255, 143);
      doc.text(`• ${tech.name}`, margin + 5, yPos);
      doc.setTextColor(154, 186, 170);
      doc.text(`  Status: ${tech.status.toUpperCase()}`, margin + 5, yPos + 5);
      yPos += 15;
    });

    yPos += 10;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('Detected Vulnerabilities & Path Mapping', margin, yPos);
    yPos += 12;

    vulnerabilities.forEach((v) => {
      if (yPos > 250) {
        doc.addPage();
        doc.setFillColor(5, 16, 10);
        doc.rect(0, 0, 210, 297, 'F');
        yPos = 30;
      }

      const isVFixed = fixedIds.includes(v.id);
      if (isVFixed) {
        doc.setTextColor(46, 255, 143);
      } else {
        doc.setTextColor(255, 77, 77);
      }
      
      doc.setFontSize(11);
      doc.text(`${v.type} [${v.severity}] ${isVFixed ? '(RESOLVED)' : ''}`, margin, yPos);
      yPos += 6;

      doc.setTextColor(255, 255, 255);
      doc.setFont('courier', 'bold');
      doc.text(`Location: ${v.folder}${v.file}`, margin, yPos);
      yPos += 8;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(154, 186, 170);
      const splitBug = doc.splitTextToSize(`Bug: ${v.bug}`, 170);
      doc.text(splitBug, margin, yPos);
      yPos += (splitBug.length * 5) + 5;

      const splitFix = doc.splitTextToSize(`Recommendation: ${v.fixDescription}`, 170);
      doc.text(splitFix, margin, yPos);
      yPos += (splitFix.length * 5) + 15;
    });

    doc.save(`Gien_Audit_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={onClose}></div>
      <div className="glass-panel w-full max-w-2xl rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden flex flex-col gap-8 animate-in zoom-in duration-300 max-h-[90vh] border-primary/20 shadow-[0_0_80px_rgba(46,255,143,0.1)]">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">System Audit Insight</h3>
            <div className="flex items-center gap-4">
               <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <span className={`size-2 rounded-full ${allFixed ? 'bg-primary' : 'bg-red-500 animate-pulse'}`}></span>
                {allFixed ? 'All Systems Integral' : 'Security Mapping Active'}
               </p>
               <div className="h-4 w-[1px] bg-white/10"></div>
               <p className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">token</span>
                  Balance: {userCredits} CR
               </p>
            </div>
          </div>
          <button onClick={onClose} className="size-10 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-all flex items-center justify-center">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-10 overflow-y-auto pr-2 custom-scrollbar flex-1">
          {/* Tech Stack Breakdown */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-1">Infrastructure Stack</h4>
            <div className="grid grid-cols-1 gap-3">
              {techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/20 transition-all">
                   <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${tech.status === 'secure' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                      <span className="material-symbols-outlined text-xl">{tech.status === 'secure' ? 'verified' : 'warning'}</span>
                   </div>
                   <div className="flex-1">
                      <p className="text-xs font-black text-white uppercase tracking-tight">{tech.name}</p>
                      <p className="text-[10px] text-text-secondary mt-0.5 leading-tight">{tech.desc}</p>
                   </div>
                   <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${tech.status === 'secure' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'}`}>
                     {tech.status}
                   </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vulnerability Mapping */}
          <div className="space-y-4">
            <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] px-1 ${allFixed ? 'text-primary' : 'text-red-400'}`}>
              {allFixed ? 'No Outstanding Violations' : 'Integrity Violations'}
            </h4>
            <div className="space-y-6">
              {vulnerabilities.map((v) => {
                const isVFixed = fixedIds.includes(v.id);
                return (
                  <div key={v.id} className={`space-y-4 p-6 rounded-3xl transition-all ${isVFixed ? 'bg-primary/5 border border-primary/20' : 'bg-red-500/5 border border-red-500/10 hover:border-red-500/30'}`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${isVFixed ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-400'}`}>
                            {isVFixed ? 'RESOLVED' : v.severity}
                           </span>
                           <span className="text-[10px] font-mono text-white/30">{v.id}</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[10px] text-white/40">
                           {v.folder}<span className="text-white font-bold">{v.file}</span>
                        </div>
                    </div>
                    
                    <h5 className={`font-black text-lg ${isVFixed ? 'text-primary' : 'text-white'}`}>{v.type}</h5>
                    <p className="text-xs text-text-secondary leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                      {isVFixed ? 'The vulnerability has been successfully patched by the AI Agent. Integrity verification passed.' : v.bug}
                    </p>

                    {/* Action Buttons - Hide if fixed */}
                    {!isVFixed && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                          <button 
                            onClick={() => setActiveFixId(activeFixId === v.id ? null : v.id)}
                            className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                              activeFixId === v.id ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/5 text-text-secondary hover:text-white'
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm">lightbulb</span>
                            {activeFixId === v.id ? 'Hide Strategy' : 'How to Fix'}
                          </button>
                          
                          <button 
                            onClick={() => handleFixWithAI(v)}
                            disabled={isFixing !== null}
                            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                              userCredits < v.repairCost 
                              ? 'bg-yellow-500 text-background-dark shadow-[0_0_20px_rgba(234,179,8,0.2)]' 
                              : 'bg-primary text-background-dark shadow-[0_0_20px_rgba(46,255,143,0.2)]'
                            }`}
                          >
                            {isFixing === v.id ? (
                              <span className="size-4 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></span>
                            ) : (
                              <span className="material-symbols-outlined text-sm">auto_fix</span>
                            )}
                            {userCredits < v.repairCost ? 'Insufficient Credits' : `Fix with AI (${v.repairCost} CR)`}
                          </button>
                      </div>
                    )}

                    {/* Fix Explanation Drawer */}
                    {activeFixId === v.id && !isVFixed && (
                      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 animate-in slide-in-from-top-2 duration-300">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Repair Logic Prompt</span>
                          </div>
                          <p className="text-[11px] text-text-secondary leading-relaxed uppercase">{v.fixDescription}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-white/5 pt-6">
          {allFixed ? (
            <button 
              onClick={() => navigate(`/certificate/${auditId}`)}
              className="w-full py-5 rounded-2xl bg-primary text-background-dark font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(46,255,143,0.4)] hover:bg-primary-hover hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
            >
              <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">workspace_premium</span>
              Get Official Certificate
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <button 
                  onClick={downloadReportPDF}
                  className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.2em] border border-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                  Download PDF
                </button>
                <button 
                  onClick={() => navigate(`/certificate/${auditId}`)}
                  className="flex-1 py-4 rounded-2xl bg-primary/20 text-primary font-black text-xs uppercase tracking-[0.2em] border border-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  Get Certificate
                </button>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary font-black text-[10px] uppercase tracking-[0.2em] transition-all"
              >
                Close Investigation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AuditReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const [testResults, setTestResults] = useState<Record<string, 'pending' | 'running' | 'success' | 'failed'>>({});

  const testPhases: TestPhase[] = [
    { id: 'api', name: 'API Integrity', description: 'Endpoint & Rate Limit Verification', icon: 'api', color: 'text-primary' },
    { id: 'logic', name: 'Software Logic', description: 'Exception Trace & Core Logic Audit', icon: 'terminal', color: 'text-blue-400' },
    { id: 'security', name: 'Security Probe', description: 'Vulnerability & PII Leakage Scan', icon: 'gpp_maybe', color: 'text-purple-400' },
    { id: 'data', name: 'Data Compliance', description: 'Database Encryption & Isolation', icon: 'database', color: 'text-orange-400' },
  ];

  useEffect(() => {
    const initialResults: Record<string, any> = {};
    testPhases.forEach(p => initialResults[p.id] = 'pending');
    setTestResults(initialResults);
  }, []);

  useEffect(() => {
    if (isScanning) {
      const logMessages = [
        "Initializing AI Audit Agent...",
        "Fetching model parameters...",
        "Analyzing PHP backend logic...",
        "Scanning for PII leakage...",
        "Evaluating isolation protocols...",
        "Generating compliance matrix...",
        "Auditing performance bottlenecks...",
        "Checking for prompt injection...",
        "Finalizing audit report..."
      ];
      
      let currentLogIndex = 0;
      const interval = setInterval(() => {
        setProgress(prev => {
          const nextProgress = prev + 1;
          
          const phaseThreshold = 100 / testPhases.length;
          const currentIdx = Math.floor(prev / phaseThreshold);
          
          if (currentIdx < testPhases.length) {
             setTestResults(prevResults => {
                const newResults = { ...prevResults };
                newResults[testPhases[currentIdx].id] = 'running';
                if (currentIdx > 0) newResults[testPhases[currentIdx - 1].id] = 'success';
                return newResults;
             });
          }

          if (nextProgress >= 100) {
            clearInterval(interval);
            setTestResults(prevResults => ({
               ...prevResults,
               [testPhases[testPhases.length - 1].id]: 'success'
            }));
            setTimeout(() => setIsScanning(false), 1200);
            return 100;
          }
          
          if (prev % 12 === 0 && currentLogIndex < logMessages.length) {
            setLogs(old => [...old, `[${new Date().toLocaleTimeString()}] ${logMessages[currentLogIndex]}`]);
            currentLogIndex++;
          }
          
          return nextProgress;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">
            <span className="material-symbols-outlined text-sm">shield_with_heart</span>
            Secure Audit Workspace
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">Audit Session: {id}</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="px-4 py-2 glass-panel rounded-xl text-white text-xs font-bold hover:bg-white/10 transition-all">
            Exit Workspace
          </button>
          <button 
            onClick={() => navigate(`/certificate/${id}`)}
            className="px-6 py-2 bg-primary text-background-dark rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(46,255,143,0.3)] hover:scale-105 transition-all"
          >
            Get Certificate
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN - ENTERPRISE SCAN & VERTICAL PIPELINE */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Enterprise Scan Live Visualizer */}
          <div className="glass-panel rounded-3xl overflow-hidden flex flex-col border-white/5 shadow-2xl h-[400px]">
            <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`size-2 rounded-full ${isScanning ? 'bg-primary animate-pulse shadow-[0_0_8px_#2eff8f]' : 'bg-primary'}`}></span>
                <span className="text-xs font-black text-white uppercase tracking-widest">Enterprise Scan Live</span>
              </div>
              <span className="text-[10px] font-mono text-primary font-bold tracking-widest">{progress}% COMPLETION</span>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center relative overflow-hidden bg-[#0a110e]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(46,255,143,0.05)_0%,_transparent_70%)]"></div>
                <div className="relative size-48 flex items-center justify-center">
                   <div className={`absolute inset-0 rounded-full border-2 border-primary/10 border-t-primary ${isScanning ? 'animate-spin' : ''}`}></div>
                   <div className="relative size-32 drop-shadow-[0_0_20px_rgba(46,255,143,0.4)] flex items-center justify-center">
                     {isScanning ? <RobotScanningIcon /> : (
                       <div className="size-full flex items-center justify-center animate-in zoom-in duration-500">
                         <span className="material-symbols-outlined text-8xl text-primary drop-shadow-[0_0_20px_#2eff8f]">verified_user</span>
                       </div>
                     )}
                   </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 font-mono text-[10px] text-text-secondary overflow-y-auto space-y-1.5 bg-black/40">
                {logs.map((log, i) => (
                  <div key={i} className="animate-in slide-in-from-bottom-1 duration-300">
                    <span className="text-white/40">{log.split(' ')[0]}</span> {log.split(' ').slice(1).join(' ')}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>
          </div>

          {/* Sequential Testing Timeline */}
          <div className="relative pl-12 md:pl-20 py-4">
            <div className="absolute left-[26px] md:left-[38px] top-0 bottom-0 w-[2px] bg-white/5">
               <div 
                className="w-full bg-primary transition-all duration-1000 shadow-[0_0_15px_#2eff8f]" 
                style={{ height: `${progress}%` }}
               ></div>
            </div>

            <div className="space-y-12">
              {testPhases.map((phase, idx) => {
                const status = testResults[phase.id] || 'pending';
                const isDone = status === 'success';
                const isRunning = status === 'running';

                return (
                  <div 
                    key={phase.id} 
                    className={`relative flex items-center gap-8 transition-all duration-700 ${
                      isDone || isRunning ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4'
                    }`}
                  >
                    <div className="absolute -left-[12px] md:-left-[24px] z-10">
                       <div className={`size-12 md:size-16 rounded-full border-2 transition-all duration-500 flex items-center justify-center relative ${
                         isDone ? 'bg-primary border-primary shadow-[0_0_20px_rgba(46,255,143,0.4)] text-background-dark' :
                         isRunning ? 'bg-background-dark border-yellow-500 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' :
                         'bg-background-dark border-white/10 text-white/30'
                       }`}>
                          {isRunning && (
                             <div className="absolute inset-0 rounded-full border-2 border-yellow-500 animate-ping opacity-50"></div>
                          )}
                          <span className={`material-symbols-outlined text-xl md:text-2xl ${isRunning ? 'animate-pulse' : ''}`}>
                            {isDone ? 'check' : phase.icon}
                          </span>
                       </div>
                    </div>

                    <div className="w-12 shrink-0 hidden sm:block">
                      <span className={`text-sm font-black italic tracking-tighter transition-colors ${
                        isDone ? 'text-primary/60' : isRunning ? 'text-yellow-500/60' : 'text-white/10'
                      }`}>
                        STEP 0{idx + 1}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h4 className={`text-base md:text-lg font-black uppercase tracking-widest transition-colors ${
                        isDone ? 'text-white' : isRunning ? 'text-yellow-500' : 'text-white/30'
                      }`}>
                        {phase.name}
                      </h4>
                      <p className={`text-[10px] md:text-xs font-medium uppercase tracking-tight transition-colors ${
                        isDone ? 'text-text-secondary' : isRunning ? 'text-yellow-500/60' : 'text-white/10'
                      }`}>
                        {phase.description}
                      </p>
                    </div>

                    <div className="text-right hidden md:block">
                       <p className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                         isDone ? 'text-primary translate-y-0 opacity-100' : 
                         isRunning ? 'text-yellow-500 animate-pulse' : 
                         'text-white/10 translate-y-2 opacity-0'
                       }`}>
                         {isDone ? 'Integrity Verified' : isRunning ? 'Analyzing Sequence...' : ''}
                       </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - "BOLT" TESTING HUB & TECH STACK */}
        <div className="lg:col-span-4 space-y-6">
          {/* High Energy "Bolt" Intensity Panel */}
          <div className="glass-panel p-8 rounded-3xl border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-[0_20px_60px_rgba(46,255,143,0.05)] relative overflow-hidden group">
             <div className="absolute top-[-20px] right-[-20px] opacity-10 group-hover:opacity-20 transition-all">
                <span className="material-symbols-outlined text-[120px] text-primary rotate-12">bolt</span>
             </div>
             
             <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                   <div className="space-y-1">
                      <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">Audit Intensity</h3>
                      <p className="text-primary text-[10px] font-bold uppercase animate-pulse">Live Performance Hub</p>
                   </div>
                   <div className="size-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(46,255,143,0.3)]">
                      <span className="material-symbols-outlined text-3xl font-black animate-bounce" style={{animationDuration: '2s'}}>bolt</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Scanning Hertz</span>
                         <span className="text-xl font-mono font-black text-white">4.2 <span className="text-[10px] text-primary">GHz</span></span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-primary shadow-[0_0_10px_#2eff8f] transition-all duration-500" style={{width: `${progress}%`}}></div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                         <p className="text-[9px] font-black text-text-secondary uppercase">Threads</p>
                         <p className="text-lg font-mono font-bold text-white">128</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                         <p className="text-[9px] font-black text-text-secondary uppercase">Entropy</p>
                         <p className="text-lg font-mono font-bold text-primary">0.02</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Detailed Tech Stack Descriptions */}
          <div className="glass-panel p-8 rounded-3xl border-white/5 shadow-xl flex flex-col gap-8">
            <h3 className="text-white font-black text-sm uppercase tracking-widest border-b border-white/5 pb-4 flex items-center justify-between">
               Infrastructure Stack
               <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded font-mono tracking-tighter">AGENT_CORE_v2</span>
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-3 group cursor-help">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-white/40 group-hover:text-primary transition-colors">code</span>
                    <span className="text-xs font-black text-white uppercase tracking-tight">PHP 8.2 Runtime</span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-xl">verified</span>
                </div>
                <p className="text-[10px] text-text-secondary leading-relaxed uppercase pl-8 group-hover:text-white/70 transition-colors">
                  Orchestrating the backend request lifecycle with full JIT compilation and memory isolation audits.
                </p>
              </div>

              <div className="space-y-3 group cursor-help">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-white/40 group-hover:text-red-400 transition-colors">database</span>
                    <span className="text-xs font-black text-white uppercase tracking-tight">PostgreSQL 15</span>
                  </div>
                  <span className="material-symbols-outlined text-red-500 text-xl font-black">gpp_maybe</span>
                </div>
                <p className="text-[10px] text-red-400/80 leading-relaxed uppercase pl-8 group-hover:text-red-400 transition-colors font-bold">
                  Warning: Potential isolation fault detected in the data processing layer. Sanitize input required.
                </p>
              </div>

              <div className="space-y-3 group cursor-help">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-white/40 group-hover:text-blue-400 transition-colors">javascript</span>
                    <span className="text-xs font-black text-white uppercase tracking-tight">React 19 ESM</span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-xl">verified</span>
                </div>
                <p className="text-[10px] text-text-secondary leading-relaxed uppercase pl-8 group-hover:text-white/70 transition-colors">
                  Frontend logic verified for component integrity and secure state hydration across all test nodes.
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <button 
                onClick={() => setIsReportOpen(true)}
                className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg"
              >
                <span className="material-symbols-outlined text-lg text-primary">analytics</span>
                Show Detailed Report
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setIsReportOpen(true)}
              className="w-full group relative overflow-hidden flex items-center justify-center gap-3 p-5 rounded-3xl bg-primary hover:bg-primary-hover text-background-dark transition-all duration-300 shadow-[0_20px_40px_rgba(46,255,143,0.2)] active:scale-95"
            >
              <span className="material-symbols-outlined text-2xl font-black">workspace_premium</span>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Finalize & Get Certificate</span>
            </button>
            <button 
              onClick={() => navigate('/fix-workspace')}
              className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">auto_fix</span>
              Launch AI Repair
            </button>
          </div>
        </div>

      </div>

      <DetailedReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} auditId={id || 'AUDIT-X'} />
    </div>
  );
};

export default AuditReportPage;
