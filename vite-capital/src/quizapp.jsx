import React, { useState, useEffect, useRef } from 'react';
import './App.css'

const QuizApp = () => {

  const goodAnswer = useRef('');
  const score = useRef(0);
  const questionIndex = useRef(0);
  const quizQuestions = useRef([]);
  const [count, setCount] = useState(null);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [currentUrl, setCurrentUrl] = useState('http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg');

  const all_Questions = ['BD', 'AL', 'US', 'DO', 'DZ', 'AS', 'KH', 'CN', 'EG', 'SV', 'ET', 'CA'];

 
  useEffect(() => {
    let timerInterval;
    if(count>=0){
      timerInterval = setInterval(function() {
       setCount(count-1);
    
        // End the quiz if time runs out
        if (count==1) {
        
         displayQuestion();
         setCount(20);
        }
      }, 1000);

      return () => {
        clearInterval(timerInterval);
     
      }
    }
  }, [count]);
 

  const startQuiz = () => {

    document.getElementById("start-button").style.display = "none";
    document.getElementById("all_answers").style.display = "block";
    document.querySelector("span").style.display = "block";
    document.querySelector("p").style.display = "block";
    let shuffled = all_Questions.sort(() => 0.5 - Math.random());
    quizQuestions.current = shuffled.slice(0, 10); // here we get 3 other random answers;
  setCount(20);
    displayQuestion();
    
  }

  function displayQuestion() {
  
    let current_one = quizQuestions.current[questionIndex.current];
    let flagtest = 'http://purecatamphetamine.github.io/country-flag-icons/3x2/' + current_one + '.svg';

    setCurrentUrl(flagtest);
    let clone_array = quizQuestions.current;

    const shuffled = clone_array.sort(() => 0.5 - Math.random());

    let selected = shuffled.slice(0, 4); // here we get 3 other random answers;

    let each_option = [current_one, ...selected];
    const shuffledArray = each_option.sort((a, b) => 0.5 - Math.random());
    setAnswers(shuffledArray);
    goodAnswer.current = current_one;

  }


  const check_answers = (answer, e) => {
    
    if (answers[answer] == goodAnswer.current) {
      score.current = score.current + 1;
    }

    questionIndex.current = questionIndex.current + 1;

    if (questionIndex.current <= 9) {
      setCount(20);
      displayQuestion();
    } else {
      clearInterval(timerInterval);
      const dialog = document.getElementById('modal_dialog');
      dialog.showModal();
    }
  }

  const reset_game = () => {
    document.getElementById("start-button").style.display = "block";
    document.getElementById("all_answers").style.display = "none";
    document.querySelector("span").style.display = "none";
    score.current = 0;
    setCurrentUrl('http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg');
    scorePercentage.current = 0;
  }


  return (
    <div className='container_div'>

    <div className="quiz-container">
      <h3>History</h3>
      <img alt="United States" src={currentUrl} />
      <div id="question-container">
        <p id="question-text">Hey! Which country is this?</p>
        <div id='all_answers'>
          <div id="answer-buttons">
            <button className='answer-button' onClick={(e) => check_answers(0, e)}>{answers[0]}</button>
            <button className='answer-button' onClick={(e) => check_answers(1, e)}>{answers[1]}</button>
            <button className='answer-button' onClick={(e) => check_answers(2, e)}>{answers[2]}</button>
            <button className='answer-button' onClick={(e) => check_answers(3, e)}>{answers[3]}</button>
          </div>
        </div>
      </div>
      <div id="controls-container">
        <button id="start-button" onClick={() => startQuiz()}>Start Quiz</button>
        <div id="timer-container">
          <span id="timer-text">Time Left: {count}</span>
        </div>
      </div>


      <dialog id="modal_dialog" className="rounded dialog_margin">

        <div className="modal-content">
          <div className="modal-body">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score.current} out of 10</p>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{ fontFamily: "arial" }} onClick={() => {

              const dialog = document.getElementById('modal_dialog');

              dialog.close();
              reset_game();
            }}>Close</button>
          </div>

        </div>

      </dialog>
    </div>
    </div>
  )
};

export default QuizApp;
