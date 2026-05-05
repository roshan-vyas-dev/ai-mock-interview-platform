const Question = require("../models/Question");

// GET QUESTIONS - filtered by topic and difficulty, random 5
exports.getQuestions = async (req, res) => {
  try {
    const { topic, difficulty } = req.query;

    let filter = {};

    if (topic && topic !== "General") {
      filter.category = topic;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Get all matching questions
    const allQuestions = await Question.find(filter);

    // Shuffle and pick only 5 random questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);

    res.json(selected);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD QUESTION (Admin)
exports.addQuestion = async (req, res) => {
  try {
    const { question, category, difficulty } = req.body;
    const newQuestion = new Question({ question, category, difficulty });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL QUESTIONS (Admin)
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE QUESTION (Admin)
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE QUESTION (Admin)
exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};