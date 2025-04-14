import { useState } from "react";

const useField = () => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
 
  const reset = () => {
    setValue("");
  };

  return {
    value,
    onChange,
    reset,
  };
};

export default useField;
