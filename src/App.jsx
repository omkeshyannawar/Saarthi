import { useState,useEffect} from 'react';

import SplashScreen from "./components/SplashScreen";
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import TodoPage from "./pages/TodoPage";
import PomodoroPage from "./pages/PomodoroPage";
import PlannerPage from "./pages/MeditationPage";
import JournalPage from "./pages/JournalPage";
import QuotesPage from "./pages/QuotesPage";
import MindMate from "./pages/MindMate"

import './App.css'


function App() {

  const [showSplash,setShowSplash] =useState(true);

  useEffect(() => {

  const timer =
    setTimeout(() => {

      setShowSplash(false);

    }, 4000);

  return () =>
    clearTimeout(timer);

}, []);
if (showSplash) {

  return <SplashScreen />;

}

  return (
    <BrowserRouter>
    
      <Routes>
     <Route path="/" element={<Dashboard /> } />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/mindmate" element={<MindMate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
