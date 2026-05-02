const express = require("express");

const router = express.Router();

const {
  addQuestion,
  getQuestions,
} = require("../controllers/questionController");

// ADD QUESTION
router.post("/add", addQuestion);

// GET QUESTIONS
router.get("/", getQuestions);

module.exports = router;