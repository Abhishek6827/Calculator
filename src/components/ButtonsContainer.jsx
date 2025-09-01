import styles from "./ButtonsContainer.module.css";
let ButtonsContainer = ({onClickbutton}) => {
  let buttonNames = [
    "C",
    "1",
    "2",
    "+",
    "3",
    "4",
    "-",
    "5",
    "6",
    "*",
    "7",
    "8",
    "/",
    "9",
    "0",
    ".",
    "=",
  ];

  return (
    <div className={styles.buttonsContainer}>
      {buttonNames.map((names) => (
        <button className={styles.button} onClick={() => onClickbutton(names)}>{names}</button>
      ))}
    </div>
  );
};
export default ButtonsContainer;
