const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  userAnswer: { type: String, required: true },
  score: { type: String, default: "0/10" },
  feedback: { type: String, default: "No feedback yet" },
  status: { type: String, default: "pending" },
});

const interviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  answers: [answerSchema],
  totalScore: { type: String, default: "0/10" },
  overallFeedback: { type: String, default: "Pending review" },
  status: { 
    type: String, 
    default: "pending",
    enum: ["pending", "reviewed"]
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Interview", interviewSchema);