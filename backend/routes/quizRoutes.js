const express = require('express');
const { fetchQuizData } = require('../controllers/quizController');

const router = express.Router();

router.get('/', fetchQuizData);

module.exports = router;
