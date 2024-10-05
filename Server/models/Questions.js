const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
