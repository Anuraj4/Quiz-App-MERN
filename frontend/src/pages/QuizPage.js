import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);

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

    const handleSubmitQuiz = () => {
        alert(`Your score is: ${score}`);
    };

    return (
        <div>
            <h1>{loading ? "Loading quiz..." : "Quiz: Genetics and Evolution"}</h1>

            {loading ? (
                <p>Loading quiz...</p>
            ) : (
                <div>
                    <h2>{questions[currentQuestionIndex]?.description}</h2>

                    <ul>
                        {questions[currentQuestionIndex]?.options?.map((option) => (
                            <li key={option.id} onClick={() => handleOptionSelect(option, currentQuestionIndex)}>
                                {option.description}
                            </li>
                        ))}
                    </ul>

                    {currentQuestionIndex < questions.length - 1 ? (
                        <button onClick={handleNextQuestion}>Next Question</button>
                    ) : (
                        <button onClick={handleSubmitQuiz}>Submit Quiz</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizPage;
