import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import Summary from './pages/Summary';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/summary" element={<Summary />} />
            </Routes>
        </Router>
    );
}

export default App;
