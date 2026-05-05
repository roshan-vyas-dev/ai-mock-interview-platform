import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminSessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const topics = ["All", "React", "Node.js", "MongoDB", "JavaScript", "DSA", "General"];

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/admin/sessions",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSessions(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    const num = parseInt(score?.split("/")[0] || 0);
    if (num >= 8) return "text-emerald-400";
    if (num >= 5) return "text-amber-400";
    return "text-red-400";
  };

  const filtered = sessions
    .filter(s => filter === "All" || s.topic === filter)
    .filter(s =>
      s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.user?.email?.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0F172A] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0F172A] relative font-sans flex flex-col">

      <div className="absolute top-[-5%] left-[-5%] w-[35rem] h-[35rem] bg-violet-900/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full p-6 md:p-10">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin")}
            className="text-slate-400 text-xs uppercase tracking-widest font-black mb-2 hover:text-white transition-all"
          >
            ← Back to Admin
          </button>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            All <span className="text-violet-400">Sessions</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {sessions.length} total interviews conducted
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 text-center">
            <p className="text-3xl font-black text-white">
              {sessions.length}
            </p>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">
              Total Sessions
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 text-center">
            <p className="text-3xl font-black text-violet-400">
              {sessions.length > 0
                ? Math.round(
                    sessions.reduce((sum, s) =>
                      sum + parseInt(s.totalScore?.split("/")[0] || 0), 0
                    ) / sessions.length
                  )
                : 0}
            </p>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">
              Avg Score
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 text-center">
            <p className="text-3xl font-black text-cyan-400">
              {sessions.length > 0
                ? Math.max(...sessions.map(s =>
                    parseInt(s.totalScore?.split("/")[0] || 0)
                  ))
                : 0}
            </p>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">
              Best Score
            </p>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by user name or email..."
          className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder:text-slate-500 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
        />

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setFilter(topic)}
              className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest transition-all
                ${filter === topic
                  ? "bg-violet-600 text-white"
                  : "bg-white/10 text-slate-400 hover:scale-105"
                }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Sessions list */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-10 text-center">
              <p className="text-white font-black">No sessions found!</p>
              <p className="text-slate-400 text-sm mt-1">
                No interviews conducted yet
              </p>
            </div>
          ) : (
            filtered.map((session, index) => (
              <div
                key={session._id}
                className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex justify-between items-start gap-4"
              >
                <div className="flex items-start gap-4 flex-1">

                  {/* User avatar */}
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/30 border border-violet-500/30 flex items-center justify-center font-black text-violet-400 text-lg flex-shrink-0">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="flex-1">
                    {/* User info */}
                    <p className="text-white font-black text-sm mb-1">
                      {session.user?.name || "Unknown User"}
                    </p>
                    <p className="text-slate-400 text-xs mb-3">
                      {session.user?.email}
                    </p>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap mb-3">
                      <span className="bg-violet-600/30 text-violet-400 text-[9px] font-black px-2 py-1 rounded-full uppercase">
                        {session.topic}
                      </span>
                      <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase
                        ${session.difficulty === "Easy"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : session.difficulty === "Medium"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-red-500/20 text-red-400"
                        }`}>
                        {session.difficulty}
                      </span>
                      <span className="bg-white/10 text-slate-400 text-[9px] font-black px-2 py-1 rounded-full">
                        {session.answers?.length} questions
                      </span>
                    </div>

                    {/* Feedback preview */}
                    <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1">
                      {session.overallFeedback}
                    </p>

                    {/* Date */}
                    <p className="text-slate-600 text-[10px] mt-2">
                      {new Date(session.createdAt).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-4xl font-black ${getScoreColor(session.totalScore)}`}>
                    {session.totalScore?.split("/")[0]}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">/10</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSessions;