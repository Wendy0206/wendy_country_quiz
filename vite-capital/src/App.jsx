import { useState } from 'react'
import QuizApp from './quizapp'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuizApp />
    </>
  )
}

export default App
