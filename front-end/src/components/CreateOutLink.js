import React, { useEffect } from "react";

// importing icons
import { MdLocationSearching } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

export default function CreateOutLink({
  setCreatingOutLink,
  selection,
  focusedNode,
  setFocusedNode,
  createLink,
}) {
  // creating outgoing link
  useEffect(() => {
    createLink(selection[1], focusedNode);
    setFocusedNode(selection[1]);
    setCreatingOutLink(false);
    console.log("selection changed (creating outgoing link)");
  }, [selection]);

  return (
    <div className="fixed top-0 left-0 w-screen p-3">
      <div className="inline-flex items-center w-full p-2 px-5 space-x-2 rounded-full shadow-lg bg-gray-darker">
        <button type="button" onClick={() => setCreatingOutLink(false)}>
          <MdArrowBack className="text-lg" />
        </button>
        <input
          className="w-full input"
          type="text"
          id="Search"
          placeholder="Search or tap node to link as target"
        ></input>
        <button type="button">
          <MdLocationSearching className="text-lg" />
        </button>
      </div>
    </div>
  );
}
