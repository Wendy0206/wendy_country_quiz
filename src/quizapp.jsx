import React, { useState, useEffect, useRef } from 'react';
import './App.css'

const QuizApp = () => {

  const goodAnswer = useRef('');
  const score = useRef(0);
  const questionIndex = useRef(0);
  const quizQuestions = useRef([]);
  const [count, setCount] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentUrl, setCurrentUrl] = useState('https://flagpedia.net/data/us/w702/tx.webp');
const flagRootUrl='https://flagpedia.net/data/us/w702/';

  const all_states = [
    {name:"Alabama" , flag: "al" },
    {name:"Alaska" , flag: "ak" },
    {name:"Arizona" , flag: "az" },
    {name:"Arkansas" , flag: "ar" },
    {name:"California" , flag: "ca" },
    {name:"Colorado" , flag: "co" },
    {name:"Connecticut" , flag: "ct" },
    {name:"Delaware" , flag: "de" },
    {name:"Florida" , flag: "fl" },
    {name:"Georgia" , flag: "ga" },
    {name:"Hawaii" , flag: "hi" },
    {name:"Idaho" , flag: "id" },
    {name:"Illinois" , flag: "il" },
    {name:"Indiana" , flag: "in" },
    {name:"Iowa" , flag: "ia" },
    {name:"Kansas" , flag: "ks" },
    {name:"Kentucky" , flag: "ky" },
    {name:"Louisiana" , flag: "la" },
    {name:"Maine" , flag: "me" },
    {name:"Maryland" , flag: "md" },
    {name:"Massachusetts" , flag: "ma" },
    {name:"Michigan" , flag: "mi" },
    {name:"Minnesota" , flag: "mn" },
    {name:"Mississippi" , flag: "ms" },
    {name:"Missouri" , flag: "mo" },
    {name:"Montana" , flag: "mt" },
    {name:"Nebraska" , flag: "ne" },
    {name:"Nevada" , flag: "nv" },
    {name:"New Hampshire" , flag: "nh" },
    {name:"New Jersey" , flag: "nj" },
    {name:"New York" , flag: "ny" },
    {name:"North Carolina" , flag: "nc" },
    {name:"Ohio" , flag: "oh" },
    {name:"Oklahoma" , flag: "ok" },
    {name:"Oregon" , flag: "or" },
    {name:"Pennsylvania" , flag: "pa" },
    {name:"Rhode Island" , flag: "ri" },
    {name:"South Carolina" , flag: "sc" },
    {name:"South Dakota" , flag: "sd" },
    {name:"Tennessee" , flag: "tn" },
    {name:"Texas" , flag: "tx" },
    {name:"Utah" , flag: "ut" },
    {name:"Vermont" , flag: "vt" },
    {name:"Virginia" , flag: "va" },
    {name:"Washington" , flag: "wa" },
    {name:"West Virginia" , flag: "wv" },
    {name:"Wisconsin" , flag: "wi" },
    {name:"Wyoming" , flag: "wy" }
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
   
let clone_array = [all_states[Math.floor(Math.random()*5)],all_states[Math.floor(Math.random()*5)+5],
all_states[Math.floor(Math.random()*5)+10],all_states[Math.floor(Math.random()*5)+15],
all_states[Math.floor(Math.random()*5)+20],all_states[Math.floor(Math.random()*5)+25],
all_states[Math.floor(Math.random()*5)+30],all_states[Math.floor(Math.random()*5)+35],
all_states[Math.floor(Math.random()*5)+40],all_states[Math.floor(Math.random()*4)+45]];
 quizQuestions.current= clone_array.sort(() => 0.5 - Math.random());

    setCount(20);
    displayQuestion();

  }

  function displayQuestion() {
  
    remove_highlight();
    let current_one = quizQuestions.current[questionIndex.current];
const build_flag_url= flagRootUrl+current_one.flag+'.webp';
    setCurrentUrl(build_flag_url);
    let clone_array = [...quizQuestions.current];
    clone_array.splice(questionIndex.current,1);

    const shuffled = clone_array.sort(() => 0.5 - Math.random());
   
    let each_option = shuffled.splice(0, 3); // here we get 3 other random answers;
    let next=[...each_option];
    next.splice((each_option.length + 1) * Math.random() | 0, 0, current_one);

    each_option.splice((each_option.length + 1) * Math.random() | 0, 0, current_one);
    console.log('each answer', each_option)
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



	{/* <div className="slideshow3">
				<img className="img_sl" src={slideList[4]} />
				<img className=" img_sl" src={slideList[3]} />
				<img className=" img_sl" src={slideList[2]} />
				<img className=" img_sl" src={slideList[1]} />
				<img className=" img_sl" src={slideList[0]} />

			</div> */}


        <div id="question-container">
          <p id="question-text">Hey! Which state is this?</p>
          <div id='all_answers'>
            <div id="answer-buttons">

            {answers.map((answer, ind)=>
            <button className='answer-button' key={ind} onClick={() => check_answers(ind)}>{answer.name}</button>
           
            )}
            
            </div>
          </div>
        </div>
        <div id="controls-container">
          <button id="start-button" className="button-35" role="button" onClick={() => startQuiz()}>Start Quiz</button>
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