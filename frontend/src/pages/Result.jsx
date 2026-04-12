import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Result() {
  const navigate = useNavigate();

  return (
    // Parent container uses flex-col to stack Navbar and Content properly
    <div className="h-screen w-full bg-[#E2E8F0] relative overflow-hidden font-sans flex flex-col">
      
      {/* 1. Global Navbar at the very top */}
      <Navbar />

      {/* 2. Content Area: flex-1 ensures it fills the rest of the screen and centers the card */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        
        {/* Aurora Silk Background Accents */}
        <div className="absolute top-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-violet-400/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none" />

        {/* RESULT CARD */}
        <div className="relative z-10 w-full max-w-2xl bg-white/30 backdrop-blur-3xl border border-white/40 rounded-[48px] p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] text-center ring-1 ring-white/50">
          
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter mb-1 uppercase italic leading-none">
            Fluen<span className="text-violet-600">tia</span> Report
          </h1>
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mb-12">Performance Analytics</p>

          {/* --- THE "HERO" SCORE SECTION --- */}
          <div className="relative mb-14 flex flex-col items-center">
            {/* Intense Glow Background */}
            <div className="absolute w-40 h-40 bg-violet-500/30 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute w-40 h-40 bg-cyan-400/20 rounded-full blur-[80px] -bottom-10" />

            <p className="relative z-10 text-[10px] font-black text-violet-600 uppercase tracking-[0.4em] mb-2">Final Proficiency Score</p>
            
            <div className="relative z-10 flex items-baseline justify-center">
              <span className="text-9xl font-black text-[#0F172A] tracking-tighter leading-none">
                8
              </span>
              <span className="text-4xl font-black text-slate-400 ml-2 tracking-tight">
                / 10
              </span>
            </div>

            {/* Decorative Progress bar underline */}
            <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
              <div className="w-[80%] h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" />
            </div>
          </div>

          {/* AI FEEDBACK BOX */}
          <div className="bg-[#0F172A] p-8 rounded-[32px] text-left mb-10 shadow-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
            
            <h3 className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Gemini AI Insights
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              "Your explanation of React's Virtual DOM shows strong technical depth. To reach a perfect score, consider detailing the reconciliation process and providing a concrete example of useEffect hooks."
            </p>
          </div>

          {/* RETURN BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="group relative w-full md:w-auto bg-[#0F172A] text-white font-black px-12 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <span className="relative z-10 uppercase tracking-[0.2em] text-[10px]">Return to Dashboard</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

        </div>
      </div>
    </div>
  );
}

export default Result;