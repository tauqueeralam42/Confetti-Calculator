import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");
  const [memory, setMemory] = useState(0);

  const sciFunc = {
    "sin": "Math.sin",
    "cos": "Math.cos",
    "tan": "Math.tan",
    "ln": "Math.log",
    "log₁₀": "Math.log10",
    "xʸ" : "**",
    "π": "Math.PI",
    "e": "Math.E",
    "x²": "square",
    "x³": "cube",
    "eˣ": "Math.exp",
    "10ˣ": "tenExp",
    "x!": "factorial",
    "1/x": "reciprocal",
    "²√x": "squareRoot",
    "³√x": "cubeRoot",
    "ʸ√x": "root",
    "EE": "EE",
  };


  const square = (num) => {
    return num * num;
  };

  const cube = (num) => {
    return num * num * num;
  };

  const tenExp = (num) => {
    return Math.pow(10, num);
  };

  const factorial = (num) => {
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };
  const reciprocal = (num) => {
    return 1 / num;
  };

  const squareRoot = (num) => {
    return Math.sqrt(num);
  };

  const cubeRoot = (num) => {
    return Math.cbrt(num);
  };

  const root = (base, exponent) => {
    return Math.pow(base, 1 / exponent);
  };

  function calcResult() {
    if (expression.length !== 0) {
      try {
        let compute = eval(expression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
      } catch (error) {
        setResult("An Error Occurred!");
      }
    } else {
      setResult("An Error Occurred!");
    }
  }

  const handleSignChange = () => {
    if (expression) {
      if (expression[0] === '-') {
        setExpression(expression.substring(1));
        setDisplayEXP(displayEXP.substring(1));
      } else {
        setExpression('-' + expression);
        setDisplayEXP('-' + displayEXP);
      }
    }
  };


  function handleButton(value) {


    if (value === "C") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } 

    else if (sciFunc.hasOwnProperty(value)) {
        if (value === 'π' || value === 'e') {
          setDisplayEXP(displayEXP + value);
          setExpression(expression + sciFunc[value]);
        }
        else {
          setDisplayEXP(displayEXP + value + '(');
          setExpression(expression + sciFunc[value] + '(');
        }
      } 
      else if (value === '+/-') {
        handleSignChange();
      }
    
    else if (value === 'mc') {
        handleMemoryClear();
      } else if (value === 'mr') {
        handleMemoryRecall();
      } else if (value === 'm+') {
        setExpression(expression + "+");
        setDisplayEXP(displayEXP + "+");
        handleMemoryAdd();
      } else if (value === 'm-') {
        setExpression(expression + "-");
        setDisplayEXP(displayEXP + "-");
        handleMemorySubtract();
      }
    else if (value === "=") calcResult();
    else if(value === "x"){
      setExpression(expression + "*");
      setDisplayEXP(displayEXP + value);
    }
    else if(value === "÷"){
        setExpression(expression + "/");
        setDisplayEXP(displayEXP + value);
      }
    else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  const handleMemoryClear = () => {
    setMemory(0);
    handleClear();
  };

  const handleMemoryRecall = () => {
    setExpression(memory.toString());
    let compute = eval(expression);
          compute = parseFloat(compute.toFixed(4));
          
          setResult(compute);
  };

  const handleMemoryAdd = () => {
    if (expression.length !== 0) {
        try {
          let compute = eval(expression);
          compute = parseFloat(compute.toFixed(4));
          setMemory(memory + compute);
          setResult(compute);
        } catch (error) {
          setResult("An Error Occurred!");
        }
      } else {
        setResult("An Error Occurred!");
      }
  };


  const handleMemorySubtract = () => {
    if (expression.length !== 0) {
        try {
          let compute = eval(expression);
          compute = parseFloat(compute.toFixed(4));
          setMemory(memory - compute);
          setResult(compute);
        } catch (error) {
          setResult("An Error Occurred!");
        }
      } else {
        setResult("An Error Occurred!");
      }
  };

  const handleClear = () => {
    setExpression("");
    setDisplayEXP("");
  };

  return (
    <div className="calculator">
    <div className="mac-dots">
          <div className="mac-dot red"></div>
          <div className="mac-dot orange"></div>
          <div className="mac-dot green"></div>
        </div>
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow handleButton={handleButton} />
    </div>
  );
};

export default Calculator;