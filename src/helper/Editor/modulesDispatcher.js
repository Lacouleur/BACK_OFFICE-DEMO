import React from "react";
import TextModule from "../../components/Editor/Sections/Modules/TextModule";

// eslint-disable-next-line consistent-return
function modulesDispatcher(module, setModulesList) {
  if (module === "text") {
    return <TextModule listSetter={setModulesList} />;
  }
}

export default modulesDispatcher;
