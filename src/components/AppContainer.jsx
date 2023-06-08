import { useState } from "react";
import AppBody from "./AppBody";
import AppHeader from "./AppHeader";

const AppContainer = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <AppHeader toggle={toggle} setToggle={setToggle} />
      <AppBody toggle={toggle} />
    </div>
  );
};

export default AppContainer;
