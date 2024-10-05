const Quiz = require("../models/Quizs");

// Create Quiz
const createQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const quiz = new Quiz({ title, description });
    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating quiz", error: error.message });
  }
};

// Get All Quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving quizzes", error: error.message });
  }
};

// Get Quiz by ID
const getQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving quiz", error: error.message });
  }
};

// Update Quiz
const updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { title, description } = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, description },
      { new: true }
    );

    if (!updatedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json({ message: "Quiz updated successfully", updatedQuiz });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating quiz", error: error.message });
  }
};

// Delete Quiz
const deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting quiz", error: error.message });
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
