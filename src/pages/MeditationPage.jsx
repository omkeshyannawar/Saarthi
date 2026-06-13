import React, { useState, useEffect,useRef } from "react";
import "../styles/MeditationPage.css";
import BackFeature from '../components/BackFeature'
import rain from "../assets/Audio/rain.mp3";
import ocean from "../assets/Audio/ocean.mp3";
import Forest from "../assets/Audio/Forest.mp3";


const MeditationPage = () => {

  const [selectedTime, setSelectedTime] = useState(300);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSound, setSelectedSound] =useState(rain);

  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const audioRef = useRef(null);

  useEffect(() => {

    let interval;

    if (isRunning && timeLeft > 0) {

      interval = setInterval(() => {

        setTimeLeft(prev => prev - 1);

      }, 1000);

    }

    return () => clearInterval(interval);

  }, [isRunning, timeLeft]);

useEffect(() => {

  if (timeLeft === 0) {

    setIsRunning(false);
    audioRef.current.pause();

audioRef.current.currentTime = 0;

    const speech =
      new SpeechSynthesisUtterance(
        "Your meditation session is complete. You may slowly open your eyes."
      );

    window.speechSynthesis.speak(speech);

  }

}, [timeLeft]);

useEffect(() => {
  if (isRunning) {
    audioRef.current.load();
    audioRef.current.play();
  }
}, [selectedSound]);

  function selectSession(seconds) {

    setSelectedTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);

  }

  useEffect(() => {

  if (audioRef.current) {

    audioRef.current.volume = volume;

    audioRef.current.muted = isMuted;

  }

}, [volume, isMuted]);

  function resetTimer() {

    setTimeLeft(selectedTime);
    setIsRunning(false);
    audioRef.current.pause();

  audioRef.current.currentTime = 0;

  }
  function startMeditation() {

  setIsRunning(true);
  audioRef.current.play();

  if ("speechSynthesis" in window) {

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        "Find a comfortable position. Take a deep breath and close your eyes."
      );

    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);
  }
}

  return (

    <div className="meditationPage">
      <div className="backContainer">
    <BackFeature />
  </div>

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="meditationContent">

        <h1 className="pageTitle">
          Meditation Session
        </h1>

        <div className="sessionButtons">

          <button
            onClick={() => selectSession(300)}
          >
            5 Min
          </button>

          <button
            onClick={() => selectSession(600)}
          >
            10 Min
          </button>

          <button
            onClick={() => selectSession(900)}
          >
            15 Min
          </button>

          <button
            onClick={() => selectSession(1200)}
          >
            20 Min
          </button>

        </div>

        <h1 className="timerDisplay">

          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}

        </h1>

        <div className="controlButtons">

          <button
            className="startBtn"
            onClick={startMeditation}
          >
            Start Meditation
          </button>

          <button
            className="pauseBtn"
            onClick={() => {setIsRunning(false)
              audioRef.current.pause();
            }}
          >
            Pause
          </button>

          <button
            className="resetBtn"
            onClick={resetTimer}
          >
            Reset
          </button>

        </div>
        <div className="soundContainer">
        <button
    className={`soundCard ${
      selectedSound === rain ? "activeSound" : ""
    }`}
    onClick={() => setSelectedSound(rain)}
  >
    <span>🌧</span>
    <p>Rain</p>
        </button>

        <button
    className={`soundCard ${
      selectedSound === ocean ? "activeSound" : ""
    }`}
    onClick={() => setSelectedSound(ocean)}
  >
    <span>🌊</span>
    <p>Ocean</p>
        </button>

       <button
            className={`soundCard ${
              selectedSound === Forest ? "activeSound" : ""
        }`}
      onClick={() => setSelectedSound(Forest)}
      >
    <span>🌲</span>
    <p>Forest</p>
  </button>
       </div>
       <div className="volumeControls">

  <button
    className="muteBtn"
    onClick={() => setIsMuted(!isMuted)}
  >
    {isMuted ? "🔇" : "🔊"}
  </button>

  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={volume}
    onChange={(e) =>
      setVolume(Number(e.target.value))
    }
  />

</div>

      </div>

      
<audio
  ref={audioRef}
  src={selectedSound}
  loop
/>

    </div>

  );

};

export default MeditationPage;