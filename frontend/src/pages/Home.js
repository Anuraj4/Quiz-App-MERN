import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the external CSS

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to the Quiz!</h1>
            <button onClick={() => navigate('/quiz')}>Start Quiz</button>
        </div>
    );
};

export default Home;
