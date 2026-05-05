import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSessions: 0,
    totalQuestions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const [usersRes, sessionsRes, questionsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/admin/sessions", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/questions", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setStats({
        totalUsers: usersRes.data.length,
        totalSessions: sessionsRes.data.length,
        totalQuestions: questionsRes.data.length,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { label: "Manage Questions", path: "/admin/questions", icon: "❓", desc: "Add, edit, delete questions" },
    { label: "Manage Users", path: "/admin/users", icon: "👥", desc: "View and block users" },
    { label: "All Sessions", path: "/admin/sessions", icon: "📊", desc: "Monitor all interviews" },
  ];

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0F172A] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0F172A] relative font-sans flex flex-col">

      {/* Background accents */}
      <div className="absolute top-[-5%] left-[-5%] w-[35rem] h-[35rem] bg-violet-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[30rem] h-[30rem] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full p-6 md:p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              Admin <span className="text-violet-400">Panel</span>
            </h1>
            <p className="text-slate-400 font-medium mt-1">
              Manage your AI Mock Interview Platform
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="bg-red-500/20 border border-red-500/30 text-red-400 font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all"
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Total Users
            </p>
            <p className="text-5xl font-black text-white">{stats.totalUsers}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Total Sessions
            </p>
            <p className="text-5xl font-black text-violet-400">{stats.totalSessions}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Total Questions
            </p>
            <p className="text-5xl font-black text-cyan-400">{stats.totalQuestions}</p>
          </div>
        </div>

        {/* MENU */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-white/5 border border-white/10 rounded-[24px] p-8 text-left hover:scale-105 hover:bg-white/10 transition-all group"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="font-black text-white uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div className="text-slate-400 text-xs">{item.desc}</div>
              <div className="text-violet-400 text-[10px] font-black uppercase tracking-widest mt-4 group-hover:translate-x-1 transition-all">
                Open →
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;