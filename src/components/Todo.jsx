import { Button, ButtonGroup, ListItem, Text, HStack } from "@chakra-ui/react";
import React from "react";

const Todo = ({
  id,
  content,
  isChecked,
  date,
  handleEdit,
  handleCheck,
  handleDelete,
}) => {
  return (
    <>
      <ListItem
        display={"flex"}
        flexDir={"column"}
        justifyContent={"space-between"}
        gap={"1rem"}
        backgroundColor={"gray.50"}
        padding={"1rem"}
        borderRadius={"10px"}
      >
        <HStack>
          <Text
            _focus={{
              outline: "none",
              border: "none",
            }}
            flexGrow={1}
            maxW={"25ch"}
            className={isChecked ? "checked" : ""}
            contentEditable={isChecked ? false : ""}
            onBlur={(event) => {
              handleEdit(event, id);
              if (event.target.innerText === "") {
                handleDelete(id);
              }
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
        </HStack>
        <Text color={"gray.500"} fontSize={"12px"}>
          {date}
        </Text>
      </ListItem>
    </>
  );
};

export default Todo;
