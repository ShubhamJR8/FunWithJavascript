// controllers/answerController.js
const Answer = require('../models/Answers.js'); // Assume this is your Answer model
const Question = require('../models/Questions');

// Submit Answer
const submitAnswer = async (req, res) => {
    const { questionId } = req.params;
    const { userId, answerText } = req.body; // userId is the ID of the user submitting the answer

    try {
        const answer = new Answer({ questionId, userId, answerText });
        await answer.save();

        res.status(201).json({ message: 'Answer submitted successfully', answer });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting answer', error: error.message });
    }
};

// Get All Answers for a Question
const getAllAnswersForQuestion = async (req, res) => {
    const { questionId } = req.params;

    try {
        const answers = await Answer.find({ questionId });
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving answers', error: error.message });
    }
};

// Get Answer by ID
const getAnswerById = async (req, res) => {
    const { answerId } = req.params;

    try {
        const answer = await Answer.findById(answerId);
        if (!answer) return res.status(404).json({ message: 'Answer not found' });

        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving answer', error: error.message });
    }
};

// Update Answer
const updateAnswer = async (req, res) => {
    const { answerId } = req.params;
    const { answerText } = req.body;

    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(
            answerId,
            { answerText },
            { new: true }
        );

        if (!updatedAnswer) return res.status(404).json({ message: 'Answer not found' });
        
        res.status(200).json({ message: 'Answer updated successfully', updatedAnswer });
    } catch (error) {
        res.status(500).json({ message: 'Error updating answer', error: error.message });
    }
};

// Delete Answer
const deleteAnswer = async (req, res) => {
    const { answerId } = req.params;

    try {
        const deletedAnswer = await Answer.findByIdAndDelete(answerId);
        if (!deletedAnswer) return res.status(404).json({ message: 'Answer not found' });

        res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting answer', error: error.message });
    }
};

module.exports = {
    submitAnswer,
    getAllAnswersForQuestion,
    getAnswerById,
    updateAnswer,
    deleteAnswer,
};
