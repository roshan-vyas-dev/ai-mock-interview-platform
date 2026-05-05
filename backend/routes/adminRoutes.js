const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Interview = require("../models/Interview");

// Get all users
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Block / unblock user
router.put("/users/:id/block", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all sessions
router.get("/sessions", protect, adminOnly, async (req, res) => {
  try {
    const sessions = await Interview.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;