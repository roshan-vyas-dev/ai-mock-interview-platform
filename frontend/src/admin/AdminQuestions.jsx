import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminQuestions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    question: "",
    category: "React",
    difficulty: "Easy",
  });

  const topics = ["All", "React", "Node.js", "MongoDB", "JavaScript", "DSA", "General"];
  const difficulties = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://ai-mock-interview-platform-bn7e.onrender.com/api/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.question) {
      alert("Please enter a question!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (editQuestion) {
        await axios.put(
          `https://ai-mock-interview-platform-bn7e.onrender.com/api/questions/${editQuestion._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "https://ai-mock-interview-platform-bn7e.onrender.com/api/questions",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setForm({ question: "", category: "React", difficulty: "Easy" });
      setShowForm(false);
      setEditQuestion(null);
      fetchQuestions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (q) => {
    setEditQuestion(q);
    setForm({
      question: q.question,
      category: q.category,
      difficulty: q.difficulty,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://ai-mock-interview-platform-bn7e.onrender.com/api/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchQuestions();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = filter === "All"
    ? questions
    : questions.filter((q) => q.category === filter);

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate("/admin")}
              className="text-slate-400 text-xs uppercase tracking-widest font-black mb-2 hover:text-white transition-all"
            >
              ← Back to Admin
            </button>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              Manage <span className="text-violet-400">Questions</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {questions.length} total questions
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditQuestion(null);
              setForm({ question: "", category: "React", difficulty: "Easy" });
            }}
            className="bg-violet-600 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all"
          >
            + Add Question
          </button>
        </div>

        {/* ADD / EDIT FORM */}
        {showForm && (
          <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 mb-8">
            <h2 className="text-white font-black uppercase tracking-widest text-sm mb-6">
              {editQuestion ? "Edit Question" : "Add New Question"}
            </h2>

            <textarea
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="Enter your question here..."
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder:text-slate-500 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4 resize-none"
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black mb-2">
                  Topic
                </p>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {topics.filter(t => t !== "All").map((t) => (
                    <option key={t} value={t} className="bg-[#0F172A]">{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black mb-2">
                  Difficulty
                </p>
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {difficulties.map((d) => (
                    <option key={d} value={d} className="bg-[#0F172A]">{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="bg-violet-600 text-white font-black px-8 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                {editQuestion ? "Update Question" : "Add Question"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditQuestion(null);
                }}
                className="bg-white/10 text-white font-black px-8 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* FILTER */}
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

        {/* QUESTIONS LIST */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-[24px] p-10 text-center">
              <p className="text-white font-black">No questions found!</p>
              <p className="text-slate-400 text-sm mt-1">
                Add your first question using the button above
              </p>
            </div>
          ) : (
            filtered.map((q, index) => (
              <div
                key={q._id}
                className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex justify-between items-start gap-4"
              >
                <div className="flex-1">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="text-[9px] font-black text-slate-400">
                      #{index + 1}
                    </span>
                    <span className="bg-violet-600/30 text-violet-400 text-[9px] font-black px-2 py-1 rounded-full uppercase">
                      {q.category}
                    </span>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase
                      ${q.difficulty === "Easy" ? "bg-emerald-500/20 text-emerald-400" :
                        q.difficulty === "Medium" ? "bg-amber-500/20 text-amber-400" :
                        "bg-red-500/20 text-red-400"}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="text-white font-medium text-sm leading-relaxed">
                    {q.question}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(q)}
                    className="bg-amber-500/20 text-amber-400 font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="bg-red-500/20 text-red-400 font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminQuestions;