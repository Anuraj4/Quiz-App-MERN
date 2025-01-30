import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const navigate = useNavigate();  // Create navigate object

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/quiz");
                setQuestions(data.questions);  // Assuming the response has a 'questions' array
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

        // Calculate score if the selected option is correct
        if (option.is_correct) {
            const newScore = score + parseFloat(option.score || 1);
            setScore(newScore);
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
        navigate('/');  // Corrected to use navigate() instead of push()
    };

    const renderSummary = () => {
        return (
            <div>
                <h2>Quiz Completed</h2>
                <p>Total Score: {score}</p>
                <h3>Summary of Answers</h3>
                <ul>
                    {questions.map((question, index) => {
                        const selectedOption = selectedOptions[index];
                        const correctOption = question.options.find(option => option.is_correct);

                        return (
                            <li key={question.id}>
                                <p>{question.description}</p>
                                <p>Your Answer: {selectedOption ? selectedOption.description : "Not Answered"}</p>
                                <p>Correct Answer: {correctOption ? correctOption.description : "No Correct Answer"}</p>
                            </li>
                        );
                    })}
                </ul>

                {/* Button to go to home page */}
                <button onClick={handleGoHome}>Go to Home</button>
            </div>
        );
    };

    return (
        <div>
            <h1>{loading ? "Loading quiz..." : "Quiz: Genetics and Evolution"}</h1>

            {loading ? (
                <p>Loading quiz...</p>
            ) : quizCompleted ? (
                renderSummary()
            ) : (
                <div>
                    {/* Display the current question number */}
                    <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>

                    <h3>{questions[currentQuestionIndex]?.description}</h3>

                    <form>
                        {questions[currentQuestionIndex]?.options?.map((option) => (
                            <div key={option.id}>
                                <input
                                    type="radio"
                                    id={`question-${currentQuestionIndex}-option-${option.id}`}
                                    name={`question-${currentQuestionIndex}`}
                                    value={option.id}
                                    checked={selectedOptions[currentQuestionIndex]?.id === option.id}
                                    onChange={() => handleOptionSelect(option, currentQuestionIndex)}
                                />
                                <label htmlFor={`question-${currentQuestionIndex}-option-${option.id}`}>
                                    {option.description}
                                </label>
                            </div>
                        ))}
                    </form>

                    <div>
                        {currentQuestionIndex > 0 && (
                            <button onClick={handlePreviousQuestion}>Previous Question</button>
                        )}

                        {currentQuestionIndex < questions.length - 1 ? (
                            <button onClick={handleNextQuestion}>Next Question</button>
                        ) : (
                            <button onClick={handleSubmitQuiz}>Submit Quiz</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
