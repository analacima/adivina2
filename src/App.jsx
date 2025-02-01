import { useState, useRef } from "react";
import "./App.css";

const number = Math.trunc(Math.random() * 20) + 1;


function App() {
  const [score, setScore] = useState(20);
  const [highscore, setHighscore] = useState(0);
  const inputRef = useRef(null);
  const [message, setMessage] = useState("Adivina el número...");

  const handleCheck = () => {
    console.log(inputRef.current.value);
    const inputNumber = Number(inputRef.current.value);
    //console.log(inputNumber);
    console.log(number);
    setScore(score - 1);
    if (inputNumber!==number) {
      if (score > 1) {
        if (inputNumber > number) {
          setMessage("📈 ¡Demasiado alto!");
        } else {
          setMessage("📉 ¡Demasiado bajo!");
        }
      } else {
        setMessage("💥 ¡Has perdido!");
      }
    } else {
      setMessage("🎉 ¡Lo has adivinado!");
      if (score > highscore) {
        setHighscore(score);
      }
    }
  };

  return (
    <>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again">Again!</button>
        <div className="number">?</div>
      </header>
      <main>
        <section className="left">
          <input type="number" className="guess" ref={inputRef}/>
          <button className="btn check" onClick={handleCheck}>Check!</button>
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
