import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// 1. Import Toast
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  // 2. Handle Login Logic
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate a successful login
    toast.success("Welcome back to Fluentia!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark", // Dark theme looks premium with your UI
    });

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#E2E8F0] relative overflow-hidden font-sans">
      
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-violet-400/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none" />

      {/* FIXED CONTAINER */}
      <div className="w-full max-w-5xl min-h-[650px] grid md:grid-cols-2 bg-white/30 backdrop-blur-3xl border border-white/40 rounded-[48px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] mx-4 ring-1 ring-white/50">
        
        {/* LEFT PANEL: Branding */}
        <div className="hidden md:flex relative bg-[#0F172A] items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-cyan-500/20" />
          
          <div className="relative z-10 text-center w-full">
             <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-3xl rotate-12 mb-10 mx-auto shadow-2xl shadow-cyan-500/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-white -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
             </div>
             
             <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic">
                Fluen<span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300">tia</span>
             </h2>
             
             <p className="mt-4 text-slate-500 text-[9px] tracking-[0.8em] uppercase font-bold opacity-80">
                Intelligence Infrastructure
             </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-12 md:p-20 flex flex-col justify-center bg-white/20">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-[#0F172A] tracking-tight">Sign In</h1>
            <p className="text-slate-600 text-sm mt-3 font-medium">Please enter your account details.</p>
          </div>

          {/* 3. Attach handleLogin to onSubmit */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input required type="email" placeholder="name@company.com" className="w-full bg-white/50 border border-white rounded-2xl px-6 py-4 text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400/50 transition-all text-sm" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[9px] font-bold text-violet-600 hover:text-cyan-500 transition-colors">Forgot?</button>
              </div>
              <input required type="password" placeholder="••••••••" className="w-full bg-white/50 border border-white rounded-2xl px-6 py-4 text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400/50 transition-all text-sm" />
            </div>
            
            <button type="submit" className="group relative w-full bg-[#0F172A] text-white font-bold py-5 rounded-2xl shadow-xl overflow-hidden transition-all active:scale-[0.98] mt-4">
              <span className="relative z-10 uppercase tracking-widest text-xs">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/40 text-center">
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black">
              New here?{' '}
              <Link to="/register" className="text-violet-600 hover:text-cyan-500 transition-colors underline underline-offset-4 ml-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login