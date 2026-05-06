import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Result() {
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const interviewId = localStorage.getItem("interviewId");
        const token = localStorage.getItem("token");

        if (!interviewId) {
          navigate("/dashboard");
          return;
        }

        const res = await axios.get(
          `https://ai-mock-interview-platform-bn7e.onrender.com/api/interview/${interviewId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setInterview(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#E2E8F0]  flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-bold">Loading your results...</p>
        </div>
      </div>
    );
  }

  const scoreNum = interview?.totalScore
    ? parseInt(interview.totalScore.split("/")[0])
    : 0;

  return (
    <div className="min-h-screen w-full bg-[#E2E8F0] dark:bg-[#0F172A] relative font-sans flex flex-col overflow-x-hidden">

      
      
      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* BACKGROUND ACCENTS - Fixed to prevent jitter */}
      <div className="fixed top-[-10%] left-[-5%] w-[30rem] md:w-[45rem] h-[30rem] md:h-[45rem] bg-violet-400/20 rounded-full blur-[80px] md:blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[25rem] md:w-[40rem] h-[25rem] md:h-[40rem] bg-cyan-400/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* MAIN CONTENT CONTAINER - Using pt-24/32 to clear fixed navbar */}
      <div className="relative z-10 w-full max-w-3xl mx-auto p-4 md:p-10 pt-24 md:pt-32 pb-20">
        
        <div className="bg-white/30 backdrop-blur-3xl border border-white/40 rounded-[32px] md:rounded-[48px] p-6 md:p-14 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] text-center ring-1 ring-white/50 transform-gpu">

          <h1 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white tracking-tighter mb-1 uppercase italic leading-none">
            Fluen<span className="text-violet-600">tia</span> Report
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8">
            Performance Analytics
          </p>

          {/* Topic and difficulty badges */}
          <div className="flex justify-center gap-2 md:gap-3 mb-10">
            <span className="bg-violet-600 text-white text-[8px] md:text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {interview?.topic}
            </span>
            <span className="bg-[#0F172A] text-white text-[8px] md:text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {interview?.difficulty}
            </span>
          </div>

          {/* SCORE SECTION */}
          <div className="relative mb-10 flex flex-col items-center">
            <div className="absolute w-32 md:w-40 h-32 md:h-40 bg-violet-500/30 rounded-full blur-[50px] md:blur-[60px] animate-pulse" />
            
            <p className="relative z-10 text-[9px] md:text-[10px] font-black text-violet-600 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-2">
              Final Proficiency Score
            </p>

            <div className="relative z-10 flex items-baseline justify-center">
              <span className="text-7xl md:text-9xl font-black text-[#0F172A] dark:text-white tracking-tighter leading-none">
                {scoreNum}
              </span>
              <span className="text-2xl md:text-4xl font-black text-slate-400 ml-2 tracking-tight">
                / 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-32 md:w-40 h-1.5 bg-slate-200/50 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: `${scoreNum * 10}%` }}
              />
            </div>
          </div>

          {/* OVERALL FEEDBACK */}
          <div className="bg-[#0F172A] p-6 md:p-8 rounded-[24px] md:rounded-[32px] text-left mb-10 shadow-2xl border border-white/10 relative overflow-hidden transform-gpu">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
            <h3 className="text-cyan-400 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Groq AI Overall Feedback
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              {interview?.overallFeedback}
            </p>
          </div>

          {/* INDIVIDUAL QUESTION RESULTS */}
          <div className="text-left mb-10">
            <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 ml-1">
              Question Breakdown
            </h3>
            <div className="flex flex-col gap-4">
              {interview?.answers?.map((ans, index) => (
                <div
                  key={index}
                  className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[24px] p-5 md:p-6 transform-gpu"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[8px] md:text-[9px] font-black text-violet-600 uppercase tracking-widest">
                      Question {index + 1}
                    </span>
                    <span className="bg-violet-600 text-white text-[10px] font-black px-3 py-1 rounded-full">
                      {ans.score}
                    </span>
                  </div>
                  <p className="text-[#0F172A] dark:text-white font-bold text-sm mb-3">
                    {ans.question}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white/50 rounded-xl p-3 border border-white/40">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Your Answer</p>
                      <p className="text-slate-600 text-xs italic">"{ans.userAnswer}"</p>
                    </div>

                    <div className="bg-[#0F172A] rounded-2xl p-4 shadow-inner">
                      <p className="text-cyan-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1">
                        AI Guidance
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {ans.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/topics")}
              className="flex-1 bg-white/40 border border-white/60 text-[#0F172A] dark:text-white font-black px-8 py-4 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all transform-gpu"
            >
              <span className="uppercase tracking-[0.2em] text-[10px]">
                New Interview
              </span>
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 group relative bg-[#0F172A] text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all overflow-hidden transform-gpu"
            >
              <span className="relative z-10 uppercase tracking-[0.2em] text-[10px]">
                Dashboard
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Result;