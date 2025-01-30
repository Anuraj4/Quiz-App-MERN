import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Summary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total } = location.state || { score: 0, total: 0 };

    return (
        <div>
            <h1>Quiz Completed!</h1>
            <p>Your Score: {score} / {total}</p>
            <button onClick={() => navigate('/')}>Restart Quiz</button>
        </div>
    );
};

export default Summary;
