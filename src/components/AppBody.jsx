import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggler } from "../features/getToggle/toggleSlice";

const AppBody = () => {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggler.toggle);
  const handleGetTodos = async () => {
    try {
      const fetchAPI = await fetch("http://localhost:3000/todos");
      const data = await fetchAPI.json();
      if (fetchAPI.ok) {
        setTodos(data);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetTodos();
  }, [toggle]); //whenever toggle changes fetch data will be triggered

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(toggler());
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const todoItems = todos.map((todo) => {
    return (
      <li key={todo.id}>
        {todo.content}{" "}
        <button
          onClick={() => {
            handleDelete(todo.id);
          }}
        >
          delete
        </button>
      </li>
    );
  });

  return (
    <div>
      <ul>{todoItems.length > 0 && todoItems}</ul>
    </div>
  );
};

export default AppBody;
