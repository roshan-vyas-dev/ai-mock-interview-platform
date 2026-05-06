import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const userRes = await axios.get(
        "https://ai-mock-interview-platform-bn7e.onrender.com/api/auth/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(userRes.data);

      const interviewRes = await axios.get(
        "https://ai-mock-interview-platform-bn7e.onrender.com/api/interview/my-interviews",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInterviews(interviewRes.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalSessions = interviews.length;
  const avgScore = totalSessions > 0
    ? Math.round(
      interviews.reduce((sum, i) =>
        sum + parseInt(i.totalScore?.split("/")[0] || 0), 0
      ) / totalSessions
    )
    : 0;
  const bestScore = totalSessions > 0
    ? Math.max(...interviews.map(i =>
      parseInt(i.totalScore?.split("/")[0] || 0)
    ))
    : 0;

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#E2E8F0] dark:bg-[#0F172A] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#E2E8F0] dark:bg-[#0F172A] relative font-sans flex flex-col overflow-x-hidden touch-pan-y">

      {/* 1. TOP LEFT ACCENT */}
  <div className="fixed top-[-5%] left-[-5%] w-[20rem] md:w-[35rem] h-[20rem] md:h-[35rem] bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

  {/* 2. BOTTOM RIGHT ACCENT */}
  <div className="fixed bottom-[-5%] right-[-10%] w-[18rem] md:w-[30rem] h-[18rem] md:h-[30rem] bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Background accents - Fixed so they don't jitter during scroll */}
      <div className="fixed top-[-5%] left-[-5%] w-[20rem] md:w-[35rem] h-[20rem] md:h-[35rem] bg-violet-400/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-5%] right-[-10%] w-[18rem] md:w-[30rem] h-[18rem] md:h-[30rem] bg-cyan-400/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      {/* Content wrapper with padding-top for fixed Navbar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full p-5 md:p-10 pt-24 md:pt-32">

        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] dark:text-white tracking-tighter">
            Welcome back, <span className="text-violet-600">
              {user?.name || "User"}
            </span> 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-sm md:text-base">
            Ready to practice today?
          </p>
        </div>

        {/* STATS CARDS - Responsive Grid: 1 col on mobile, 3 on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[24px] p-6 shadow-lg transform-gpu">
            <p className="text-[10px] font-black  dark:text-slate-400 uppercase tracking-widest mb-2">
              Total Sessions
            </p>
            <p className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white">
              {totalSessions}
            </p>
          </div>
          <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[24px] p-6 shadow-lg transform-gpu">
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
              Average Score
            </p>
            <p className="text-4xl md:text-5xl font-black text-violet-600">
              {avgScore}<span className="text-2xl text-slate-400">/10</span>
            </p>
          </div>
          <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[24px] p-6 shadow-lg transform-gpu">
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
              Best Score
            </p>
            <p className="text-4xl md:text-5xl font-black text-emerald-600">
              {bestScore}<span className="text-2xl text-slate-400 dark:text-slate-500">/10</span>
            </p>
          </div>
        </div>

        {/* START INTERVIEW BUTTON */}
        <button
          onClick={() => navigate("/topics")}
          className="group relative w-full bg-[#0F172A] dark:bg-violet-600/20 dark:border dark:border-violet-500/30  text-white font-black px-8 py-5 md:py-6 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all overflow-hidden mb-8 transform-gpu"
        >
          <span className="relative z-10 uppercase tracking-[0.2em] text-xs md:text-sm">
            Start New Interview 🚀
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* RECENT SESSIONS */}
        <div className="pb-10">
          <h2 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 ml-1">
            Recent Sessions
          </h2>

          {interviews.length === 0 ? (
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[24px] p-10 text-center">
              <p className="text-2xl mb-2">🎯</p>
              <p className="font-black text-[#0F172A] dark:text-white ">No sessions yet!</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Start your first interview to see results here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {interviews.slice(0, 5).map((interview) => (
                <div
                  key={interview._id}
                  onClick={() => {
                    localStorage.setItem("interviewId", interview._id);
                    navigate("/result");
                  }}
                  className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[24px] p-5 md:p-6 shadow-lg cursor-pointer hover:scale-[1.01] transition-all flex justify-between items-center transform-gpu"
                >
                  <div className="overflow-hidden mr-2">
                    <div className="flex gap-2 mb-2 flex-wrap">
                      <span className="bg-violet-600 text-white text-[8px] md:text-[9px] font-black px-2 py-1 rounded-full uppercase">
                        {interview.topic}
                      </span>
                      <span className="bg-[#0F172A] dark:bg-white/10 text-white text-[8px] md:text-[9px] font-black px-2 py-1 rounded-full uppercase">
                        {interview.difficulty}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-xs">
                      {new Date(interview.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white ">
                      {interview.totalScore}
                    </p>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      Score
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View all button */}
          {interviews.length > 5 && (
            <button
              onClick={() => navigate("/history")}
              className="w-full mt-4 bg-white/40 border border-white/60 text-[#0F172A] dark:text-white font-black px-8 py-4 rounded-2xl hover:scale-[1.02] transition-all text-[10px] md:text-xs uppercase tracking-widest transform-gpu"
            >
              View All Sessions
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;