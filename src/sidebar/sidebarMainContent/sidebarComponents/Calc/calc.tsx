import React, { useState } from "react";

export default function Calc() {
  const [calcInput, setCalcInput] = useState("");
  const [calcOperator, setCalcOperator] = useState("");
  const [calcFirstOperand, setCalcFirstOperand] = useState(0);
  const [fullInput, setFullInput] = useState("");
  const handleNumberClick = (event) => {
    const number = event.currentTarget.dataset.key;
    setCalcInput(calcInput + number);
    setFullInput(fullInput + number);
  };

  const handleOperatorClick = (event) => {
    const operator = event.currentTarget.dataset.key;
    const currentInput = parseFloat(calcInput);
    setCalcInput("");
    setFullInput(fullInput + currentInput + operator);
    setCalcOperator(operator);
    setCalcFirstOperand(currentInput);
  };
  const handleEqualClick = () => {
    const result = eval(fullInput);
    setCalcInput(result.toString());
    setFullInput(fullInput + " = " + result);
  };

  const handleClearClick = () => {
    setCalcInput("");
    setFullInput("");
  };

  return (
    <div className="calcOuter">
      <div className="calcInner">
        <div className="calcDisplay">
          <div className="calcContent">
            <div className="calcInput">{fullInput}</div>
            <div className="calcOutput">12,000</div>
          </div>
        </div>
        <div className="calcButtons">
          <div data-key="clear" className="calcButton calcAction" onClick={handleClearClick}>
            <span>AC</span>
          </div>
          <div data-key="Negative" className="calcButton calcAction">
            <span>+/-</span>
          </div>
          <div data-key="%" className="calcButton calcAction">
            <span>%</span>
          </div>
          <div data-key="/" className="calcButton calcOperator" onClick={handleOperatorClick}>
            <span>÷</span>
          </div>
          <div data-key="7" className="calcButton" onClick={handleNumberClick}>
            <span>7</span>
          </div>
          <div data-key="8" className="calcButton" onClick={handleNumberClick}>
            <span>8</span>
          </div>
          <div data-key="9" className="calcButton" onClick={handleNumberClick}>
            <span>9</span>
          </div>
          <div data-key="*" className="calcButton calcOperator" onClick={handleOperatorClick}>
            <span>×</span>
          </div>
          <div data-key="4" className="calcButton" onClick={handleNumberClick}>
            <span>4</span>
          </div>
          <div data-key="5" className="calcButton" onClick={handleNumberClick}>
            <span>5</span>
          </div>
          <div data-key="6" className="calcButton" onClick={handleNumberClick}>
            <span>6</span>
          </div>
          <div data-key="-" className="calcButton calcOperator" onClick={handleOperatorClick}>
            <span>-</span>
          </div>
          <div data-key="1" className="calcButton" onClick={handleNumberClick}>
            <span>1</span>
          </div>
          <div data-key="2" className="calcButton" onClick={handleNumberClick}>
            <span>2</span>
          </div>
          <div data-key="3" className="calcButton" onClick={handleNumberClick}>
            <span>3</span>
          </div>
          <div data-key="+" className="calcButton calcOperator" onClick={handleOperatorClick}>
            <span>+</span>
          </div>
          <div data-key="backspace" className="calcButton calcAction">
            <span>⌫</span>
          </div>
          <div data-key="0" className="calcButton" onClick={handleNumberClick}>
            <span>0</span>
          </div>
          <div data-key="." className="calcButton">
            <span>.</span>
          </div>
          <div data-key="=" className="calcButton calcOperator" onClick={handleEqualClick} >
            <span>=</span>
          </div>
        </div>
      </div>
    </div>
  )
}