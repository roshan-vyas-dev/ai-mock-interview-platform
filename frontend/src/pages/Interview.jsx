import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Interview() {
  const navigate = useNavigate();
  const [time, setTime] = useState(30); 
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (time === 0) {
      navigate("/result");
      return;
    }
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time, navigate]);

  return (
    // h-screen and overflow-hidden ensures no scrolling
    <div className="h-screen w-full bg-[#E2E8F0] relative overflow-hidden font-sans flex flex-col p-6 md:p-10">
      
      {/* Aurora Silk Background Accents */}
      <div className="absolute top-[-5%] left-[-5%] w-[35rem] h-[35rem] bg-violet-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[30rem] h-[30rem] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER: Fixed at top */}
      <header className="relative z-10 flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter italic">
            Fluen<span className="text-violet-600">tia</span>
          </h1>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">AI Interactive Session</p>
        </div>

        {/* Dynamic Timer Card */}
        <div className="bg-[#0F172A] px-6 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${time < 10 ? 'bg-red-500 animate-pulse' : 'bg-cyan-400'}`} />
          <span className="text-white font-mono text-xl font-black tracking-widest">
            00:{time < 10 ? `0${time}` : time}
          </span>
        </div>
      </header>

      {/* MAIN SECTION: Uses flex-1 to fill the remaining screen space */}
      <main className="relative z-10 flex-1 flex flex-col gap-6 max-w-5xl mx-auto w-full overflow-hidden">
        
        {/* QUESTION CARD */}
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[32px] p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-3">
            <span className="bg-violet-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Question 01</span>
            <div className="h-[1px] flex-1 bg-slate-300/50" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] leading-snug">
            "What is React and how does it work in the context of a modern web architecture?"
          </h2>
        </div>

        {/* ANSWER AREA: flex-1 makes the textarea fill the rest of the height */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 rounded-[34px] blur-sm"></div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Structure your answer here. Our AI evaluates technical depth and professional tone..."
            className="relative w-full h-full bg-white/70 backdrop-blur-md border border-white rounded-[32px] p-8 text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50 transition-all text-lg shadow-inner resize-none"
          />
        </div>

        {/* FOOTER ACTION: Fixed at bottom */}
        <footer className="flex justify-between items-center py-2">
          <div className="hidden md:block">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Status: <span className="text-emerald-600">Syncing with Gemini AI</span>
            </p>
          </div>
          
          <button
            onClick={() => navigate("/result")}
            className="group relative bg-[#0F172A] text-white font-black px-12 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <span className="relative z-10 uppercase tracking-[0.2em] text-xs">Complete Assessment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </footer>
      </main>
    </div>
  );
}

export default Interview;