import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.module.css";

function App() {
  const [calVal, setCalVal] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operation, setOperation] = useState("");

  const onButtonClick = (displayText) => {
    if (displayText === "C") {
      setCalVal("");
      setPreviousValue("");
      setOperation("");
    } else if (displayText === "=") {
      if (previousValue && operation) {
        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(calVal);

        switch (operation) {
          case "+":
            result = prev + current;
            break;
          case "-":
            result = prev - current;
            break;
          case "*":
            result = prev * current;
            break;
          case "/":
            result = prev / current;
            break;
          default:
            return;
        }

        setCalVal(result.toString());
        setPreviousValue("");
        setOperation("");
      }
    } else if (["+", "-", "*", "/"].includes(displayText)) {
      if (calVal) {
        setPreviousValue(calVal);
        setCalVal("");
        setOperation(displayText);
      }
    } else if (displayText === ".") {
      if (!calVal.includes(".")) {
        setCalVal((prev) => prev + displayText);
      }
    } else if (displayText === "⌫") {
      setCalVal((prev) => prev.slice(0, -1));
    } else {
      setCalVal((prev) => prev + displayText);
    }
  };

  return (
    <div className="app-container">
      <div className="calculator">
        <div className="display-container">
          <div className="previous-value">
            {previousValue} {operation}
          </div>
          <input className="display" type="text" value={calVal} readOnly />
        </div>
        <ButtonsContainer onClickbutton={onButtonClick} />
      </div>
    </div>
  );
}

const ButtonsContainer = ({ onClickbutton }) => {
  const buttonGroups = [
    ["C", "⌫", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div className="buttons-container">
      {buttonGroups.map((row, rowIndex) => (
        <div key={rowIndex} className="button-row">
          {row.map((button) => (
            <button
              key={button}
              className={`calc-button ${button === "=" ? "equals" : ""} ${
                isNaN(button) && button !== "." ? "operator" : ""
              }`}
              onClick={() => onClickbutton(button)}
            >
              {button}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
