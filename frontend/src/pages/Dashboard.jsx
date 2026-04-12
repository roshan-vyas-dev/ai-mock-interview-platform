import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const data = [
    { name: "React", score: 8 },
    { name: "Node.js", score: 7 },
    { name: "MongoDB", score: 9 },
    { name: "Express", score: 8 },
    { name: "JS ES6", score: 6 },
  ];

  const stats = [
    { label: 'Avg. Score', value: '84%', color: 'from-violet-500 to-purple-600' },
    { label: 'Interviews', value: '12', color: 'from-cyan-400 to-blue-500' },
    { label: 'Accuracy', value: '92%', color: 'from-emerald-400 to-teal-500' },
  ]

  return (
    /* FIXED: Changed min-h-screen to h-screen and added flex flex-col to lock the height */
    <div className="h-screen w-full bg-[#E2E8F0] dark:bg-[#020617] transition-colors duration-500 relative overflow-hidden font-sans flex flex-col">
      <Navbar />

      {/* FIXED: Wrapped content in flex-1 overflow-y-auto to prevent global scrollbar "shaking" */}
      <main className="flex-1 overflow-y-auto relative z-10">
        
        {/* Background Accents moved inside scroll area for relative positioning */}
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto p-8 w-full relative z-10">
          
          {/* 👋 Welcome Section */}
          <section className="mb-10">
            <h1 className="text-4xl font-black text-[#0F172A] dark:text-white tracking-tight">
              Welcome back, <span className="text-violet-600 dark:text-violet-400">John</span> 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Ready to sharpen your professional fluency today?</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Stats Column */}
            <div className="flex flex-col gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 p-7 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <h3 className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </h3>
                </div>
              ))}
            </div>

            {/* PERFORMANCE CHART CARD */}
            <div className="lg:col-span-2 bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[40px] shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight uppercase italic">Skill Proficiency</h2>
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Analytics from last 5 sessions</p>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
              </div>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} 
                      dy={10}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={false} domain={[0, 10]} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        padding: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                      }}
                      labelStyle={{
                        color: '#fff',
                        fontWeight: '900',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        fontSize: '10px',
                        letterSpacing: '0.1em'
                      }}
                      itemStyle={{
                        fontWeight: '700',
                        fontSize: '14px',
                        color: '#22d3ee',
                        padding: '0'
                      }}
                    />
                    <Bar dataKey="score" radius={[10, 10, 10, 10]} barSize={45}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7c3aed' : '#22d3ee'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 🎯 Action Section */}
          <section className="bg-[#0F172A] dark:bg-violet-950/20 border border-transparent dark:border-white/10 rounded-[40px] p-12 relative overflow-hidden shadow-2xl mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-3xl font-black text-white leading-tight">
                  Start Your AI-Powered <br /> Mock Interview
                </h2>
                <p className="text-slate-400 mt-4 text-sm font-medium">
                  Our Gemini-integrated system analyzes your technical depth and professional tone in real-time.
                </p>
              </div>

              <button
                onClick={() => navigate("/interview")}
                className="group relative bg-white text-[#0F172A] font-black px-10 py-5 rounded-2xl hover:scale-105 transition-all active:scale-95 shadow-xl flex items-center gap-3"
              >
                <span className="uppercase tracking-widest text-xs">Start Interview</span>
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard;