const Question = require("../models/Question");


// ADD QUESTION
exports.addQuestion = async (req, res) => {

  try {

    const { question, category, difficulty } = req.body;

    const newQuestion = await Question.create({
      question,
      category,
      difficulty,
    });

    res.status(201).json({
      message: "Question added successfully",
      question: newQuestion,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET ALL QUESTIONS
exports.getQuestions = async (req, res) => {

  try {

    const questions = await Question.find();

    res.status(200).json(questions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};