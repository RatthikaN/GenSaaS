
import React from 'react';

const CommunityHub = () => {
  const threads = [
    { id: 1, author: 'Dr. Elena', role: 'Researcher', title: 'Optimization techniques for Llama-3 on edge devices?', content: 'Seeing latency spikes during token generation. Has anyone tried 4-bit quantization?', tags: ['#EdgeAI', '#LLM'], upvotes: 142, comments: 24, time: '2h ago' },
    { id: 2, author: 'DevOps Dave', role: 'Tester', title: 'Comparison of Vision Transformers vs CNNs for medical imaging', content: 'Just published a study. ViTs show promise but training stability is still an issue.', tags: ['#CV', '#MedicalAI'], upvotes: 85, comments: 18, time: '5h ago' },
    { id: 3, author: 'Marcus AI', role: 'Tester', title: 'Help needed: Multi-modal RAG implementation', content: 'Trying to design a vector store schema for PDF + Image ingestion.', tags: ['#RAG', '#VectorDB'], upvotes: 45, comments: 5, time: '8h ago' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="relative rounded-3xl overflow-hidden min-h-[240px] flex items-end p-10 border border-white/5 shadow-2xl group">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('https://picsum.photos/seed/community/1200/400')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
        <div className="relative z-10 w-full flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              COMMUNITY ACTIVE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Tester Community</h1>
            <p className="text-gray-300 text-lg max-w-lg">Collaborate, review, and discuss the latest in AI infrastructure testing.</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-primary text-background-dark px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">New Discussion</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
           <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-lg font-bold text-white">Latest Threads</h3>
              <div className="flex gap-4 text-xs font-bold text-text-secondary uppercase tracking-widest">
                 <button className="text-primary border-b-2 border-primary pb-1">Hot</button>
                 <button className="hover:text-white transition-colors">Newest</button>
                 <button className="hover:text-white transition-colors">Top</button>
              </div>
           </div>
           
           {threads.map(thread => (
             <div key={thread.id} className="glass-panel p-6 rounded-2xl hover:bg-white/[0.05] transition-all cursor-pointer group">
                <div className="flex gap-4">
                   <div className="flex flex-col items-center gap-1 min-w-[40px]">
                      <span className="material-symbols-outlined text-gray-500 group-hover:text-primary">expand_less</span>
                      <span className="text-sm font-bold text-primary">{thread.upvotes}</span>
                      <span className="material-symbols-outlined text-gray-500">expand_more</span>
                   </div>
                   <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-tighter text-text-secondary">
                         <span className="text-white hover:text-primary transition-colors cursor-pointer">{thread.author}</span>
                         <span className="text-white/20">•</span>
                         <span>{thread.role}</span>
                         <span className="text-white/20">•</span>
                         <span>{thread.time}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{thread.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{thread.content}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                           {thread.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-primary">{t}</span>)}
                        </div>
                        <div className="flex gap-4 text-xs text-text-secondary">
                           <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">chat_bubble</span> {thread.comments}</span>
                           <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> 1.2k</span>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-white font-bold text-lg mb-6">Top Contributors</h3>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="size-10 rounded-full border border-primary/20 bg-cover bg-center" style={{backgroundImage: `url('https://picsum.photos/seed/${i}/40/40')`}}></div>
                      <div className="flex flex-col">
                         <span className="text-white text-sm font-bold group-hover:text-primary transition-colors">ExpertTester_{i}</span>
                         <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{10 - i * 2}k points</span>
                      </div>
                      <span className="ml-auto material-symbols-outlined text-yellow-400 text-lg">emoji_events</span>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-text-secondary hover:text-white transition-all">View Leaderboard</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;
