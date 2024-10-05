// routes/answerRoutes.js
const express = require('express');
const { 
    submitAnswer, 
    getAllAnswersForQuestion, 
    getAnswerById, 
    updateAnswer, 
    deleteAnswer 
} = require('../controllers/answerController.js');

const router = express.Router();

// Submit Answer
router.post('/questions/:questionId/answers', submitAnswer);

// Get All Answers for a Question
router.get('/questions/:questionId/answers', getAllAnswersForQuestion);

// Get Answer by ID
router.get('/answers/:answerId', getAnswerById);

// Update Answer
router.put('/answers/:answerId', updateAnswer);

// Delete Answer
router.delete('/answers/:answerId', deleteAnswer);

module.exports = router;
