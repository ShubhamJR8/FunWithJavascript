// routes/questionRoutes.js
const express = require('express');
const { 
    addQuestionToQuiz, 
    getQuestionsByQuizId, 
    getQuestionById, 
    updateQuestion, 
    deleteQuestion 
} = require('../controllers/questionController.js');

const router = express.Router();

// Add Question to Quiz
router.post('/quizzes/:quizId/questions', addQuestionToQuiz);

// Get Questions by Quiz ID
router.get('/quizzes/:quizId/questions', getQuestionsByQuizId);

// Get Question by ID
router.get('/questions/:questionId', getQuestionById);

// Update Question
router.put('/questions/:questionId', updateQuestion);

// Delete Question
router.delete('/questions/:questionId', deleteQuestion);

module.exports = router;
