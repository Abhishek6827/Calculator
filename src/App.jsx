import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
            result = current !== 0 ? prev / current : "Error";
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
    <div style={styles.appContainer}>
      <div style={styles.calculator}>
        <div style={styles.displayContainer}>
          <div style={styles.previousValue}>
            {previousValue} {operation}
          </div>
          <input style={styles.display} type="text" value={calVal} readOnly />
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
    <div style={styles.buttonsContainer}>
      {buttonGroups.map((row, rowIndex) => (
        <div key={rowIndex} style={styles.buttonRow}>
          {row.map((button) => (
            <button
              key={button}
              style={{
                ...styles.calcButton,
                ...(button === "=" ? styles.equalsButton : {}),
                ...(isNaN(button) && button !== "."
                  ? styles.operatorButton
                  : {}),
              }}
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

// Inline styles instead of CSS modules
const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  calculator: {
    width: "300px",
    backgroundColor: "#2d3748",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
  },
  displayContainer: {
    backgroundColor: "#4a5568",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "20px",
    textAlign: "right",
  },
  previousValue: {
    color: "#cbd5e0",
    fontSize: "14px",
    minHeight: "20px",
    marginBottom: "5px",
  },
  display: {
    width: "100%",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "28px",
    textAlign: "right",
    outline: "none",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  calcButton: {
    flex: 1,
    height: "60px",
    border: "none",
    borderRadius: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#4a5568",
    color: "white",
  },
  operatorButton: {
    backgroundColor: "#f6ad55",
    color: "#2d3748",
  },
  equalsButton: {
    backgroundColor: "#38a169",
    color: "white",
  },
};

export default App;
