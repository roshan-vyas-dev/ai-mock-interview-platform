import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  // 1. Dark Mode State with LocalStorage persistence
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 2. Effect to apply the class to the root document
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

const handleLogout = () => {

  localStorage.removeItem("token");

  toast.info("Logged out successfully", {
    theme: dark ? "dark" : "light",
    icon: "👋"
  });

  navigate("/");
};

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/60 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/40 dark:border-white/10 px-6 md:px-8 py-4 shadow-sm transition-colors duration-500">
      <div className="flex items-center justify-between">
        {/* LEFT: BRANDING */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate("/dashboard")}
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] dark:bg-violet-600 flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:bg-violet-600 dark:group-hover:bg-cyan-500 transition-colors duration-300">
            F
          </div>
          <h1 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tighter italic leading-none">
            Fluen<span className="text-violet-600 dark:text-cyan-400">tia</span>
          </h1>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-3">
          
          {/* DESKTOP NAV LINKS (Hidden on small devices) */}
          <div className="hidden md:flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 leading-none h-full flex items-center ${
                  isActive(link.path)
                    ? "text-violet-600 dark:text-cyan-400 border-b-2 border-violet-600 dark:border-cyan-400 py-1"
                    : "text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white py-1"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-white/20 transition-all hover:scale-110 active:scale-95 shadow-sm"
          >
            {dark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>

          {/* DESKTOP LOGOUT (Hidden on mobile) */}
          <button
            onClick={handleLogout}
            className="hidden md:flex relative items-center gap-2 bg-[#0F172A] hover:bg-red-400 dark:bg-white dark:hover:bg-red-400  dark:hover:text-white  text-white dark:text-[#0F172A] px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-md"
          >
            <span className="text-[9px] font-black  uppercase tracking-widest leading-none">Logout</span>
          </button>

          {/* MOBILE MENU TOGGLE (Visible only on mobile) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg active:scale-90 transition-all"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-xs font-black uppercase tracking-[0.2em] p-4 rounded-2xl transition-all ${
                isActive(link.path)
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => { handleLogout(); setIsMenuOpen(false); }}
            className="flex items-center justify-center gap-2 w-full p-4 mt-2 rounded-2xl bg-red-500 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-red-500/20"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;