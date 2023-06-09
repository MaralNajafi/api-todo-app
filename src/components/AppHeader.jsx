import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggler } from "../features/getToggle/toggleSlice";
const AppHeader = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

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
    setIsLoading(true);
    try {
      const fetchAPI = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (fetchAPI.ok) {
        handleReset();
        dispatch(toggler());
        setIsFailed(false);
        setIsLoading(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsLoading(false);
      setIsFailed(true);
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
        <button type="submit">
          {isLoading ? "loading" : isFailed ? "try again" : "add"}
        </button>
      </form>
    </div>
  );
};

export default AppHeader;
