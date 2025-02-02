import { useState, useRef } from "react";
import "./App.css";

const msg_start = "Adivina el número...";
const printGuess = "?";
const maxScore = 20;
let myNumber = Math.trunc(Math.random() * maxScore) + 1;

function App() {
  let highs = localStorage.getItem("highscore") || 0;
  const [score, setScore] = useState(20);
  const [highscore, setHighscore] = useState(highs);
  const inputRef = useRef(null);
  const [message, setMessage] = useState(msg_start);
  const [guess, setGuess] = useState(printGuess);

  
  const handleAgain = () => {
    setScore(20);
    setMessage(msg_start);
    setGuess(printGuess);
    myNumber = Math.trunc(Math.random() * maxScore) + 1;
    inputRef.current.value = "";
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

 

  const handleCheck = () => {
    console.log(inputRef.current.value);
    const inputNumber = Number(inputRef.current.value);
    console.log(myNumber);
    if (inputNumber < 1 || inputNumber > maxScore) {
      setMessage("El número debe estar entre 1 y " + maxScore);
    } else if (inputNumber!==myNumber) {
      if (score > 1) {
        if (inputNumber > myNumber) {
          setMessage("📈 ¡Demasiado alto!");
        } else {
          setMessage("📉 ¡Demasiado bajo!");
        }
      } else {
        setMessage("💥 ¡Has perdido!");
         inputRef.current.disabled = true;
      }
      setScore(score - 1);
    } else {
      setMessage("🎉 ¡Lo has adivinado!");
      setGuess(myNumber);
      if (score > highscore) {
        setHighscore(score);
        localStorage.setItem("highscore", score);
      }
    }
  };

  return (
    <>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and {maxScore})</p>
        <button className="btn again" onClick={handleAgain}>Again!</button>
        <div className="number">{guess}</div>
      </header>
      <main>
        <section className="left">
          <input type="number" className="guess" ref={inputRef}/>
          <button className="btn check" onClick={handleCheck} >Check!</button>
        </section>
        <section className="right">
          <p className="message">{message}</p>
          <p className="label-score">
            💯 Score: <span className="score">{score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{highscore}</span>
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
