import React, { useState, useEffect } from "react";

// importing icons
import { MdLocationSearching } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

export default function CreateInLink({
  setCreatingInLink,
  selection,
  focusedNode,
  setFocusedNode,
  createLink,
}) {
  const [loading, setLoading] = useState(true);
  // creating incoming link
  useEffect(() => {
    loading
      ? setLoading(false)
      : (createLink(focusedNode, selection[1]),
        setFocusedNode(selection[1]),
        setCreatingInLink(false));
  }, [selection]);

  return (
    <div className="fixed top-0 left-0 w-screen p-3">
      <div className="inline-flex items-center w-full p-2 px-5 space-x-2 rounded-full shadow-lg bg-gray-darker">
        <button type="button" onClick={() => setCreatingInLink(false)}>
          <MdArrowBack className="text-lg" />
        </button>
        <input
          className="w-full input"
          type="text"
          id="Search"
          placeholder="Search or tap node to link as source"
        ></input>
        <button type="button">
          <MdLocationSearching className="text-lg" />
        </button>
      </div>
    </div>
  );
}
