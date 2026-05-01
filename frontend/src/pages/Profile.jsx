import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();

  }, []);

  return (
    <div className="h-screen w-full bg-[#E2E8F0] dark:bg-[#020617] transition-colors duration-500 relative overflow-hidden font-sans flex flex-col">

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Content wrapper */}
      <div className="flex-1 flex items-center justify-center p-6 relative">

        {/* Aurora Silk Background Accents */}
        <div className="absolute top-[-15%] left-[-10%] w-[45rem] h-[45rem] bg-violet-400/20 dark:bg-violet-500/10 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* PROFILE CARD */}
        <div className="relative z-10 w-full max-w-md bg-white/30 dark:bg-white/5 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[48px] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] text-center ring-1 ring-white/50 dark:ring-white/5">

          {/* Navigation back */}
          <div className="absolute top-8 left-8">
            <Link to="/dashboard" className="text-slate-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-cyan-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
          </div>

          {/* AVATAR */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 to-cyan-400 rounded-full blur-lg opacity-40 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-[#0F172A] dark:bg-violet-950 rounded-full border-4 border-white dark:border-white/10 flex items-center justify-center text-white text-3xl font-black shadow-2xl italic">
              {user?.name?.charAt(0)}
            </div>
          </div>

          {/* USER INFO */}
          <div className="mb-8">
            <span className="text-[9px] font-black bg-violet-600 dark:bg-cyan-500 text-white dark:text-[#0F172A] px-3 py-1 rounded-full uppercase tracking-widest">
              {user?.role}
            </span>
            <h2 className="text-3xl font-black text-[#0F172A] dark:text-white tracking-tight mt-4 uppercase">
              {user?.name}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{user?.email}</p>
          </div>

          {/* DIVIDER */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-8" />

          {/* STATS */}
          <div className="flex justify-between items-center px-4 mb-8">
            <div className="text-center">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Joined</p>
              <p className="text-sm font-bold text-[#0F172A] dark:text-white">{new Date(user?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-200 dark:bg-white/10" />
            <div className="text-center">
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</p>
              <p className="text-sm font-bold text-emerald-500 flex items-center gap-1 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Active
              </p>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button className="group relative w-full bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] font-black py-5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden border border-white/10">
            <span className="relative z-10 uppercase tracking-[0.2em] text-xs">Edit Account Details</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <p className="mt-6 text-slate-400 dark:text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">
            Fluentia Infrastructure v1.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;