import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import QuizQuery from "./pages/QuizQuery";
import Quiz from "./pages/Quiz";

import LearnQuery from "./pages/LearnQuery";
import BrainStorm from "./pages/BrainStorm";

import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";

import SessionQuery from "./pages/SessionQuery";
import Login from "./pages/Login";
import CareerPlanning from "./pages/CareerPlanning";

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <div>
      <BrowserRouter>
        <LoadingBar
          color='#036bfc'
          progress={progress}
        />
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home setProgress={setProgress} key="home" />} />

          <Route path="/learn" element={< LearnQuery setProgress={setProgress} key="learn" /> }/>
          <Route path="/brainstorm" element={< BrainStorm setProgress={setProgress} key="brainstorm" /> }/>

          <Route path="/practice" element={< QuizQuery setProgress={setProgress} key="practice"/>} />
          <Route path="/quiz" element={<Quiz setProgress={setProgress} key="quiz" />} />

          <Route path="/session" element={< SessionQuery setProgress={setProgress} key="sessions"/>} />
          <Route path="/careerPlanning" element={< CareerPlanning setProgress={setProgress} key="careerplanning"/>} />

          <Route path="/login" element={< Login setProgress={setProgress} key="login"/>} />
        </Routes>
        
      </BrowserRouter>
      
    </div >
  );
}

export default App;
