import React from "react";

import CreateNode from "./CreateNode";
import StartSession from "./StartSession";

import { useAuth } from "../contexts/AuthContext";

const BottomButtons = ({createNode, setDisplayMenu, setHasAccount}) => {
    const { currentUser } = useAuth();

    return (
        <>
      {currentUser ? (
        <CreateNode createNode={createNode} />
        ) : (
          <StartSession
            setDisplayMenu={setDisplayMenu}
            setHasAccount={setHasAccount}
          />
        )}
        </>
    )
}

export default BottomButtons;
