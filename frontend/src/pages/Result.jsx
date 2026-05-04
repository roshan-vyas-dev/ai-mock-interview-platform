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
          `http://localhost:5000/api/interview/${interviewId}`,
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
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#E2E8F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-bold">Loading your results...</p>
        </div>
      </div>
    );
  }

  // Get score number for progress bar
  const scoreNum = interview?.totalScore
    ? parseInt(interview.totalScore.split("/")[0])
    : 0;

  return (
    <div className="min-h-screen w-full bg-[#E2E8F0] relative overflow-auto font-sans flex flex-col">

      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6 relative">

        {/* Background accents */}
        <div className="absolute top-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-violet-400/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl bg-white/30 backdrop-blur-3xl border border-white/40 rounded-[48px] p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] text-center ring-1 ring-white/50">

          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter mb-1 uppercase italic leading-none">
            Fluen<span className="text-violet-600">tia</span> Report
          </h1>
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mb-8">
            Performance Analytics
          </p>

          {/* Topic and difficulty badges */}
          <div className="flex justify-center gap-3 mb-10">
            <span className="bg-violet-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {interview?.topic}
            </span>
            <span className="bg-[#0F172A] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {interview?.difficulty}
            </span>
          </div>

          {/* SCORE SECTION */}
          <div className="relative mb-10 flex flex-col items-center">
            <div className="absolute w-40 h-40 bg-violet-500/30 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute w-40 h-40 bg-cyan-400/20 rounded-full blur-[80px] -bottom-10" />

            <p className="relative z-10 text-[10px] font-black text-violet-600 uppercase tracking-[0.4em] mb-2">
              Final Proficiency Score
            </p>

            <div className="relative z-10 flex items-baseline justify-center">
              <span className="text-9xl font-black text-[#0F172A] tracking-tighter leading-none">
                {scoreNum}
              </span>
              <span className="text-4xl font-black text-slate-400 ml-2 tracking-tight">
                / 10
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: `${scoreNum * 10}%` }}
              />
            </div>
          </div>

          {/* OVERALL FEEDBACK */}
          <div className="bg-[#0F172A] p-8 rounded-[32px] text-left mb-8 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
            <h3 className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Groq AI Overall Feedback
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              {interview?.overallFeedback}
            </p>
          </div>

          {/* INDIVIDUAL QUESTION RESULTS */}
          <div className="text-left mb-10">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
              Question by Question Breakdown
            </h3>
            <div className="flex flex-col gap-4">
              {interview?.answers?.map((ans, index) => (
                <div
                  key={index}
                  className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[24px] p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-black text-violet-600 uppercase tracking-widest">
                      Question {index + 1}
                    </span>
                    <span className="bg-violet-600 text-white text-xs font-black px-3 py-1 rounded-full">
                      {ans.score}
                    </span>
                  </div>
                  <p className="text-[#0F172A] font-bold text-sm mb-2">
                    {ans.question}
                  </p>
                  <p className="text-slate-500 text-xs mb-3">
                    <span className="font-black">Your answer: </span>
                    {ans.userAnswer}
                  </p>
                  <div className="bg-[#0F172A] rounded-2xl p-4">
                    <p className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-1">
                      AI Feedback
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {ans.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate("/interview")}
              className="flex-1 group relative bg-white/40 border border-white/60 text-[#0F172A] font-black px-8 py-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span className="relative z-10 uppercase tracking-[0.2em] text-[10px]">
                Practice Again
              </span>
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 group relative bg-[#0F172A] text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
            >
              <span className="relative z-10 uppercase tracking-[0.2em] text-[10px]">
                Return to Dashboard
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