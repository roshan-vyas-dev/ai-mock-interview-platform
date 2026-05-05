import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import TopicSelect from "./pages/TopicSelect";
import AdminDashboard from "./admin/AdminDashboard";
import AdminQuestions from "./admin/AdminQuestions";
import AdminUsers from "./admin/AdminUsers";
import AdminSessions from "./admin/AdminSessions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute>   <Dashboard /> </ProtectedRoute>} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/topics" element={<ProtectedRoute><TopicSelect /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/questions" element={<AdminQuestions />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/sessions" element={<AdminSessions />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Dark theme looks much better with your #0F172A navy accents
        toastClassName="bg-[#0F172A] border border-white/20 backdrop-blur-lg rounded-2xl shadow-2xl"
        bodyClassName="font-sans text-xs font-black uppercase tracking-widest"
        progressClassName="bg-gradient-to-r from-violet-600 to-cyan-400"
      />
    </Router>
  );
}

export default App;