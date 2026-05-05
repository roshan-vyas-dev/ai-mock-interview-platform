import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function TopicSelect() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const topics = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "MongoDB", icon: "🍃" },
    { name: "JavaScript", icon: "🟡" },
    { name: "DSA", icon: "🧠" },
    { name: "General", icon: "💡" },
  ];

  const difficulties = [
    { name: "Easy", color: "bg-emerald-500", desc: "Basic concepts" },
    { name: "Medium", color: "bg-amber-500", desc: "Intermediate level" },
    { name: "Hard", color: "bg-red-500", desc: "Advanced topics" },
  ];

  const handleStart = () => {
    if (!selectedTopic || !selectedDifficulty) {
      alert("Please select both topic and difficulty!");
      return;
    }
    localStorage.setItem("topic", selectedTopic);
    localStorage.setItem("difficulty", selectedDifficulty);
    navigate("/interview");
  };

  return (
    <div className="min-h-screen w-full bg-[#E2E8F0] dark:bg-[#0F172A] relative font-sans flex flex-col overflow-x-hidden">

      {/* 1. TOP LEFT ACCENT */}
      <div className="fixed top-[-5%] left-[-5%] w-[20rem] md:w-[35rem] h-[20rem] md:h-[35rem] bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* 2. BOTTOM RIGHT ACCENT */}
      <div className="fixed bottom-[-5%] right-[-10%] w-[18rem] md:w-[30rem] h-[18rem] md:h-[30rem] bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      {/* FIXED NAVBAR: stays at the top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* BACKGROUND ACCENTS */}
      <div className="fixed top-[-5%] left-[-5%] w-[20rem] md:w-[35rem] h-[20rem] md:h-[35rem] bg-violet-400/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="fixed bottom-[-5%] right-[-10%] w-[18rem] md:w-[30rem] h-[18rem] md:h-[30rem] bg-cyan-400/20 rounded-full blur-[80px] pointer-events-none" />

      {/* SCROLLABLE CONTENT: pt-24 ensures content starts below the fixed navbar */}
      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full p-5 md:p-10 pt-24 md:pt-32">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] dark:text-white tracking-tighter mb-3">
            Choose Your <span className="text-violet-600">Topic</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
            Select a topic and difficulty to start your AI mock interview
          </p>
        </div>

        {/* TOPIC SELECTION */}
        <div className="mb-8">
          <h2 className="text-[10px] font-black  dark:text-slate-400 uppercase tracking-widest mb-4 ml-1">
            Select Topic
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <button
                key={topic.name}
                onClick={() => setSelectedTopic(topic.name)}
                className={`p-5 md:p-6 rounded-[24px] border-2 transition-all duration-200 
                  hover:scale-[1.02] active:scale-95 text-left transform-gpu
                  ${selectedTopic === topic.name
                    ? "bg-violet-600 border-violet-600 text-white shadow-xl shadow-violet-500/30"
                    : "bg-white/50 dark:bg-white/5 backdrop-blur-md border-white/60 dark:border-white/10 text-[#0F172A] dark:text-white"
                  }`}
              >
                <div className="text-2xl md:text-3xl mb-3">{topic.icon}</div>
                <div className="font-black text-sm uppercase tracking-wider">
                  {topic.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* DIFFICULTY SELECTION */}
        <div className="mb-10">
          <h2 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 ml-1">
            Select Difficulty
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {difficulties.map((diff) => (
              <button
                key={diff.name}
                onClick={() => setSelectedDifficulty(diff.name)}
                className={`p-5 md:p-6 rounded-[24px] border-2 transition-all duration-200 
                  hover:scale-[1.02] active:scale-95 text-left transform-gpu
                  ${selectedDifficulty === diff.name
                    ? "bg-[#0F172A] dark:bg-violet-600 border-[#0F172A] dark:border-violet-500 text-white shadow-xl"
                    : "bg-white/50 dark:bg-white/5 backdrop-blur-md border-white/60 dark:border-white/10 text-[#0F172A] dark:text-white"
                  }`}
              >
                <div className={`w-3 h-3 rounded-full ${diff.color} mb-3`} />
                <div className="font-black text-sm uppercase tracking-wider mb-1">
                  {diff.name}
                </div>
                <div className={`text-xs ${selectedDifficulty === diff.name ? "text-slate-400" : "text-slate-500"}`}>
                  {diff.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* START BUTTON */}
        <div className="pb-20"> {/* Extra bottom padding for smooth finish */}
          <button
            onClick={handleStart}
            className="group relative w-full bg-[#0F172A] dark:bg-violet-600/20 dark:border dark:border-violet-500/30 text-white font-black px-8 py-5 md:py-6 rounded-2xl shadow-xl 
              hover:scale-[1.01] active:scale-98 transition-all overflow-hidden transform-gpu"
          >
            <span className="relative z-10 uppercase tracking-[0.2em] text-xs md:text-sm">
              Start Interview 🚀
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default TopicSelect;