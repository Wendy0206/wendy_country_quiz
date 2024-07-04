import React, { useState, useEffect, useRef } from 'react';
import './App.css'

const QuizApp = () => {

  const goodAnswer = useRef('');
  const score = useRef(0);
  const questionIndex = useRef(0);
  const quizQuestions = useRef([]);
  const [count, setCount] = useState(null);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [currentUrl, setCurrentUrl] = useState('https://flagpedia.net/data/us/w702/tx.webp');

  const all_countries = [
    {name:"Alabama" , flag: "https://flagpedia.net/data/us/w702/al.webp" },
    {name:"Alaska" , flag: "https://flagpedia.net/data/us/w702/ak.webp" },
    {name:"Arizona" , flag: "https://flagpedia.net/data/us/w702/az.webp" },
    {name:"Arkansas" , flag: "https://flagpedia.net/data/us/w702/ar.webp" },
    {name:"California" , flag: "https://flagpedia.net/data/us/w702/ca.webp" },
    {name:"Colorado" , flag: "https://flagpedia.net/data/us/w702/co.webp" },
    {name:"Connecticut" , flag: "https://flagpedia.net/data/us/w702/ct.webp" },
    {name:"Delaware" , flag: "https://flagpedia.net/data/us/w702/de.webp" },
    {name:"Florida" , flag: "https://flagpedia.net/data/us/w702/fl.webp" },
    {name:"Georgia" , flag: "https://flagpedia.net/data/us/w702/ga.webp" },
    {name:"Hawaii" , flag: "https://flagpedia.net/data/us/w702/hi.webp" },
    {name:"Idaho" , flag: "https://flagpedia.net/data/us/w702/id.webp" },
    {name:"Illinois" , flag: "https://flagpedia.net/data/us/w702/il.webp" },
    {name:"Indiana" , flag: "https://flagpedia.net/data/us/w702/in.webp" },
    {name:"Iowa" , flag: "https://flagpedia.net/data/us/w702/ia.webp" },
    {name:"Kansas" , flag: "https://flagpedia.net/data/us/w702/ks.webp" },
    {name:"Kentucky" , flag: "https://flagpedia.net/data/us/w702/ky.webp" },
    {name:"Louisiana" , flag: "https://flagpedia.net/data/us/w702/la.webp" },
    {name:"Maine" , flag: "https://flagpedia.net/data/us/w702/me.webp" },
    {name:"Maryland" , flag: "https://flagpedia.net/data/us/w702/md.webp" },
    {name:"Massachusetts" , flag: "https://flagpedia.net/data/us/w702/ma.webp" },
    {name:"Michigan" , flag: "https://flagpedia.net/data/us/w702/mi.webp" },
    {name:"Minnesota" , flag: "https://flagpedia.net/data/us/w702/mn.webp" },
    {name:"Mississippi" , flag: "https://flagpedia.net/data/us/w702/ms.webp" },
    {name:"Missouri" , flag: "https://flagpedia.net/data/us/w702/mo.webp" },
    {name:"Montana" , flag: "https://flagpedia.net/data/us/w702/mt.webp" },
    {name:"Nebraska" , flag: "https://flagpedia.net/data/us/w702/ne.webp" },
    {name:"Nevada" , flag: "https://flagpedia.net/data/us/w702/nv.webp" },
    {name:"New Hampshire" , flag: "https://flagpedia.net/data/us/w702/nh.webp" },
    {name:"New Jersey" , flag: "https://flagpedia.net/data/us/w702/nj.webp" },
    {name:"New York" , flag: "https://flagpedia.net/data/us/w702/ny.webp" },
    {name:"North Carolina" , flag: "https://flagpedia.net/data/us/w702/nc.webp" },
    {name:"Ohio" , flag: "https://flagpedia.net/data/us/w702/oh.webp" },
    {name:"Oklahoma" , flag: "https://flagpedia.net/data/us/w702/ok.webp" },
    {name:"Oregon" , flag: "https://flagpedia.net/data/us/w702/or.webp" },
    {name:"Pennsylvania" , flag: "https://flagpedia.net/data/us/w702/pa.webp" },
    {name:"Rhode Island" , flag: "https://flagpedia.net/data/us/w702/ri.webp" },
    {name:"South Carolina" , flag: "https://flagpedia.net/data/us/w702/sc.webp" },
    {name:"South Dakota" , flag: "https://flagpedia.net/data/us/w702/sd.webp" },
    {name:"Tennessee" , flag: "https://flagpedia.net/data/us/w702/tn.webp" },
    {name:"Texas" , flag: "https://flagpedia.net/data/us/w702/tx.webp" },
    {name:"Utah" , flag: "https://flagpedia.net/data/us/w702/ut.webp" },
    {name:"Vermont" , flag: "https://flagpedia.net/data/us/w702/vt.webp" },
    {name:"Virginia" , flag: "https://flagpedia.net/data/us/w702/va.webp" },
    {name:"Washington" , flag: "https://flagpedia.net/data/us/w702/wa.webp" },
    {name:"West Virginia" , flag: "https://flagpedia.net/data/us/w702/wv.webp" },
    {name:"Wisconsin" , flag: "https://flagpedia.net/data/us/w702/wi.webp" },
    {name:"Wyoming" , flag: "https://flagpedia.net/data/us/w702/wy.webp" }
    ];
    

  let timerInterval;
  

  useEffect(() => {

    if (count >= 0) {
      timerInterval = setInterval(function () {
        setCount(count - 1);

        // End the quiz if time runs out
        if (count == 1) {

          displayQuestion();
          setCount(20);
        }
      }, 1000);

      return () => {
        clearInterval(timerInterval);

      }
    }
  }, [count]);

  const remove_highlight = () => {

    let all_answer = document.querySelectorAll('.answer-button');
    if (all_answer) {
      all_answer.forEach((elm) =>
        elm.classList.remove('right_answer'));
    }

    if (all_answer) {
      all_answer.forEach((elm) =>
        elm.classList.remove('wrong_answer'));
    }

  }

  const startQuiz = () => {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("all_answers").style.display = "block";
    document.querySelector("span").style.display = "block";
    document.querySelector("p").style.display = "block";
    quizQuestions.current 
   
let clone_array = [all_countries[Math.floor(Math.random()*5)],all_countries[Math.floor(Math.random()*5)+5],
all_countries[Math.floor(Math.random()*5)+10],all_countries[Math.floor(Math.random()*5)+15],
all_countries[Math.floor(Math.random()*5)+20],all_countries[Math.floor(Math.random()*5)+25],
all_countries[Math.floor(Math.random()*5)+30],all_countries[Math.floor(Math.random()*5)+35],
all_countries[Math.floor(Math.random()*5)+40],all_countries[Math.floor(Math.random()*4)+45]];
 quizQuestions.current= clone_array.sort(() => 0.5 - Math.random());

    setCount(20);
    displayQuestion();

  }

  function displayQuestion() {
  
    remove_highlight();
    let current_one = quizQuestions.current[questionIndex.current];

    setCurrentUrl(current_one.flag);
    let clone_array = [...quizQuestions.current];
    clone_array.splice(questionIndex.current,1);

    const shuffled = clone_array.sort(() => 0.5 - Math.random());
   
    let each_option = shuffled.splice(0, 3); // here we get 3 other random answers;
    let next=[...each_option];
    next.splice((each_option.length + 1) * Math.random() | 0, 0, current_one);

    each_option.splice((each_option.length + 1) * Math.random() | 0, 0, current_one);
    setAnswers(each_option);
    goodAnswer.current = current_one.name;

  }


  const check_answers = (answer) => {
    let button = document.getElementsByClassName("answer-button");

    if (answers[answer].name == goodAnswer.current) {
      score.current = score.current + 1;
      button[answer].classList.add('right_answer');
    }
    else {
      button[answer].classList.add('wrong_answer');
        if(button[0].innerText==goodAnswer.current){
           button[0].classList.add('right_answer');
      }
      else if(button[1].innerText==goodAnswer.current){
          button[1].classList.add('right_answer');
      }
      else if(button[2].innerText==goodAnswer.current){
         button[2].classList.add('right_answer');
      }
       else if(button[3].innerText==goodAnswer.current){
          button[3].classList.add('right_answer');
      }

    }
    questionIndex.current = questionIndex.current + 1;

    if (questionIndex.current <= 9) {

      setTimeout(() => {
        setCount(20);
        displayQuestion();
      }, 1000);


    } else {
      setTimeout(() => {
        clearInterval(timerInterval);
      const dialog = document.getElementById('modal_dialog');
      dialog.showModal();
      }, 1000);
    
    }
  }

  const reset_game = () => {
    const dialog = document.getElementById('modal_dialog');

    dialog.close();
    remove_highlight();
    clearInterval(timerInterval);
    document.getElementById("start-button").style.display = "block";
    document.getElementById("all_answers").style.display = "none";
    document.querySelector("span").style.display = "none";
    score.current = 0;
    questionIndex.current=0;
    quizQuestions.current=[];
    setCurrentUrl('https://flagpedia.net/data/us/w702/tx.webp');

  }


  return (
    <div className='container_div'>

      <div className="quiz-container">
        <h3>History</h3>
        <img alt="United States" src={currentUrl} />
        <div id="question-container">
          <p id="question-text">Hey! Which state is this?</p>
          <div id='all_answers'>
            <div id="answer-buttons">
              <button className='answer-button' onClick={() => check_answers(0)}>{answers[0].name}</button>
              <button className='answer-button' onClick={() => check_answers(1)}>{answers[1].name}</button>
              <button className='answer-button' onClick={() => check_answers(2)}>{answers[2].name}</button>
              <button className='answer-button' onClick={() => check_answers(3)}>{answers[3].name}</button>
            </div>
          </div>
        </div>
        <div id="controls-container">
          <button id="start-button" onClick={() => startQuiz()}>Start Quiz</button>
          <div id="timer-container">
            <span id="timer-text">Time Left: {count}</span>
          </div>
        </div>


        <dialog id="modal_dialog" className="rounded dialog_margin ">

          <div className="modal-content">
            <div className="modal-body">
              <h2>US States Quiz</h2>
              <h4>Your Score: {score.current} out of 10</h4>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{ fontFamily: "arial" }} onClick={() =>reset_game()}>Close</button>
            </div>

          </div>

        </dialog>
      </div>
    </div>
  )
};

export default QuizApp;
