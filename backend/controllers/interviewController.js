const Interview = require("../models/Interview");
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// SUBMIT INTERVIEW
exports.submitInterview = async (req, res) => {
  try {
    const { topic, difficulty, answers } = req.body;
    const userId = req.user.id;

    // Grade each answer with Groq AI
    const gradedAnswers = [];

    for (let i = 0; i < answers.length; i++) {
      const { question, userAnswer } = answers[i];

      const prompt = `
You are an expert interview evaluator.
Question: ${question}
Student Answer: ${userAnswer}
Give ONLY this format:
Score: X/10
Feedback: your feedback here`;

      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
      });

      const text = completion.choices[0].message.content;
      const scoreMatch = text.match(/\d+\/10/);
      const score = scoreMatch ? scoreMatch[0] : "5/10";
      const feedback = text.split("Feedback:")[1]?.trim() || "Good attempt!";

      gradedAnswers.push({
        question,
        userAnswer,
        score,
        feedback,
        status: "reviewed",
      });
    }

    // Calculate total score
    const scores = gradedAnswers.map(a => 
      parseInt(a.score.split("/")[0])
    );
    const avg = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
    );
    const totalScore = `${avg}/10`;

    const newInterview = new Interview({
      user: userId,
      topic,
      difficulty,
      answers: gradedAnswers,
      totalScore,
      overallFeedback: `You scored ${totalScore}. Keep practicing!`,
      status: "reviewed",
    });

    await newInterview.save();

    res.status(201).json({
      message: "Interview submitted successfully",
      interview: newInterview,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET USER INTERVIEWS
exports.getUserInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ 
      user: req.user.id 
    }).sort({ createdAt: -1 });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE INTERVIEW
exports.getSingleInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL INTERVIEWS (ADMIN)
exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};