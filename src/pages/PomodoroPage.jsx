import React from 'react'
import {useState,useEffect} from 'react'
import "../styles/PomodoroPage.css";
import BackFeature from '../components/BackFeature'

const PomodoroPage = () => {
  const[timeLeft,setTimeLeft]= useState(1500)
  const[isRunning,setIsRunning]=useState(false)
  let minutes= Math.floor(timeLeft/60);
  let seconds= timeLeft%60;
 
useEffect(() => {

  let interval;

  if (isRunning) {

    interval = setInterval(() => {

      setTimeLeft(prev => prev - 1);

    }, 1000);

  }

  return () => clearInterval(interval);

}, [isRunning]);

  

useEffect(()=>{
    
 if(timeLeft===0){
 setIsRunning(false)
}   
},[timeLeft])

function reset(){
  setTimeLeft(1500)
  setIsRunning(false)
}

function pomodoro(){
  setTimeLeft(1500)
  setIsRunning(false)
}
function sBreak(){
  setTimeLeft(300)
  setIsRunning(false)
}
function lBreak(){
  setTimeLeft(600)
  setIsRunning(false)
}
return (
  <>
  
  <div className="pomodoroPage">
   <div className="backContainer">
    <BackFeature />
  </div>

    <div className="overlay">

      <div className="modeButtons">

        <button onClick={pomodoro}>
          Pomodoro
        </button>

        <button onClick={sBreak}>
          Short Break
        </button>

        <button onClick={lBreak}>
          Long Break
        </button>

      </div>

      <h1 className="timerDisplay">
        {`${minutes.toString().padStart(2, "0")}:
        ${seconds.toString().padStart(2, "0")}`}
      </h1>

      <div className="controlButtons">

        <button
          className="startBtn"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>

        <button
          className="pauseBtn"
          onClick={() => setIsRunning(false)}
        >
          Pause
        </button>

        <button
          className="resetBtn"
          onClick={reset}
        >
          Reset
        </button>

      </div>

    </div>

  </div>
  </>
)
}

export default PomodoroPage
