import { Button, ButtonGroup, ListItem, Text } from "@chakra-ui/react";
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
    <ListItem
      display={"flex"}
      flexDir={"row"}
      justifyContent={"space-between"}
      gap={"1rem"}
      backgroundColor={"gray.50"}
      padding={"1rem"}
      borderRadius={"10px"}
    >
      <Text
        flexGrow={1}
        className={isChecked ? "checked" : ""}
        contentEditable={isChecked ? false : ""}
        onBlur={(event) => {
          handleEdit(event, id);
        }}
      >
        {content}
      </Text>
      <ButtonGroup>
        <Button
          variant={"solid"}
          colorScheme={"blue"}
          textTransform={"capitalize"}
          onClick={() => {
            handleCheck(id);
          }}
        >
          {isChecked ? "uncheck" : "check"}
        </Button>
        <Button
          variant={"ghost"}
          colorScheme={"red"}
          textTransform={"capitalize"}
          onClick={() => {
            handleDelete(id);
          }}
        >
          delete
        </Button>
      </ButtonGroup>
    </ListItem>
  );
};

export default Todo;
