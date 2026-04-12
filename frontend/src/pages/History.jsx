import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function History() {
  const sessions = [
    { id: 1, topic: "React Fundamentals", score: 8, date: "Apr 01, 2026", type: "Technical" },
    { id: 2, topic: "Node.js Architecture", score: 7, date: "Apr 03, 2026", type: "Backend" },
    { id: 3, topic: "MongoDB Schema Design", score: 9, date: "Apr 05, 2026", type: "Database" },
  ];

  return (
    <div className="h-screen w-full bg-[#E2E8F0] dark:bg-[#020617] transition-colors duration-500 relative overflow-hidden font-sans flex flex-col">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        
        {/* Aurora Silk Background Accents */}
        <div className="absolute top-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-400/20 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Header Section */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-black text-[#0F172A] dark:text-white tracking-tight italic">
                Session<span className="text-violet-600 dark:text-violet-400">Archive</span>
              </h1>
              <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em] mt-2">
                Comprehensive Interview History
              </p>
            </div>
            <Link to="/dashboard" className="hidden md:block text-[10px] font-black text-violet-600 dark:text-cyan-400 uppercase tracking-widest hover:text-cyan-500 dark:hover:text-white transition-colors border-b-2 border-violet-600/20 dark:border-cyan-400/20 pb-1">
              Back to Dashboard
            </Link>
          </div>

          {/* --- INTERVIEW HISTORY LIST --- */}
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="group bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[32px] p-6 md:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex justify-between items-center"
              >
                <div className="flex items-center gap-6">
                  {/* Visual Indicator Icon */}
                  <div className="w-14 h-14 bg-[#0F172A] dark:bg-violet-600/20 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-cyan-500 transition-all duration-500">
                    <svg className="w-6 h-6 text-white dark:text-violet-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                        {session.topic}
                      </h2>
                      <span className="text-[8px] font-black bg-[#0F172A] dark:bg-violet-600 px-2 py-0.5 rounded-md text-white uppercase tracking-widest">
                        {session.type}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold flex items-center gap-2 uppercase tracking-tight">
                      <svg className="w-3 h-3 text-violet-500 dark:text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {session.date}
                    </p>
                  </div>
                </div>

                {/* Score Section */}
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Proficiency</p>
                  <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] to-slate-600 dark:from-white dark:to-slate-400 group-hover:from-violet-600 group-hover:to-cyan-500 transition-all duration-500">
                    {session.score}<span className="text-slate-300 dark:text-slate-600 text-lg">/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Label */}
          <div className="mt-16 text-center">
            <div className="h-[1px] w-24 bg-slate-300 dark:bg-slate-800 mx-auto mb-4" />
            <p className="text-slate-400 dark:text-slate-600 text-[9px] font-black uppercase tracking-[0.4em]">
              Secure Data Storage Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;