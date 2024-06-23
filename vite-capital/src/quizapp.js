import React, { useState } from 'react';
import Question from './question';
import Result from './result';
import './App.css'

export const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { country: 'France', capital: 'Paris' },
    { country: 'Japan', capital: 'Tokyo' },
    { country: 'Australia', capital: 'Canberra' },
    // Add more countries and capitals as needed
  ];

  const handleAnswerSubmit = (answer) => {
    const correctAnswer = questions[currentQuestion].capital;
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
    <h1>E2KNCVEKNKVNVKNKNRVV</h1>
    </div>
  )
};


