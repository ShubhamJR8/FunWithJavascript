const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answerText: String, // User's answer (input or selected MCQ option)
  rating: {
    type: Number, // Rating for input-based questions
    min: 1,
    max: 5
  },
  isCorrect: Boolean, // For MCQ answers
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);
