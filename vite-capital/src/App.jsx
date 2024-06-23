import { useState } from 'react'
import QuizApp from './quizapp'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <QuizApp />
    </div>
  )
}

export default App
