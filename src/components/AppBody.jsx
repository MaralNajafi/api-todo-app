import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggler } from "../features/getToggle/toggleSlice";
import Todo from "./Todo";
import { List, Text, Spinner, Center } from "@chakra-ui/react";

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

  const todoItems = todos?.map((todo) => {
    return (
      <Todo
        key={todo.id}
        id={todo.id}
        content={todo.content}
        isChecked={todo.isChecked}
        date={todo.dateCreated}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    );
  });

  return (
    <List spacing={"1rem"} fontSize={"1.3rem"}>
      {isLoading ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : isFailed ? (
        <Text textAlign={"center"} color={"gray.500"}>
          {"Failed to get your todos :( Try again later!"}
        </Text>
      ) : todoItems.length > 0 ? (
        todoItems
      ) : (
        <Text textAlign={"center"} color={"gray.500"}>
          No tasks yet!
        </Text>
      )}
    </List>
  );
};

export default AppBody;
