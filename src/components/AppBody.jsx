import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggler } from "../features/getToggle/toggleSlice";
import Todo from "./Todo";

const AppBody = () => {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggler.toggle);

  const handleGetTodos = async () => {
    try {
      const fetchAPI = await fetch("http://localhost:8000/todos");
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
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

  const handleCheck = async (id) => {
    const todo = todos.find((todo) => {
      return +todo.id === +id;
    });
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
        dispatch(toggler());
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (event, id) => {
    const todo = todos.find((todo) => {
      return +todo.id === +id;
    });
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
        dispatch(toggler());
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

  const todoItems = todos.map((todo) => {
    return (
      <Todo
        key={todo.is}
        id={todo.id}
        content={todo.content}
        isChecked={todo.isChecked}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
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
