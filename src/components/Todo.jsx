import React from "react";

const Todo = ({
  id,
  content,
  isChecked,
  handleEdit,
  handleCheck,
  handleDelete,
}) => {
  return (
    <li>
      <span
        className={isChecked ? "checked" : ""}
        contentEditable={isChecked ? false : ""}
        onBlur={(event) => {
          handleEdit(event, id);
        }}
      >
        {content}
      </span>{" "}
      <button
        onClick={() => {
          handleDelete(id);
        }}
      >
        delete
      </button>
      <button
        onClick={() => {
          handleCheck(id);
        }}
      >
        {isChecked ? "uncheck" : "check"}
      </button>
    </li>
  );
};

export default Todo;
