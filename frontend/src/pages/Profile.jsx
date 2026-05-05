import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [nameForm, setNameForm] = useState({ name: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setNameForm({ name: res.data.name });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        { name: nameForm.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Name updated successfully!");
      setEditing(false);
      fetchProfile();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setError("Failed to update name!");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Passwords do not match!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Password changed successfully!");
      setChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setError("Current password is wrong!");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#E2E8F0] dark:bg-[#0F172A]  flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#E2E8F0] dark:bg-[#0F172A] relative font-sans flex flex-col overflow-x-hidden touch-pan-y">

      {/* 1. TOP LEFT ACCENT */}
  <div className="fixed top-[-5%] left-[-5%] w-[20rem] md:w-[35rem] h-[20rem] md:h-[35rem] bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

  {/* 2. BOTTOM RIGHT ACCENT */}
  <div className="fixed bottom-[-5%] right-[-10%] w-[18rem] md:w-[30rem] h-[18rem] md:h-[30rem] bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* BACKGROUND ACCENTS - Fixed so they don't move during scroll */}
      <div className="fixed top-[-5%] left-[-5%] w-[20rem] md:w-[35rem] h-[20rem] md:h-[35rem] bg-violet-400/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-5%] right-[-10%] w-[18rem] md:w-[30rem] h-[18rem] md:h-[30rem] bg-cyan-400/20 rounded-full blur-[70px] md:blur-[100px] pointer-events-none" />

      {/* CONTENT AREA: pt-24/32 provides room for the fixed Navbar */}
      <div className="relative z-10 max-w-2xl mx-auto w-full p-5 md:p-10 pt-24 md:pt-32">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] dark:text-white tracking-tighter">
            My <span className="text-violet-600">Profile</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            Manage your account details
          </p>
        </div>

        {/* Status Messages */}
        <div className="space-y-4 mb-6">
          {message && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-700 font-black text-sm px-6 py-4 rounded-2xl animate-in fade-in duration-300">
              ✅ {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 font-black text-sm px-6 py-4 rounded-2xl animate-in fade-in duration-300">
              ❌ {error}
            </div>
          )}
        </div>

        {/* Profile card */}
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[32px] p-6 md:p-8 shadow-xl mb-6">

          {/* Avatar and name - Wrapped for responsiveness */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 text-center sm:text-left">
            <div className="w-20 h-20 rounded-3xl bg-violet-600 flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-violet-500/30 shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden w-full">
              <h2 className="text-2xl font-black text-[#0F172A]  dark:text-white  truncate">
                {user?.name}
              </h2>
              <p className="text-slate-500 text-sm truncate">{user?.email}</p>
              <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mt-1 inline-block
                ${user?.role === "admin" ? "bg-violet-600 text-white" : "bg-[#0F172A] text-white"}`}>
                {user?.role}
              </span>
            </div>
          </div>

          {/* Account info - Changed grid for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/40  dark:bg-white/5 rounded-2xl p-4">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                Member Since
              </p>
              <p className="text-[#0F172A]  dark:text-white font-black text-sm">
                {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="bg-white/40 dark:bg-white/5 rounded-2xl p-4">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                Account Status
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 font-black text-sm">
                ● Active
              </p>
            </div>
          </div>

          {/* Edit Buttons - transform-gpu used for smooth scale */}
          <div className="space-y-3">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="w-full bg-white/40 border border-white/60 text-[#0F172A] dark:text-white font-black px-6 py-4 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all transform-gpu"
              >
                ✏️ Edit Name
              </button>
            ) : (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                <input
                  type="text"
                  value={nameForm.name}
                  onChange={(e) => setNameForm({ name: e.target.value })}
                  className="w-full bg-white/60 dark:bg-white/10 border border-white/60 dark:border-white/10 rounded-2xl p-4 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 font-medium"
                  placeholder="Enter new name"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleUpdateName}
                    className="flex-1 bg-violet-600 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all transform-gpu"
                  >
                    Save Name
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-white/40 text-[#0F172A] dark:text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all transform-gpu"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {!changingPassword ? (
              <button
                onClick={() => setChangingPassword(true)}
                className="w-full bg-white/40  border border-white/60 text-[#0F172A] dark:text-white font-black px-6 py-4 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all transform-gpu"
              >
                🔒 Change Password
              </button>
            ) : (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full bg-white/60 dark:bg-white/10 border border-white/60 dark:border-white/10 rounded-2xl p-4 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 font-medium"
                  placeholder="Current password"
                />
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full bg-white/60 dark:bg-white/10 border border-white/60 dark:border-white/10 rounded-2xl p-4 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 font-medium"
                  placeholder="New password"
                />
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full bg-white/60 dark:bg-white/10 border border-white/60 dark:border-white/10 rounded-2xl p-4 text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 font-medium"
                  placeholder="Confirm new password"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 bg-violet-600 text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all transform-gpu"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={() => setChangingPassword(false)}
                    className="flex-1 bg-white/40 text-[#0F172A] dark:text-white font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all transform-gpu"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout button */}
        <div className="pb-12">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500/20 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400 font-black px-6 py-4 rounded-2xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all transform-gpu"
          >
            🚪 Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;