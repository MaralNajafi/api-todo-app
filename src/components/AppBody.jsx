import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggler } from "../features/getToggle/toggleSlice";
import Todo from "./Todo";

const AppBody = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggler.toggle);

  const handleGetTodos = async () => {
    setIsLoading(true);
    try {
      const fetchAPI = await fetch("http://localhost:8000/todos");
      const data = await fetchAPI.json();
      if (fetchAPI.ok) {
        setTodos(data);
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsLoading(false);
      setIsFailed(true);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setIsLoading(false);
        setIsFailed(false);
        dispatch(toggler());
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsLoading(false);
      setIsFailed(true);
      console.log(error);
    }
  };

  const handleCheck = async (id) => {
    const todo = todos.find((todo) => {
      return +todo.id === +id;
    });
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...todo,
          isChecked: !todo.isChecked,
        }),
      });
      if (response.ok) {
        setIsLoading(false);
        setIsFailed(false);
        dispatch(toggler());
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsLoading(false);
      setIsFailed(true);
      console.log(error);
    }
  };

  const handleEdit = async (event, id) => {
    const todo = todos.find((todo) => {
      return +todo.id === +id;
    });
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...todo,
          content: event.target.innerText,
        }),
      });
      if (response.ok) {
        setIsLoading(false);
        setIsFailed(false);
        dispatch(toggler());
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsLoading(false);
      setIsFailed(true);
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetTodos();
  }, [toggle]); //whenever toggle changes fetch data will be triggered

  const todoItems = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        id={todo.id}
        content={todo.content}
        isChecked={todo.isChecked}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isLoading={isLoading}
        isFailed={isFailed}
      />
    );
  });

  return (
    <div>
      <ul>{todoItems.length > 0 ? todoItems : "No Tasks Yet"}</ul>
    </div>
  );
};

export default AppBody;
