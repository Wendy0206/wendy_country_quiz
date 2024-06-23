import React, { useState } from 'react';
import './App.css'

export const Question = ({ country, handleAnswerSubmit }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAnswerSubmit(userAnswer);
    setUserAnswer('');
  };

  return (
    <div className="question-container">
      <h2>What is the capital city of {country}?</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter capital city"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


