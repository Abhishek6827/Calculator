import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Display from "./components/Display";
import ButtonsContainer from "./components/ButtonsContainer";
import { useState } from "react";

function App() {

  const [calVal, setCalVal] = useState("");
  const onButtonClick = (displayText) => {
    if (displayText === 'C') {
      setCalVal("");
    }
    else if (displayText === '='){
      const result = eval(calVal);
      setCalVal(result);
    }
    else {
      const newDisplayValue = calVal + displayText;
      setCalVal(newDisplayValue);
    }
  }

  return (
    <center className="center">
      <div className={styles.calculator}>
        <Display displayValue={calVal}/>
        <ButtonsContainer onClickbutton={onButtonClick}/>
      </div>
    </center>
  );
}

export default App;
