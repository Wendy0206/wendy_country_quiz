import React from 'react';
import './App.css'


export const Result = ({ score, totalQuestions, resetQuiz }) => {

  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      <p>Your score: {score} / {totalQuestions}</p>
      <button onClick={resetQuiz}>Try Again</button>
    </div>
  );
};


