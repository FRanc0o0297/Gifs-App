//custom hook
import { useState } from "react";

export const useCounter = (initialValue: number = 1) => {
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };
  const handleSubtract = () => {
    if (counter === 1) return;
    setCounter((prevState) => prevState - 1);
  };
  const handleReset = () => {
    setCounter(initialValue);
  };

  return {
    //values/props
    counter,

    //methods
    handleAdd,
    handleSubtract,
    handleReset,
  };
};
