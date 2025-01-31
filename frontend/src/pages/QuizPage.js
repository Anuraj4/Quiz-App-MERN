import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../quizPageStyles.css'; // Import the updated CSS

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const { data } = await axios.get("https://quiz-app-mern-h4rm.onrender.com");
                setQuestions(data.questions);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz data", error);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, []);

    const handleOptionSelect = (option, questionIndex) => {
        const updatedSelections = [...selectedOptions];
        updatedSelections[questionIndex] = option;
        setSelectedOptions(updatedSelections);

        if (option.is_correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmitQuiz = () => {
        setQuizCompleted(true);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="quiz-container">
            <h1>{loading ? "Loading quiz..." : "Quiz: Genetics and Evolution"}</h1>

            {loading ? (
                <p>Loading quiz...</p>
            ) : quizCompleted ? (
                <div className="quiz-summary">
                    <h2>Quiz Completed</h2>
                    <p>Total Score: {score}</p>
                    <h3>Summary of Answers</h3>
                    <ul>
                        {questions.map((question, index) => {
                            const selectedOption = selectedOptions[index];
                            const correctOption = question.options.find(option => option.is_correct);

                            return (
                                <li key={question.id}>
                                    <p><strong>Q:</strong> {question.description}</p>
                                    <p><strong>Your Answer:</strong> {selectedOption ? selectedOption.description : "Not Answered"}</p>
                                    <p><strong>Correct Answer:</strong> {correctOption ? correctOption.description : "No Correct Answer"}</p>
                                </li>
                            );
                        })}
                    </ul>
                    <button onClick={handleGoHome}>Go to Home</button>
                </div>
            ) : (
                <div>
                    <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
                    <h3>{questions[currentQuestionIndex]?.description}</h3>

                    <div className="quiz-options">
                        {questions[currentQuestionIndex]?.options?.map((option) => (
                            <label key={option.id}>
                                <input
                                    type="radio"
                                    name={`question-${currentQuestionIndex}`}
                                    value={option.id}
                                    checked={selectedOptions[currentQuestionIndex]?.id === option.id}
                                    onChange={() => handleOptionSelect(option, currentQuestionIndex)}
                                />
                                {option.description}
                            </label>
                        ))}
                    </div>

                    <div className="quiz-buttons">
                        {currentQuestionIndex > 0 && (
                            <button onClick={handlePreviousQuestion}>Previous</button>
                        )}

                        {currentQuestionIndex < questions.length - 1 ? (
                            <button onClick={handleNextQuestion}>Next</button>
                        ) : (
                            <button onClick={handleSubmitQuiz}>Submit</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
