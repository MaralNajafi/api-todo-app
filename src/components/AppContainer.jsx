import { useState } from "react";
import AppBody from "./AppBody";
import AppHeader from "./AppHeader";
import { Center, Flex } from "@chakra-ui/react";

const AppContainer = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <Center minH={"100vh"}>
      <Flex flexDir={"column"} width={"100%"} maxW={"30rem"} gap={"2rem"}>
        <AppHeader toggle={toggle} setToggle={setToggle} />
        <AppBody toggle={toggle} />
      </Flex>
    </Center>
  );
};

export default AppContainer;
