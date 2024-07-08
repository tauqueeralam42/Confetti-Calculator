import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");

  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
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
        } else {
          setDisplayEXP(displayEXP + value + '(');
          setExpression(expression + sciFunc[value] + '(');
        }
      } 
      else if (value === '+/-') {
        handleSignChange();
      }
    else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
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

  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  return (
    <div className="calculator">
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow handleButton={handleButton} />
    </div>
  );
};

export default Calculator;