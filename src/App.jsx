import React,{useState} from "react";
import "./App.css"
import Calculator from "./components/Calculator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [isDayMode, setIsDayMode] = useState(true);
  const toggleDayNightMode = () => {
    setIsDayMode(!isDayMode);
    // Add logic to change theme classes or styles based on isDayMode state
  };
  return (
    <div className={`App ${!isDayMode ? 'night-theme' : 'day-theme'}`}>
   <div className="theme-toggle" onClick={toggleDayNightMode}>
        <div className={`toggle-track ${isDayMode ? 'day' : 'night'}`}></div>
    </div>
    <div>{isDayMode ? 'Day Mode' : 'Night Mode'}</div>
    
    <div className=".mac-dots">
        <div className=".mac-dot red"></div>
        <div className=".mac-dot orange"></div>
        <div className=".mac-dot green"></div>
      </div>
      <Calculator />
    </div>
  );
};

export default App;