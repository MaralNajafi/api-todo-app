import { useState } from "react";

const AppHeader = () => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const todo = {
    content: inputValue,
    dateCreated: new Date().toLocaleString(),
    isChecked: false,
  };

  const handleReset = () => {
    setInputValue("");
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();
    try {
      const fetchAPI = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (fetchAPI.ok) {
        handleReset();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          required
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
