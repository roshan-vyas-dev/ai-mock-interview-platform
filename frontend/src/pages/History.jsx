import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function History() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const topics = ["All", "React", "Node.js", "MongoDB", "JavaScript", "DSA", "General"];

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://ai-mock-interview-platform-bn7e.onrender.com/api/interview/my-interviews",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInterviews(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === "All"
    ? interviews
    : interviews.filter(i => i.topic === filter);

  const getScoreColor = (score) => {
    const num = parseInt(score?.split("/")[0] || 0);
    if (num === 0) return "text-slate-400 dark:text-slate-500";
    if (num >= 8) return "text-emerald-600 dark:text-emerald-400";
    if (num >= 5) return "text-amber-600 dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

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

      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="fixed top-[-5%] left-[-5%] w-[25rem] md:w-[35rem] h-[25rem] md:h-[35rem] bg-violet-400/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-5%] right-[-10%] w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] bg-cyan-400/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full p-5 md:p-10 pt-24 md:pt-32">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] dark:text-white tracking-tighter">
            Interview <span className="text-violet-600 dark:text-violet-400">History</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-sm">
            {interviews.length} total sessions completed
          </p>
        </div>

        {/* FILTER TOPICS */}
        <div className="flex gap-2 flex-wrap mb-8">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setFilter(topic)}
              className={`text-[9px] md:text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest transition-all transform-gpu
                ${filter === topic
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : "bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-600 dark:text-slate-300 hover:scale-[1.05] active:scale-95"
                }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* INTERVIEW LIST */}
        {filtered.length === 0 ? (
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[24px] p-8 md:p-12 text-center">
            <p className="text-3xl mb-2">📭</p>
            <p className="font-black text-[#0F172A] dark:text-white">No sessions found!</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Try a different filter or start a new interview
            </p>
            <button
              onClick={() => navigate("/topics")}
              className="mt-6 bg-violet-600 text-white font-black px-8 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all transform-gpu"
            >
              Start Interview
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-12">
            {filtered.map((interview, index) => (
              <div
                key={interview._id}
                onClick={() => {
                  localStorage.setItem("interviewId", interview._id);
                  navigate("/result");
                }}
                className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[24px] p-5 md:p-6 shadow-lg cursor-pointer hover:scale-[1.01] hover:bg-white/80 dark:hover:bg-white/10 transition-all transform-gpu will-change-transform"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 w-full">

                    {/* Session number and badges */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">
                        Session #{interviews.length - index}
                      </span>
                      <span className="bg-violet-600 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase">
                        {interview.topic}
                      </span>
                      <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase
                        ${interview.difficulty === "Easy"
                          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                          : interview.difficulty === "Medium"
                            ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
                            : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"}`}>
                        {interview.difficulty}
                      </span>
                    </div>

                    {/* Questions count */}
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">
                      {interview.answers?.length} questions answered
                    </p>

                    {/* Date */}
                    <p className="text-slate-400 dark:text-slate-500 text-xs">
                      {new Date(interview.createdAt).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col items-baseline sm:items-end gap-1">
                    <p className={`text-3xl md:text-4xl font-black ${getScoreColor(interview.totalScore)}`}>
                      {interview.totalScore?.split("/")[0]}
                    </p>
                    <span className="text-slate-400 dark:text-slate-500 text-xs sm:hidden">/10 Score</span>
                    <p className="hidden sm:block text-slate-400 dark:text-slate-500 text-xs">/10</p>
                    <p className="hidden sm:block text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                      Score
                    </p>
                  </div>
                </div>

                {/* Overall feedback preview */}
                <div className="mt-4 bg-slate-100 dark:bg-white/5 rounded-2xl p-4">
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed italic">
                    "{interview.overallFeedback}"
                  </p>
                </div>

                {/* View details hint */}
                <p className="text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-widest mt-3 text-right">
                  Click to view details →
                </p>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default History;