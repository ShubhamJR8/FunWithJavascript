const Question = require('../models/Questions');
const Quiz = require('../models/Quizs'); // Assuming you have a Quiz model

// Add Question to Quiz
const addQuestionToQuiz = async (req, res) => {
    const { quizId } = req.params;
    const { type, questionText, options, correctAnswer } = req.body;

    try {
        const question = new Question({ quizId, type, questionText, options, correctAnswer });
        await question.save();
        
        // Update the Quiz document to include the new question
        await Quiz.findByIdAndUpdate(quizId, { $push: { questions: question._id } });

        res.status(201).json({ message: 'Question added successfully', question });
    } catch (error) {
        res.status(500).json({ message: 'Error adding question', error: error.message });
    }
};

// Get Questions by Quiz ID
const getQuestionsByQuizId = async (req, res) => {
    const { quizId } = req.params;

    try {
        const questions = await Question.find({ quizId });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving questions', error: error.message });
    }
};

// Get Question by ID
const getQuestionById = async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await Question.findById(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving question', error: error.message });
    }
};

// Update Question
const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const { type, questionText, options, correctAnswer } = req.body;

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { type, questionText, options, correctAnswer },
            { new: true }
        );

        if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Error updating question', error: error.message });
    }
};

// Delete Question
const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;

    try {
        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        if (!deletedQuestion) return res.status(404).json({ message: 'Question not found' });
        
        // Optionally remove the question ID from the related quiz
        await Quiz.findOneAndUpdate({ questions: questionId }, { $pull: { questions: questionId } });

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question', error: error.message });
    }
};

module.exports = {
    addQuestionToQuiz,
    getQuestionsByQuizId,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
};