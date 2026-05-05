const express = require("express");
const router = express.Router();
const {
  getQuestions,
  getAllQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// User — get 5 random questions by topic and difficulty
router.get("/", getQuestions);

// Admin — get all questions
router.get("/all", protect, adminOnly, getAllQuestions);

// Admin — add question
router.post("/", protect, adminOnly, addQuestion);

// Admin — update question
router.put("/:id", protect, adminOnly, updateQuestion);

// Admin — delete question
router.delete("/:id", protect, adminOnly, deleteQuestion);

module.exports = router;