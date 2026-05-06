import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {
  const navigate = useNavigate();
  const [time, setTime] = useState(120);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Get topic and difficulty from localStorage
  const topic = localStorage.getItem("topic") || "General";
  const difficulty = localStorage.getItem("difficulty") || "Easy";

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://ai-mock-interview-platform-bn7e.onrender.com/api/questions?topic=${topic}&difficulty=${difficulty}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestions(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Timer resets for each question
  useEffect(() => {
    setTime(120);
  }, [currentQuestion]);

  useEffect(() => {
    if (time === 0) {
      handleNextQuestion();
      return;
    }
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleNextQuestion = async () => {
    // Save current answer
    const currentAnswers = [
      ...allAnswers,
      {
        question: questions[currentQuestion]?.question || "",
        userAnswer: answer || "No answer provided",
      },
    ];
    setAllAnswers(currentAnswers);
    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit all answers to backend
      await submitInterview(currentAnswers);
    }
  };

  const submitInterview = async (finalAnswers) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      // FIX 1: Change axios.get to axios.post
      // FIX 2: Change the URL to the submission endpoint
      const res = await axios.post(
        "https://ai-mock-interview-platform-bn7e.onrender.com/api/interview/submit",
        {
          topic,
          difficulty,
          answers: finalAnswers,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // FIX 3: Check if the ID is nested in res.data or res.data.interview
      const interviewId = res.data.interview?._id || res.data._id;

      if (interviewId) {
        localStorage.setItem("interviewId", interviewId);
        navigate("/result");
      } else {
        throw new Error("No Interview ID returned");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="h-screen w-full bg-[#E2E8F0] dark:bg-[#0F172A] flex flex-col items-center justify-center">
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[32px] p-12 shadow-xl text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-black text-[#0F172A] dark:text-white">
            AI is grading your answers...
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#E2E8F0] dark:bg-[#0F172A] relative overflow-hidden font-sans flex flex-col p-6 md:p-10">


      {/* Aurora Silk Background Accents */}
      <div className="absolute top-[-5%] left-[-5%] w-[35rem] h-[35rem] bg-violet-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[30rem] h-[30rem] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-10 flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] dark:text-white tracking-tighter italic">
            Fluen<span className="text-violet-600">tia</span>
          </h1>
          <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em]">
            AI Interactive Session
          </p>
        </div>

        {/* Timer */}
        <div className="bg-[#0F172A] px-6 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${time < 30 ? "bg-red-500 animate-pulse" : "bg-cyan-400"}`} />
          <span className="text-white font-mono text-xl font-black tracking-widest">
            {Math.floor(time / 60)}:{time % 60 < 10 ? `0${time % 60}` : time % 60}
          </span>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex flex-col gap-6 max-w-5xl mx-auto w-full p-2">

        {/* Unified Dashboard Container */}
        <div className="flex-1 flex flex-col bg-white/5 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden">

          {/* QUESTION PORTION */}
          <div className="p-8 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-violet-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            {loading ? (
              <div className="h-8 w-48 bg-white/10 animate-pulse rounded-lg" />
            ) : questions.length > 0 ? (
              <h2 className="text-xl md:text-2xl font-bold text-slate-900   dark:text-white leading-snug transition-colors duration-300">
                {questions[currentQuestion]?.question}
              </h2>
            ) : (
              <h2 className="text-xl font-bold text-red-400">No questions found</h2>
            )}
          </div>

          <div className="flex-1 p-6 relative">

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Structure your answer here..."
              className="w-full h-full 
    bg-slate-100/50 border border-slate-200 shadow-inner
    dark:bg-[#0F172A]/40 dark:border-white/10 dark:shadow-none
   rounded-[28px] p-8 text-[#0F172A] dark:text-white  placeholder:text-slate-400 focus:outline-none  
   focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50  transition-all text-lg resize-none"
            />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="flex justify-between items-center py-4">
          <div className="hidden md:block">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Status: <span className="text-emerald-500">Powered by Groq AI</span>
            </p>
          </div>

          <button
            onClick={handleNextQuestion}
            className="group relative bg-[#0F172A] dark:bg-violet-600/10 border border-violet-500/30 text-white font-black px-12 py-5 rounded-2xl shadow-xl transition-all duration-300 active:scale-95 overflow-hidden"
          >
            <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
              <span className="uppercase tracking-[0.2em] text-xs">
                {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </footer>
      </main>
    </div>
  );
}

export default Interview;