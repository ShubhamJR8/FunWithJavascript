// routes/quizRoutes.js
const express = require("express");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController.js");

const router = express.Router();

// Create Quiz
router.post("/quizzes", createQuiz);

// Get All Quizzes
router.get("/quizzes", getAllQuizzes);

// Get Quiz by ID
router.get("/quizzes/:quizId", getQuizById);

// Update Quiz
router.put("/quizzes/:quizId", updateQuiz);

// Delete Quiz
router.delete("/quizzes/:quizId", deleteQuiz);

module.exports = router;
