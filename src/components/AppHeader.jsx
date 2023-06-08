import { useState } from "react";

const AppHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <form>
        <input
          value={inputValue}
          type="text"
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AppHeader;
