import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleRegister = async (e) => {
  e.preventDefault();

  try {

    const res = await axios.post(
      "https://ai-mock-interview-platform-bn7e.onrender.com/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    toast.success("Account Created Successfully!", {
      theme: "dark",
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Registration failed",
      {
        theme: "dark",
      }
    );

  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#E2E8F0] relative overflow-hidden font-sans">

      {/* Aurora Background Accents */}
      <div className="absolute top-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-violet-400/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none" />

      {/* REGISTRATION CONTAINER */}
      <div className="w-full max-w-5xl min-h-[650px] grid md:grid-cols-2 bg-white/30 backdrop-blur-3xl border border-white/40 rounded-[48px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] mx-4 ring-1 ring-white/50">

        {/* LEFT PANEL: Branding (Consistent with Login) */}
        <div className="hidden md:flex relative bg-[#0F172A] items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-cyan-500/20" />
          <div className="relative z-10 text-center w-full">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-3xl rotate-12 mb-10 mx-auto shadow-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic">
              Fluen<span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300">tia</span>
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-[9px] tracking-[0.8em] uppercase font-bold opacity-80">Join the Infrastructure</p>
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div className="p-12 md:p-20 flex flex-col justify-center bg-white/20">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-[#0F172A] tracking-tight">Create Account</h1>
            <p className="text-slate-600 text-sm mt-3 font-medium">Join thousands of candidates improving their skills.</p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input
  required
  type="text"
  placeholder="John Doe"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full bg-white/50 border border-white rounded-2xl px-6 py-4 text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all text-sm"
/>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
  required
  type="email"
  placeholder="name@company.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full bg-white/50 border border-white rounded-2xl px-6 py-4 text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all text-sm"
/>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Create Password</label>
              <input
  required
  type="password"
  placeholder="••••••••"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full bg-white/50 border border-white rounded-2xl px-6 py-4 text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all text-sm"
/>
            </div>

            <button type="submit" className="group relative w-full bg-[#0F172A] text-white font-bold py-5 rounded-2xl shadow-xl overflow-hidden transition-all active:scale-[0.98] mt-4">
              <span className="relative z-10 uppercase tracking-widest text-xs">Create Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/40 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-black">
              Already have an account?{' '}
              <Link to="/" className="text-violet-600 hover:text-cyan-500 transition-colors underline underline-offset-4 ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;