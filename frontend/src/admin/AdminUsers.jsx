import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://ai-mock-interview-platform-bn7e.onrender.com/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlock = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `https://ai-mock-interview-platform-bn7e.onrender.com/api/admin/users/${id}/block`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const filtered = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase())
    );

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
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/admin")}
                        className="text-slate-400 text-xs uppercase tracking-widest font-black mb-2 hover:text-white transition-all"
                    >
                        ← Back to Admin
                    </button>
                    <h1 className="text-4xl font-black text-white tracking-tighter">
                        Manage <span className="text-violet-400">Users</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {users.length} total registered users
                    </p>
                </div>

                {/* Search */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder:text-slate-500 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-6"
                />

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 text-center">
                        <p className="text-3xl font-black text-white">{users.length}</p>
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">Total</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 text-center">
                        <p className="text-3xl font-black text-emerald-400">
                            {users.filter(u => !u.isBlocked).length}
                        </p>
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">Active</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 text-center">
                        <p className="text-3xl font-black text-red-400">
                            {users.filter(u => u.isBlocked).length}
                        </p>
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">Blocked</p>
                    </div>
                </div>

                {/* Users list */}
                <div className="flex flex-col gap-3">
                    {filtered.length === 0 ? (
                        <div className="bg-white/5 border border-white/10 rounded-[24px] p-10 text-center">
                            <p className="text-white font-black">No users found!</p>
                        </div>
                    ) : (
                        filtered.map((user, index) => (
                            <div
                                key={user._id}
                                className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex justify-between items-center gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-2xl bg-violet-600/30 border border-violet-500/30 flex items-center justify-center font-black text-violet-400 text-lg flex-shrink-0">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-white font-black text-sm">
                                                {user.name}
                                            </p>
                                            {user.role === "admin" && (
                                                <span className="bg-violet-600/30 text-violet-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                                                    Admin
                                                </span>
                                            )}
                                            {user.isBlocked && (
                                                <span className="bg-red-500/20 text-red-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                                                    Blocked
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-400 text-xs">{user.email}</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-[10px] mt-1">
                                            Joined {new Date(user.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Block button — don't show for admin */}
                                {user.role !== "admin" && (
                                    <button
                                        onClick={() => handleBlock(user._id)}
                                        className={`font-black px-5 py-2 rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex-shrink-0
                      ${user.isBlocked
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {user.isBlocked ? "Unblock" : "Block"}
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default AdminUsers;